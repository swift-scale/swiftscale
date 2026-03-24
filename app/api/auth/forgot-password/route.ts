import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import User from '@/models/User';
import connectDB from '@/lib/db';
import sendEmail from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Please provide an email' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });

    // For security, even if user doesn't exist, we return success but don't send email
    if (!user) {
      return NextResponse.json({ success: true, message: 'Recovery instructions sent if account exists' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    console.log('RECOVERY GENERATION LOG -------------------');
    console.log('EMAIL:', email);
    console.log('CLIENT TOKEN (URL):', resetToken.substring(0, 10) + '...');
    console.log('STORED HASH:', resetPasswordToken);
    console.log('EXPIRES AT:', resetPasswordExpires.toISOString());
    console.log('-------------------------------------------');

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`;

    // Send email
    await sendEmail({
      email: user.email,
      subject: 'Identity Restoration Protocol - Swift Scale',
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
                <td align="center" style="padding:40px 16px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="outer-card" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 20px 50px rgba(0,0,0,0.05);">
                    <tr>
                      <td class="card-padding" style="padding:18px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#0b1430;border-radius:18px;overflow:hidden;border:1px solid #1e2a4a;">
                          <tr>
                            <td class="inner-padding" style="padding:40px 32px;">
                              <div style="text-align:center;">
                                <div class="brand-pill" style="display:inline-flex;align-items:center;gap:16px;padding:12px 24px;border-radius:999px;background:#0b1430;border:1px solid #1e2a4a;margin-bottom:32px;">
                                  <div class="brand-mark" style="width:44px;height:44px;border-radius:999px;background:#192a5a;color:#fbbf24;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;letter-spacing:1px;">SS</div>
                                  <div style="text-align:left;">
                                    <div style="color:#cbd5f5;font-size:12px;letter-spacing:3px;text-transform:uppercase;">SWIFT SCALE</div>
                                    <div style="color:#ffffff;font-size:14px;font-weight:600;">Regeneration Center</div>
                                  </div>
                                </div>
                                <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;font-weight:900;">Identity Recovery</h1>
                                <p style="margin:16px 0 0 0;color:#9fb3c8;font-size:16px;line-height:1.6;max-width:340px;margin-left:auto;margin-right:auto;">
                                  An identity restoration protocol has been initiated for your administrative account.
                                </p>
                              </div>

                              <div style="margin:40px 0;text-align:center;">
                                <a href="${resetUrl}" style="display:inline-block;background-color:#241BEB;color:#ffffff;padding:20px 48px;border-radius:16px;font-weight:900;text-decoration:none;font-size:14px;letter-spacing:2px;text-transform:uppercase;box-shadow:0 10px 30px rgba(36,27,235,0.3);">Restore Access Now</a>
                              </div>

                              <div style="padding:20px;border-top:1px solid #1e2a4a;margin-top:40px;text-align:center;">
                                <p style="color:#5b6b85;font-size:13px;line-height:1.6;">
                                  This restoration key will expire in <strong>30 minutes</strong>.<br/>
                                  If you did not initiate this request, please secure your account immediately.
                                </p>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <div style="margin-top:24px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">© 2026 Swift Scale · Security Gateway</div>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      senderAlias: 'support'
    });

    return NextResponse.json({ success: true, message: 'Recovery instructions sent if account exists' });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
  }
}
