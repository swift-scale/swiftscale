import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    
    // Validate required fields
    const { firstName, lastName, email, service, details } = body;
    
    if (!firstName || !lastName || !email || !service || !details) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Create message
    const message = await Message.create({
      firstName,
      lastName,
      email,
      service,
      details,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: message
    }, { status: 201 });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
