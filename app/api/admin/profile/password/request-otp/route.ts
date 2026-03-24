import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import sendEmail from '@/lib/mailer';

export async function POST(req: NextRequest) {
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
    const { currentPassword } = await req.json();

    const user = await User.findById(decoded.id).select('+password');
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Verify current password first
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Current password incorrect' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Rate limiting: 5 requests per 1 hour
    const now = new Date();
    if (user.otpResetTime && now < user.otpResetTime) {
      if (user.otpRequestCount >= 5) {
        const remainingMinutes = Math.ceil((user.otpResetTime.getTime() - now.getTime()) / (60 * 1000));
        return NextResponse.json({ 
          success: false, 
          message: `Too many requests. Please try again in ${remainingMinutes} minutes.` 
        }, { status: 429 });
      }
      user.otpRequestCount += 1;
    } else {
      user.otpRequestCount = 1;
      user.otpResetTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    }

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP email
    await sendEmail({
      email: user.email,
      subject: 'Security Verification Code - Swift Scale',
      html: `
        <!doctype html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <style>
              @media only screen and (max-width: 600px) {
                .outer-card { width: 100% !important; }
                .card-padding { padding: 12px !important; }
                .inner-padding { padding: 20px !important; }
                .brand-pill { padding: 10px 16px !important; gap: 12px !important; }
                .brand-mark { width: 38px !important; height: 38px !important; font-size: 12px !important; }
              }
            </style>
          </head>
          <body style="margin:0;padding:0;background-color:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center" style="padding:32px 16px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="outer-card" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e5e7eb;">
                    <tr>
                      <td class="card-padding" style="padding:18px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0b1430;border-radius:18px;overflow:hidden;border:1px solid #1e2a4a;">
                          <tr>
                            <td class="inner-padding" style="padding:32px 28px 24px 28px;">
                              <div style="text-align:center;">
                                <div class="brand-pill" style="display:inline-flex;align-items:center;gap:16px;padding:12px 24px;border-radius:999px;background:#0b1430;border:1px solid #1e2a4a;margin-bottom:24px;">
                                  <div class="brand-mark" style="width:44px;height:44px;border-radius:999px;background:#192a5a;color:#7dd3fc;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;letter-spacing:1px;">SS</div>
                                  <div style="text-align:left;">
                                    <div style="color:#cbd5f5;font-size:12px;letter-spacing:3px;text-transform:uppercase;">SWIFT SCALE</div>
                                    <div style="color:#ffffff;font-size:14px;font-weight:600;">Start Smart, Scale Swift.</div>
                                  </div>
                                </div>
                                <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.2;font-weight:800;">Verification Required</h1>
                                <p style="margin:12px 0 0 0;color:#9fb3c8;font-size:15px;line-height:1.6;">
                                  Please use the cryptographic code below to authorize your password change.
                                </p>
                              </div>

                              <div style="margin:32px 0;background:#0f172a;border-radius:16px;border:1px solid #1f2a44;padding:32px;text-align:center;">
                                <div style="color:#7a8da8;font-size:11px;text-transform:uppercase;letter-spacing:4px;margin-bottom:12px;font-weight:700;">YOUR OTP CODE</div>
                                <div style="color:#ffffff;font-size:48px;font-weight:900;letter-spacing:12px;margin:0;font-family:monospace;">${otp}</div>
                              </div>

                              <div style="padding:16px;border-radius:12px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);color:#fbbf24;font-size:13px;line-height:1.6;text-align:center;">
                                🛡️ This code will expire in <strong>10 minutes</strong> for your security.
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:20px 28px;border-top:1px solid #1e2a4a;color:#5b6b85;font-size:12px;text-align:center;line-height:1.5;">
                              If you did not request this verification, please contact the cybersecurity team immediately.
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <div style="margin-top:16px;color:#5b6b85;font-size:12px;">© 2026 Swift Scale Global. Unauthorized access is prohibited.</div>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      senderAlias: 'support'
    });

    return NextResponse.json({ success: true, message: 'OTP sent to your email' });
  } catch (error: any) {
    console.error('OTP Request Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
