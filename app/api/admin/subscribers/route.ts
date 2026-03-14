import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Subscriber from '@/models/Subscriber';

// ── GET /api/admin/subscribers ───────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // optional filter
    const query = status && status !== 'all' ? { status } : {};

    const subscribers = await Subscriber.find(query)
      .sort({ subscribedAt: -1 })
      .select('email status source subscribedAt unsubscribedAt');

    const total = await Subscriber.countDocuments();
    const active = await Subscriber.countDocuments({ status: 'active' });
    const unsubscribed = total - active;

    return NextResponse.json({
      success: true,
      stats: { total, active, unsubscribed },
      data: subscribers,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ── DELETE /api/admin/subscribers ───────────────────────────────────────────
// Hard delete a subscriber by ID
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID is required.' }, { status: 400 });
    }

    await Subscriber.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Subscriber removed.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
