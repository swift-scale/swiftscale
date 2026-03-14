import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';
import Service from '@/models/Service';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const [messageCount, newMessages, serviceCount] = await Promise.all([
      Message.countDocuments(),
      Message.countDocuments({ status: 'new' }),
      Service.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalMessages: messageCount,
        newMessages: newMessages,
        totalServices: serviceCount,
        // Mock traffic for now
        totalViews: 124563 + messageCount * 12, 
        conversionRate: serviceCount > 0 ? ((messageCount / (messageCount + 100)) * 100).toFixed(1) : 0
      }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
