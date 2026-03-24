import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';
import sendEmail, { SenderAlias, SENDER_ALIASES } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { messageId, to, subject, body, senderAlias, attachments = [], cc, bcc } = await req.json();

    console.log('--- Send Email API Start ---');
    console.log('messageId:', messageId);
    console.log('to:', to);

    if (!to || !subject || !body) {
      return NextResponse.json(
        { success: false, message: 'Recipient, subject, and body are required' },
        { status: 400 }
      );
    }

    const fromEmail = SENDER_ALIASES[senderAlias as SenderAlias] || SENDER_ALIASES.contact;
    const ccArray = cc ? cc.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
    const bccArray = bcc ? bcc.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

    let inReplyTo: string | undefined;
    let references: string[] = [];
    let messageDoc: any = null;

    if (messageId) {
      messageDoc = await Message.findById(messageId);
      if (messageDoc) {
        console.log('Found messageDoc:', messageDoc._id);
        if (messageDoc.smtpMessageId) {
          inReplyTo = messageDoc.smtpMessageId;
          references.push(messageDoc.smtpMessageId);
        }
        if (messageDoc.replies && Array.isArray(messageDoc.replies) && messageDoc.replies.length > 0) {
          messageDoc.replies.forEach((r: any) => {
            if (r.smtpMessageId) references.push(r.smtpMessageId);
          });
          const lastReply = (messageDoc.replies && Array.isArray(messageDoc.replies) && messageDoc.replies.length > 0) 
            ? messageDoc.replies[messageDoc.replies.length - 1] 
            : null;
          if (lastReply && lastReply.smtpMessageId) inReplyTo = lastReply.smtpMessageId;
        }
      } else {
        console.log('messageId provided but no document found. Will create new outbound thread.');
      }
    }

    // Ensure attachments is always an array to prevent .map crashes
    const safeAttachments = Array.isArray(attachments) ? attachments : [];

    const mailerAttachments = safeAttachments.map((att: any) => ({
      filename: att.filename,
      path: att.url,
    }));

    const info = await sendEmail({
      email: to,
      subject,
      html: body.replace(/\n/g, '<br>'),
      senderAlias: senderAlias as SenderAlias,
      inReplyTo,
      references: (Array.isArray(references) && references.length > 0) ? references : undefined,
      attachments: mailerAttachments,
      cc: cc || undefined,
      bcc: bcc || undefined,
    });

    const newSmtpMessageId = info.messageId.replace(/[<>]/g, '').trim();
    const newReply = {
      body,
      senderAlias,
      fromEmail,
      smtpMessageId: newSmtpMessageId,
      attachments: safeAttachments,
      cc: ccArray,
      bcc: bccArray,
      sentAt: new Date()
    };

    if (messageId && messageDoc) {
      console.log('Updating existing message document with new reply...');
      
      const updatePayload: any = {
        status: 'replied',
        $unset: { draft: 1 },
        $push: { replies: newReply }
      };

      if (messageDoc.status === 'draft') {
        updatePayload.firstName = 'Outbound';
        updatePayload.lastName = 'Email';
      }

      const updated = await Message.findByIdAndUpdate(
        messageId,
        updatePayload,
        { new: true, runValidators: true }
      );
      if (updated) {
        console.log('Update successful. Reply count:', updated.replies?.length || 0);
      } else {
        console.error('Update failed: findByIdAndUpdate returned null');
      }
    } else {
      console.log('Creating new outbound thread...');
      await Message.create({
        firstName: 'Outbound',
        lastName: 'Email',
        email: to,
        service: subject,
        details: body,
        status: 'replied',
        fromEmail,
        smtpMessageId: newSmtpMessageId,
        cc: ccArray,
        bcc: bccArray,
        attachments: attachments,
        replies: []
      });
    }

    console.log('--- Send Email API Success ---');
    return NextResponse.json({ success: true, message: 'Email sent successfully' });

  } catch (error: any) {
    console.error('Send Email API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
