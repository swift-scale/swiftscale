import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await req.json();

    // 1) Check if email and password exist
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Please provide email and password' },
        { status: 400 }
      );
    }

    // 2) Check if user exists && password is correct
    // We must manually select the password because it's set to select: false in schema
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
      return NextResponse.json(
        { message: 'Incorrect email or password' },
        { status: 401 }
      );
    }

     // 3) If everything ok, send token to client
     const token = signToken(user._id);
 
     // Remove password from output
     user.password = undefined;
 
     const response = NextResponse.json({
       status: 'success',
       token,
       data: { user }
     });
 
     // Set cookie
     response.cookies.set('admin-token', token, {
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
       sameSite: 'lax',
       maxAge: 24 * 60 * 60, // 24 hours (1 day)
       path: '/',
     });
 
     return response;

  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
