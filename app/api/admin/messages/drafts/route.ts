import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { messageId, to, cc, bcc, subject, body, senderAlias, attachments = [] } = await req.json();

    const toArray = Array.isArray(to) ? to : (to ? to.split(',').map((s: string) => s.trim()).filter(Boolean) : []);
    const ccArray = Array.isArray(cc) ? cc : (cc ? cc.split(',').map((s: string) => s.trim()).filter(Boolean) : []);
    const bccArray = Array.isArray(bcc) ? bcc : (bcc ? bcc.split(',').map((s: string) => s.trim()).filter(Boolean) : []);

    const draftData = {
      body,
      to: toArray,
      cc: ccArray,
      bcc: bccArray,
      subject,
      senderAlias,
      attachments,
      updatedAt: new Date()
    };

    if (messageId) {
      // Saving reply draft to existing thread or updating an existing root draft
      const doc = await Message.findById(messageId);
      if (!doc) return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
      
      const updatePayload: any = { draft: draftData };
      
      // If it's a root draft, keep the main fields in sync for the inbox preview
      if (doc.status === 'draft') {
        updatePayload.email = toArray[0] || 'draft@swiftscale.com';
        updatePayload.service = subject || '(No Subject)';
        updatePayload.details = body || '';
      }

      const updated = await Message.findByIdAndUpdate(
        messageId,
        updatePayload,
        { new: true }
      );
      return NextResponse.json({ success: true, draft: updated?.draft });
    } else {
      // Saving brand new compose as draft
      const newDraft = await Message.create({
        firstName: 'Draft',
        lastName: 'Email',
        email: toArray[0] || 'draft@swiftscale.com',
        service: subject || '(No Subject)',
        details: body || '',
        status: 'draft',
        draft: draftData
      });
      return NextResponse.json({ success: true, messageId: newDraft._id, draft: newDraft.draft });
    }

  } catch (error: any) {
    console.error('Save Draft Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    // Find messages that are either status 'draft' OR have a non-empty draft object
    const drafts = await Message.find({
      $or: [
        { status: 'draft' },
        { 'draft.body': { $exists: true, $ne: '' } },
        { 'draft.subject': { $exists: true, $ne: '' } }
      ]
    }).sort({ updatedAt: -1 });

    return NextResponse.json({ success: true, data: drafts });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'Id required' }, { status: 400 });

    await connectDB();
    const doc = await Message.findById(id);
    if (!doc) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

    if (doc.status === 'draft') {
      // If it's a root draft, delete the whole document
      await Message.findByIdAndDelete(id);
    } else {
      // If it's a reply draft, just clear the draft field
      await Message.findByIdAndUpdate(id, { $unset: { draft: 1 } });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
