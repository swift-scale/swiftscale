"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Template = {
  id: string;
  name: string;
  subject: string;
  description: string;
  html: string;
};

const previewData: Record<string, string> = {
  year: new Date().getFullYear().toString(),
  reset_link: "https://swiftscale.tech/reset?token=EXAMPLE_TOKEN",
  expiry_minutes: "30",
  support_email: "support@swiftscale.tech",
  request_id: "REQ-90318",
  customer_name: "Alex Morgan",
  response_time: "24 hours",
  ticket_id: "SS-2026-0314-4821",
  customer_message:
    "We need help onboarding our catalog and setting up sponsored ads for the next launch window.",
  customer_email: "alex.morgan@northwind.io",
  customer_phone: "+1 (415) 555-0132",
  company_name: "Northwind Retail",
  service_area: "E-Commerce Services",
  received_at: "March 14, 2026 · 10:24 AM",
  admin_link: "https://swiftscale.tech/admin/inbox/SS-2026-0314-4821",
};

const templates: Template[] = [
  {
    id: "reset-password",
    name: "Reset Password",
    subject: "Reset your password",
    description: "User receives a secure reset link with expiry notice.",
    html: `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Reset Your Password</title>
    <style>
      @media only screen and (max-width: 600px) {
        .outer-card { width: 100% !important; }
        .card-padding { padding: 12px !important; }
        .inner-padding { padding: 20px !important; }
        .inner-card { height: 100% !important; }
        .inner-card { height: 100% !important; }
        .inner-card { height: 100% !important; }
        .inner-card { height: 100% !important; }
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
                    <td class="inner-padding" style="padding:28px 28px 16px 28px;">
                      <div style="text-align:center;">
                  <div class="brand-pill" style="display:inline-flex;align-items:center;gap:16px;padding:12px 24px;border-radius:999px;background:#0b1430;border:1px solid #1e2a4a;">
                    <div class="brand-mark" style="width:44px;height:44px;border-radius:999px;background:#192a5a;color:#7dd3fc;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;letter-spacing:1px;">SS</div>
                    <div style="text-align:left;">
                      <div class="brand-title" style="color:#cbd5f5;font-size:12px;letter-spacing:3px;">SWIFTSCALE</div>
                      <div class="brand-tagline" style="color:#ffffff;font-size:14px;font-weight:600;">Start Smart, Scale Swift.</div>
                    </div>
                  </div>
                  <h1 class="email-title" style="margin:18px 0 8px 0;color:#ffffff;font-size:28px;line-height:1.2;">Reset your password</h1>
                </div>
                <p class="email-body" style="margin:0;color:#9fb3c8;font-size:15px;line-height:1.6;text-align:center;">
                  We received a request to reset your password. Click the button below to set a new password.
                </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 28px 24px 28px;">
                <a href="{{reset_link}}" style="display:inline-block;background:#3b82f6;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600;font-size:14px;">
                  Reset Password
                </a>
                <p style="margin:16px 0 0 0;color:#9fb3c8;font-size:13px;">
                  This link expires in {{expiry_minutes}} minutes. If you did not request this, you can safely ignore this email.
                </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 28px 28px 28px;border-top:1px solid #1f2a4a;color:#7a8da8;font-size:12px;line-height:1.5;">
                Need help? Contact us at {{support_email}}.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="margin-top:16px;color:#5b6b85;font-size:12px;">© {{year}} SwiftScale. All rights reserved.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`
  },
  {
    id: "forgot-password",
    name: "Forgot Password",
    subject: "Create a new password",
    description: "User confirmation with a friendly reset CTA.",
    html: `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Forgot Password</title>
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
                  <h1 class="email-title" style="margin:18px 0 8px 0;color:#ffffff;font-size:28px;line-height:1.2;">Forgot your password?</h1>
                </div>
                <p class="email-body" style="margin:0;color:#9fb3c8;font-size:15px;line-height:1.6;text-align:center;">
                  No worries — it happens. Click the button below to create a new password for your account.
                </p>
                <div style="margin-top:18px;">
                  <a href="{{reset_link}}" style="display:inline-block;background:#22c55e;color:#0b1220;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700;font-size:14px;">
                    Create New Password
                  </a>
                </div>
                <p style="margin:16px 0 0 0;color:#9fb3c8;font-size:13px;">
                  If you did not request a reset, ignore this message or contact support.
                </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 28px 28px 28px;border-top:1px solid #1e2a4a;color:#7a8da8;font-size:12px;line-height:1.5;">
                Support: {{support_email}} · Reference ID: {{request_id}}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="margin-top:16px;color:#5b6b85;font-size:12px;">© {{year}} SwiftScale.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`
  },
  {
    id: "customer-query",
    name: "Customer Query Received",
    subject: "We received your message",
    description: "Confirmation sent to the customer with a ticket ID.",
    html: `<!doctype html>
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
                  Thanks {{customer_name}}, our team is reviewing your request and will get back within {{response_time}}.
                </p>
                <div style="margin:18px 0 0 0;padding:14px;border-radius:12px;background:#0f172a;border:1px solid #1f2a44;color:#cbd5e1;font-size:13px;line-height:1.6;">
                  <strong style="color:#ffffff;">Your message:</strong><br />
                  {{customer_message}}
                </div>
                <p style="margin:16px 0 0 0;color:#9fb3c8;font-size:13px;">
                  Ticket: {{ticket_id}}
                </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 28px 28px 28px;border-top:1px solid #1e2a4a;color:#7a8da8;font-size:12px;line-height:1.5;">
                Reply directly to this email if you have more details to add.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="margin-top:16px;color:#5b6b85;font-size:12px;">© {{year}} SwiftScale.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`
  },
  {
    id: "admin-notification",
    name: "Admin Notification",
    subject: "New customer query",
    description: "Internal alert with customer details and message.",
    html: `<!doctype html>
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
                  <h1 class="email-title" style="margin:18px 0 0 0;color:#ffffff;font-size:24px;">New customer query</h1>
                </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="color:#cbd5e1;font-size:13px;line-height:1.6;">
                  <tr>
                    <td style="padding:6px 0;width:140px;color:#7a8da8;">Name</td>
                    <td style="padding:6px 0;color:#ffffff;">{{customer_name}}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;width:140px;color:#7a8da8;">Email</td>
                    <td style="padding:6px 0;color:#ffffff;">{{customer_email}}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;width:140px;color:#7a8da8;">Phone</td>
                    <td style="padding:6px 0;color:#ffffff;">{{customer_phone}}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;width:140px;color:#7a8da8;">Company</td>
                    <td style="padding:6px 0;color:#ffffff;">{{company_name}}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;width:140px;color:#7a8da8;">Service</td>
                    <td style="padding:6px 0;color:#ffffff;">{{service_area}}</td>
                  </tr>
                </table>

                <div style="margin:16px 0 0 0;padding:14px;border-radius:12px;background:#0f172a;border:1px solid #1f2a44;color:#cbd5e1;font-size:13px;line-height:1.6;">
                  <strong style="color:#ffffff;">Message:</strong><br />
                  {{customer_message}}
                </div>

                <div style="margin-top:18px;">
                  <a href="{{admin_link}}" style="display:inline-block;background:#f59e0b;color:#0b1220;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:700;font-size:13px;">
                    Open in Admin
                  </a>
                </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 28px 24px 28px;border-top:1px solid #1e2a4a;color:#7a8da8;font-size:12px;">
                Ticket: {{ticket_id}} · Received: {{received_at}}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="margin-top:16px;color:#5b6b85;font-size:12px;">© {{year}} SwiftScale.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`
  },
];

