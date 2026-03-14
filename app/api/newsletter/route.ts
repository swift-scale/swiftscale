import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import { transporter, buildWelcomeEmail } from '@/lib/mailer';

// ── POST /api/newsletter ─────────────────────────────────────────────────────
// Subscribe a new email address
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, source = 'website' } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'A valid email is required.' },
        { status: 400 }
      );
    }

    const existing = await Subscriber.findOne({ email });

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { success: false, message: 'This email is already subscribed.' },
          { status: 409 }
        );
      }
      // Re-subscribe if previously unsubscribed
      existing.status = 'active';
      existing.unsubscribedAt = undefined;
      existing.subscribedAt = new Date();
      await existing.save();
      return NextResponse.json(
        { success: true, message: 'Welcome back! You have been re-subscribed.' },
        { status: 200 }
      );
    }

    const subscriber = await Subscriber.create({ email, source });

    // Send welcome email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to SwiftScale — You\'re in!',
      html: buildWelcomeEmail(email),
    });

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!', data: { id: subscriber._id } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Newsletter Subscribe Error:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'This email is already subscribed.' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// ── GET /api/newsletter ──────────────────────────────────────────────────────
// Health check / subscriber count (public)
export async function GET() {
  try {
    await connectDB();
    const count = await Subscriber.countDocuments({ status: 'active' });
    return NextResponse.json({ success: true, activeSubscribers: count });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
