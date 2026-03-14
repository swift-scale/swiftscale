import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import User from '../../../../models/User';
import { signToken } from '../../../../lib/auth';
import sendEmail from '../../../../lib/mailer';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const { name, email, password } = await req.json();

    // 1) Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // 2) Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // 3) Generate Token
    const token = signToken(user._id);

    // 4) Send Welcome Email (Titan SMTP)
    try {
      await sendEmail({
        email: user.email,
        subject: 'Welcome to Swiftscale!',
        message: `Hi ${user.name},\n\nWelcome to Swiftscale! Your account has been successfully created.`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #241BEB;">Welcome to Swiftscale!</h2>
            <p>Hi <strong>${user.name}</strong>,</p>
            <p>Your account has been successfully created. We are excited to have you on board!</p>
            <br />
            <p>Best regards,</p>
            <p>The Swiftscale Team</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Registration email failed to send:', emailError);
      // We don't want to fail the whole registration if just the email fails
    }

    // 5) Respond
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return NextResponse.json({
      status: 'success',
      token,
      data: { user: userResponse }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
