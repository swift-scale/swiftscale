import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Subscriber from '@/models/Subscriber';

// ── DELETE /api/newsletter/unsubscribe ───────────────────────────────────────
// Soft-delete: marks the subscriber as unsubscribed by email query param
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required.' },
        { status: 400 }
      );
    }

    const subscriber = await Subscriber.findOneAndUpdate(
      { email, status: 'active' },
      { status: 'unsubscribed', unsubscribedAt: new Date() },
      { new: true }
    );

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: 'Subscription not found or already unsubscribed.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'You have been unsubscribed successfully.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
