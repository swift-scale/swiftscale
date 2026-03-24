import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, message: 'Password must be at least 8 characters' }, { status: 400 });
    }

    await connectDB();

    const cleanToken = token.trim();
    const resetPasswordToken = crypto.createHash('sha256').update(cleanToken).digest('hex');
    const now = new Date();

    console.log('RECOVERY LOG -------------------');
    console.log('RECEIVED TOKEN:', cleanToken.substring(0, 10) + '...');
    console.log('SEARCH HASH:', resetPasswordToken);
    console.log('CURRENT TIME:', now.toISOString());

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: now }
    }).select('+password');

    if (!user) {
      // Diagnostic check for the dev console:
      const userByTokenOnly = await User.findOne({ resetPasswordToken });
      if (userByTokenOnly) {
        console.log('TOKEN STATUS: MATCHED BUT EXPIRED');
        console.log('DB EXPIRE TIME:', userByTokenOnly.resetPasswordExpires?.toISOString());
      } else {
        console.log('TOKEN STATUS: NOT FOUND IN DATABASE');
      }
      
      return NextResponse.json({ success: false, message: 'Invalid or expired recovery key' }, { status: 400 });
    }

    console.log('TOKEN STATUS: VERIFIED OK');

    // Check if new password is same as old password
    const isSamePassword = await user.comparePassword(password, user.password);
    if (isSamePassword) {
      return NextResponse.json({ 
        success: false, 
        message: 'New password cannot be the same as your previous password. Please choose a different one.' 
      }, { status: 400 });
    }

    // Update password (pre-save hook will hash it)
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: 'Access restored. Your key has been updated.' });
  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
  }
}
