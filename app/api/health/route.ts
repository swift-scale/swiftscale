import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '../../../lib/db';

export async function GET() {
  try {
    // Attempt to connect to DB to check its status
    let dbStatus = 'disconnected';
    try {
      await connectDB();
      // mongoose.connection.readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
      dbStatus = states[mongoose.connection.readyState];
    } catch (e) {
      dbStatus = 'error';
      console.error('Health check DB error:', e);
    }

    return NextResponse.json({
      status: 'success',
      message: 'Server is healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: dbStatus,
        server: 'online'
      }
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      error: error.message
    }, { status: 500 });
  }
}
