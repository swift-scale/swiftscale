import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export function buildWelcomeEmail(email: string): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Welcome to SwiftScale</title>
    <style>
      @media only screen and (max-width: 600px) {
        .outer-card { width: 100% !important; }
        .card-padding { padding: 12px !important; }
        .inner-padding { padding: 20px !important; }
        .brand-pill { padding: 10px 16px !important; gap: 12px !important; }
        .brand-mark { width: 38px !important; height: 38px !important; font-size: 12px !important; }
        .brand-title { font-size: 11px !important; letter-spacing: 2px !important; }
        .brand-tagline { font-size: 12px !important; }
        .email-title { font-size: 22px !important; }
        .email-body { font-size: 14px !important; }
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
                    <td class="inner-padding" style="padding:28px 28px 20px 28px;">
                      <div style="text-align:center;">
                        <div class="brand-pill" style="display:inline-flex;align-items:center;gap:16px;padding:12px 24px;border-radius:999px;background:#0b1430;border:1px solid #1e2a4a;">
                          <div class="brand-mark" style="width:44px;height:44px;border-radius:999px;background:#192a5a;color:#7dd3fc;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;letter-spacing:1px;">SS</div>
                          <div style="text-align:left;">
                            <div class="brand-title" style="color:#cbd5f5;font-size:12px;letter-spacing:3px;">SWIFTSCALE</div>
                            <div class="brand-tagline" style="color:#ffffff;font-size:14px;font-weight:600;">Start Smart, Scale Swift.</div>
                          </div>
                        </div>
                        <h1 class="email-title" style="margin:18px 0 8px 0;color:#ffffff;font-size:26px;line-height:1.2;">You're in! 🎉</h1>
                      </div>
                      <p class="email-body" style="margin:0;color:#9fb3c8;font-size:15px;line-height:1.6;text-align:center;">
                        Welcome to the SwiftScale community. You'll be the first to receive our latest insights on e-commerce, IT, and technology — straight to your inbox.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 28px 24px 28px;">
                      <div style="margin-top:18px;padding:14px;border-radius:12px;background:#0f172a;border:1px solid #1f2a44;color:#cbd5e1;font-size:13px;line-height:1.6;">
                        <strong style="color:#ffffff;">What to expect:</strong><br />
                        ✦ Exclusive tech & e-commerce insights<br />
                        ✦ Product updates & new service launches<br />
                        ✦ Special offers for subscribers
                      </div>
                      <p style="margin:16px 0 0 0;color:#9fb3c8;font-size:12px;">
                        You subscribed with <strong style="color:#ffffff;">${email}</strong>. 
                        To unsubscribe at any time, <a href="https://swiftscaleinc.com/unsubscribe?email=${encodeURIComponent(email)}" style="color:#7dd3fc;">click here</a>.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 28px 28px 28px;border-top:1px solid #1e2a4a;color:#7a8da8;font-size:12px;line-height:1.5;">
                      Need help? Contact us at <a href="mailto:connect@swiftscaleinc.com" style="color:#7dd3fc;">connect@swiftscaleinc.com</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="margin-top:16px;color:#5b6b85;font-size:12px;">© 2026 SwiftScale. All rights reserved.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// ─── Confirmation email to the contact (user) ─────────────────────────────────
export function buildUserConfirmationEmail({
  firstName,
  lastName,
  email,
  service,
  details,
  ticketId,
}: {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  details: string;
  ticketId: string;
}): string {
  const fullName = `${firstName} ${lastName}`;
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>We Received Your Message</title>
    <style>
      @media only screen and (max-width: 600px) {
        .outer-card { width: 100% !important; }
        .card-padding { padding: 12px !important; }
        .inner-padding { padding: 20px !important; }
        .brand-pill { padding: 10px 16px !important; gap: 12px !important; }
        .brand-mark { width: 38px !important; height: 38px !important; font-size: 12px !important; }
        .brand-title { font-size: 11px !important; letter-spacing: 2px !important; }
        .brand-tagline { font-size: 12px !important; }
        .email-title { font-size: 22px !important; }
        .email-body { font-size: 14px !important; }
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
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="inner-card" style="background:#0b1430;border-radius:18px;overflow:hidden;border:1px solid #1e2a4a;height:100%;">
                  <tr>
                    <td class="inner-padding" style="padding:28px;">
                      <div style="text-align:center;">
                        <div class="brand-pill" style="display:inline-flex;align-items:center;gap:16px;padding:12px 24px;border-radius:999px;background:#0b1430;border:1px solid #1e2a4a;">
                          <div class="brand-mark" style="width:44px;height:44px;border-radius:999px;background:#192a5a;color:#7dd3fc;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;letter-spacing:1px;">SS</div>
                          <div style="text-align:left;">
                            <div class="brand-title" style="color:#cbd5f5;font-size:12px;letter-spacing:3px;">SWIFTSCALE</div>
                            <div class="brand-tagline" style="color:#ffffff;font-size:14px;font-weight:600;">Start Smart, Scale Swift.</div>
                          </div>
                        </div>
                        <h1 class="email-title" style="margin:18px 0 8px 0;color:#ffffff;font-size:26px;line-height:1.2;">We received your message</h1>
                      </div>
                      <p class="email-body" style="margin:0;color:#9fb3c8;font-size:15px;line-height:1.6;text-align:center;">
                        Thanks ${fullName}, our team is reviewing your request and will get back within 24 hours.
                      </p>
                      <div style="margin:18px 0 0 0;padding:14px;border-radius:12px;background:#0f172a;border:1px solid #1f2a44;color:#cbd5e1;font-size:13px;line-height:1.6;">
                        <strong style="color:#ffffff;">Service Requested:</strong> ${service}<br /><br />
                        <strong style="color:#ffffff;">Your message:</strong><br />
                        ${details}
                      </div>
                      <p style="margin:16px 0 0 0;color:#9fb3c8;font-size:13px;">
                        Ticket: ${ticketId}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 28px 28px 28px;border-top:1px solid #1e2a4a;color:#7a8da8;font-size:12px;line-height:1.5;">
                      Reply directly to this email if you have more details to add. Need help? Contact us at support@swiftscale.tech
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="margin-top:16px;color:#5b6b85;font-size:12px;">© 2026 SwiftScale. All rights reserved.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// ─── Internal notification email to the SwiftScale team ───────────────────────
export function buildAdminNotificationEmail({
  firstName,
  lastName,
  email,
  service,
  details,
  ticketId,
  receivedAt,
}: {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  details: string;
  ticketId: string;
  receivedAt: string;
}): string {
  const fullName = `${firstName} ${lastName}`;
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New Customer Query</title>
    <style>
      @media only screen and (max-width: 600px) {
        .outer-card { width: 100% !important; }
        .card-padding { padding: 12px !important; }
        .inner-padding { padding: 20px !important; }
        .brand-pill { padding: 10px 16px !important; gap: 12px !important; }
        .brand-mark { width: 38px !important; height: 38px !important; font-size: 12px !important; }
        .brand-title { font-size: 11px !important; letter-spacing: 2px !important; }
        .brand-tagline { font-size: 12px !important; }
        .email-title { font-size: 22px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" class="outer-card" style="max-width:640px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td class="card-padding" style="padding:18px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="inner-card" style="background:#0b1430;border-radius:18px;overflow:hidden;border:1px solid #1e2a4a;height:100%;">
                  <tr>
                    <td class="inner-padding" style="padding:24px 28px;border-bottom:1px solid #1e2a4a;">
                      <div style="text-align:center;">
                        <div class="brand-pill" style="display:inline-flex;align-items:center;gap:16px;padding:12px 24px;border-radius:999px;background:#0b1430;border:1px solid #1e2a4a;">
                          <div class="brand-mark" style="width:44px;height:44px;border-radius:999px;background:#192a5a;color:#fbbf24;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;letter-spacing:1px;">SS</div>
                          <div style="text-align:left;">
                            <div class="brand-title" style="color:#cbd5f5;font-size:12px;letter-spacing:3px;">SWIFTSCALE</div>
                            <div class="brand-tagline" style="color:#ffffff;font-size:14px;font-weight:600;">Start Smart, Scale Swift.</div>
                          </div>
                        </div>
                        <h1 class="email-title" style="margin:18px 0 0 0;color:#ffffff;font-size:24px;">New Customer Query</h1>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 28px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="color:#cbd5e1;font-size:13px;line-height:1.6;">
                        <tr>
                          <td style="padding:6px 0;width:140px;color:#7a8da8;">Name</td>
                          <td style="padding:6px 0;color:#ffffff;">${fullName}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;width:140px;color:#7a8da8;">Email</td>
                          <td style="padding:6px 0;color:#ffffff;">${email}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;width:140px;color:#7a8da8;">Service</td>
                          <td style="padding:6px 0;color:#ffffff;">${service}</td>
                        </tr>
                      </table>
                      <div style="margin:16px 0 0 0;padding:14px;border-radius:12px;background:#0f172a;border:1px solid #1f2a44;color:#cbd5e1;font-size:13px;line-height:1.6;">
                        <strong style="color:#ffffff;">Message:</strong><br />
                        ${details}
                      </div>
                      <div style="margin-top:18px;">
                        <a href="https://swiftscale.tech/admin" style="display:inline-block;background:#f59e0b;color:#0b1220;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:700;font-size:13px;">
                          Open in Admin
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 28px 24px 28px;border-top:1px solid #1e2a4a;color:#7a8da8;font-size:12px;">
                      Ticket: ${ticketId} · Received: ${receivedAt}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="margin-top:16px;color:#5b6b85;font-size:12px;">© 2026 SwiftScale.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// ─── Main sendEmail Utility ──────────────────────────────────────────────────
export default async function sendEmail({
  email,
  subject,
  message,
  html,
}: {
  email: string;
  subject: string;
  message?: string;
  html?: string;
}) {
  return await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Swiftscale" <connect@swiftscaleinc.com>',
    to: email,
    subject: subject,
    text: message,
    html: html,
  });
}
