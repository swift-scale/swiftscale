import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const client = new ImapFlow({
      host: 'imap.secureserver.net',
      port: 993,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASSWORD!
      },
      logger: false
    });

    await client.connect();
    
    // Select inbox and lock it
    let lock = await client.getMailboxLock('INBOX');
    let messagesSynced = 0;

    try {
      // Find all UNSEEN emails
      const unseenMessages = client.fetch({ seen: false }, { envelope: true, source: true });

      for await (let msg of unseenMessages) {
        if (!msg.source) continue;

        // Parse full message source
        const parsed = await simpleParser(msg.source);
        
        // Ensure this maps properly to an existing thread via In-Reply-To
        const inReplyTo = parsed.inReplyTo || (parsed.references && Array.isArray(parsed.references) && parsed.references.length > 0 ? parsed.references[0] : null);

        if (inReplyTo) {
          // Attempt to locate a Message thread possessing this smtpMessageId anywhere
          // Clean ID strings, mailparser sometimes keeps bracket encapsulation like <message-id@domain.com>
          let cleanId = inReplyTo.replace(/[<>]/g, '').trim();

          const parentMessage = await Message.findOne({
            $or: [
              { smtpMessageId: { $regex: cleanId, $options: 'i' } },
              { 'replies.smtpMessageId': { $regex: cleanId, $options: 'i' } }
            ]
          });

          if (parentMessage) {
            // Push incoming user response into replies array
            const exactSender = parsed.from?.value[0]?.address || 'Unknown';
            const plainBody = parsed.text || "No text content.";
            const ccEmails = parsed.cc ? (Array.isArray(parsed.cc) ? parsed.cc : [parsed.cc]).flatMap((c: any) => c.value.map((v: any) => v.address)) : [];

            // Save the newly generated messageId exactly so it can be replied to!
            let newMsgId = parsed.messageId ? parsed.messageId.replace(/[<>]/g, '').trim() : '';

            // Map attachments if any (would need Cloudinary upload here too if desired, 
            // but for now we just link the structure)
            const incomingAttachments = (parsed.attachments || []).map((att: any) => ({
              filename: att.filename,
              size: att.size,
              contentType: att.contentType
            }));

            parentMessage.replies.push({
              body: plainBody,
              senderAlias: 'Customer', 
              fromEmail: exactSender,
              smtpMessageId: newMsgId,
              sentAt: parsed.date || new Date(),
              cc: ccEmails,
            });

            parentMessage.status = 'new'; 
            await parentMessage.save();
            messagesSynced++;
          }
        } else {
          const exactSender = parsed.from?.value[0]?.address || 'Unknown';
          const senderName = parsed.from?.value[0]?.name || 'Direct';
          const subject = parsed.subject || 'No Subject';
          const plainBody = parsed.text || "No text content.";
          const ccEmails = parsed.cc ? (Array.isArray(parsed.cc) ? parsed.cc : [parsed.cc]).flatMap((c: any) => c.value.map((v: any) => v.address)) : [];
          let newMsgId = parsed.messageId ? parsed.messageId.replace(/[<>]/g, '').trim() : '';

          await Message.create({
            firstName: senderName,
            lastName: 'Message',
            email: exactSender,
            service: subject,
            details: plainBody,
            status: 'new',
            fromEmail: exactSender,
            smtpMessageId: newMsgId,
            cc: ccEmails,
            replies: []
          });
          messagesSynced++;
        }

        // Tag as read on the actual IMAP server so we don't process it a second time
        await client.messageFlagsAdd({ uid: msg.uid }, ['\\Seen'], { uid: true });
      }
    } finally {
      lock.release();
    }
    
    await client.logout();

    return NextResponse.json({
      success: true,
      message: `Synced ${messagesSynced} new emails successfully`,
      syncedCount: messagesSynced
    });

  } catch (error: any) {
    console.error('Email Sync Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
