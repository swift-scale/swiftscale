import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';
import { sendContactNotification, sendAutoReply } from '@/lib/mailer';

function generateTicketId(): string {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SS-${datePart}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { firstName, lastName, email, service, details } = body;

    if (!firstName || !lastName || !email || !service || !details) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const ticketId = generateTicketId();

    // ── Save to database ───────────────────────────────────────────────────────
    const message = await Message.create({
      firstName,
      lastName,
      email,
      service,
      details,
    });

    const emailPayload = { firstName, lastName, email, service, details, ticketId };

    // ── 1. Send confirmation email to the user (Auto-Reply) ─────────────────────
    const autoReplyInfo = await sendAutoReply(emailPayload);

    // Save the SMTP message ID so we can thread future replies to it
    if (autoReplyInfo && autoReplyInfo.messageId) {
      message.smtpMessageId = autoReplyInfo.messageId;
      await message.save();
    }

    // ── 2. Send internal notification to the SwiftScale team ──────────────────
    await sendContactNotification(emailPayload);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully', data: message },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
