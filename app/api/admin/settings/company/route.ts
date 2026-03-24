import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Settings from '@/models/Settings';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    
    // Attempt to find settings (there should only be one)
    let settings = await Settings.findOne();

    // If no settings exist yet, create a default one
    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    // Find the one settings document or create it
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ ...body, updatedBy: decoded.id });
    } else {
      settings = await Settings.findOneAndUpdate({}, { ...body, updatedBy: decoded.id }, { new: true });
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