function fillTemplate(html: string, data: Record<string, string>) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, value);
  }, html);
}

export default function EmailTemplatesPage() {
  const [selectedId, setSelectedId] = useState(templates[0].id);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const pageYear = new Date().getFullYear();

  const selected = templates.find((template) => template.id === selectedId) ?? templates[0];
  const filledHtml = useMemo(() => fillTemplate(selected.html, previewData), [selected]);

  const previewWidth = previewMode === "desktop" ? 680 : 360;
  const previewHeight = previewMode === "desktop" ? 720 : 720;

  const handleCopy = async () => {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(filledHtml);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="text-center space-y-3">
          <div className="mx-auto w-fit rounded-full border border-white/10 bg-card/60 px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent font-bold">
                SS
              </div>
              <div className="text-left">
                <div className="text-sm uppercase tracking-[0.25em] text-muted-foreground">SwiftScale</div>
                <div className="text-base font-semibold text-white">Email Template Studio</div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold">Template Review & Preview</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Review the core transactional templates and preview the rendered HTML before sending.
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            © {pageYear} SwiftScale
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside className="space-y-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedId(template.id)}
                className={cn(
                  "w-full text-left rounded-2xl border px-4 py-4 transition-all",
                  selectedId === template.id
                    ? "border-accent bg-accent/10 shadow-[0_0_30px_-12px_rgba(76,148,210,0.7)]"
                    : "border-border bg-card/40 hover:border-accent/60",
                )}
              >
                <div className="text-sm text-muted-foreground">{template.subject}</div>
                <div className="text-lg font-semibold text-white mt-1">{template.name}</div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{template.description}</p>
              </button>
            ))}
          </aside>

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Preview</div>
                <h2 className="text-2xl font-display font-semibold text-white">{selected.name}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={previewMode === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                >
                  Desktop
                </Button>
                <Button
                  variant={previewMode === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                >
                  Mobile
                </Button>
                <Button variant="secondary" size="sm" onClick={handleCopy}>
                  Copy HTML
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card/40 p-4">
              <div className="mx-auto rounded-2xl border border-white/10 bg-black/20 overflow-hidden" style={{ width: previewWidth }}>
                <iframe
                  title={`${selected.name} preview`}
                  srcDoc={filledHtml}
                  style={{ width: "100%", height: previewHeight }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Preview uses sample data. Replace placeholders before sending.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">HTML Source</div>
              <textarea
                readOnly
                className="w-full h-56 bg-transparent text-xs text-white/80 font-mono border border-white/10 rounded-xl p-3 focus:outline-none"
                value={filledHtml}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
