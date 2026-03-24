import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const { firstName, lastName, email, department, title, avatar, currentPassword, newPassword, otp } = body;

    const user = await User.findById(decoded.id).select('+password');
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Handle password update if provided (now requires OTP)
    if (newPassword) {
      if (!otp) {
        return NextResponse.json({ success: false, message: 'OTP is required for password change' }, { status: 400 });
      }

      if (user.otp !== otp || user.otpExpires < new Date()) {
        return NextResponse.json({ success: false, message: 'Invalid or expired OTP' }, { status: 400 });
      }

      // Check if new password is same as old password
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        return NextResponse.json({ 
          success: false, 
          message: 'New password cannot be the same as your current password.' 
        }, { status: 400 });
      }
      
      // Clear OTP after use
      user.otp = undefined;
      user.otpExpires = undefined;
      user.password = newPassword;
    }

    // Update other fields
    console.log('UPDATING PROFILE FOR:', decoded.id, 'BODY:', body);
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (department) user.department = department;
    if (title) user.title = title;
    if (body.hasOwnProperty('avatar')) user.avatar = avatar;
    
    // Update the 'name' field too for consistency
    if (firstName || lastName) {
      user.name = `${firstName || user.firstName || ''} ${lastName || user.lastName || ''}`.trim();
    }

    await user.save();

    // Remove password from response
    const updatedUser = user.toObject();
    delete updatedUser.password;

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error: any) {
    console.error('Profile Update Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
