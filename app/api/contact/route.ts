import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';
import {
  transporter,
  buildUserConfirmationEmail,
  buildAdminNotificationEmail,
} from '@/lib/mailer';

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
    const receivedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    // ── Save to database ───────────────────────────────────────────────────────
    const message = await Message.create({
      firstName,
      lastName,
      email,
      service,
      details,
    });

    const emailPayload = { firstName, lastName, email, service, details, ticketId };

    // ── 1. Send confirmation email to the user ─────────────────────────────────
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `We received your message — Ticket ${ticketId}`,
      html: buildUserConfirmationEmail(emailPayload),
    });

    // ── 2. Send internal notification to the SwiftScale team ──────────────────
    const adminEmail = 'connect@swiftscaleinc.com';
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: adminEmail,
      replyTo: email,
      subject: `[New Query] ${firstName} ${lastName} — ${service} — ${ticketId}`,
      html: buildAdminNotificationEmail({ ...emailPayload, receivedAt }),
    });

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
