/**
 * Order-confirmation email template.
 *
 * Rendered server-side from the Stripe webhook after a successful
 * checkout.session.completed. Inline-CSS only — Gmail strips <style>
 * blocks, and Outlook will render a giant block of source if HTML
 * starts with anything other than a <table>. The layout sticks to
 * one outer <table> + inline styles for that reason.
 *
 * Inputs are intentionally narrow so the template stays easy to test:
 * the webhook gathers the data, passes it in, and we produce subject +
 * html + text. No environment variables, no async work, no DB access.
 */

export interface OrderConfirmationInput {
  /** Order UUID. Used as the reference number and the report link. */
  orderId: string;
  /** 17-character VIN; rendered in the receipt row. */
  vin: string;
  /** Optional "2023 Toyota Camry" label decoded from the VIN. */
  vehicleLabel?: string | null;
  /** Amount paid in cents (e.g. 999 = $9.99). */
  amountCents: number;
  /** ISO-4217 currency code; almost always "usd". */
  currency: string;
  /**
   * When the order included a prepaid bundle, the size (3 / 5 / 10).
   * The webhook computes bundle credits as size − 1.
   */
  bundleSize?: number | null;
  /** When the bundle credits expire (12 months out by default). */
  bundleExpiresAt?: string | null;
  /** Direct link to the report. Works without auth via the buyer cookie. */
  reportUrl: string;
  /**
   * Optional magic-link URL from supabase.auth.admin.generateLink.
   * When present we render a second CTA labelled "Sign in to your
   * account". When omitted (Supabase generateLink failed, or running
   * in mock mode) we hide the button — the report link still works.
   */
  signInUrl?: string;
  /** Origin used in the footer support links (e.g. app.carcheckervin.com). */
  siteOrigin: string;
  /** Support inbox shown in the footer + set as Reply-To. */
  supportEmail: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

const PRIMARY = "#003178"; // CarCheckerVIN navy
const SECONDARY = "#ff9800"; // accent orange
const TEXT = "#1f2937";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const BG = "#f7f9fc";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMoney(cents: number, currency: string): string {
  const dollars = cents / 100;
  const sym = currency.toLowerCase() === "usd" ? "$" : "";
  return `${sym}${dollars.toFixed(2)} ${currency.toUpperCase()}`;
}

function formatExpiry(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Build the {subject, html, text} triple for a single order
 * confirmation. Pure function — no I/O, no globals.
 */
export function renderOrderConfirmation(
  input: OrderConfirmationInput
): RenderedEmail {
  const labelOrVin = input.vehicleLabel || `VIN ${input.vin}`;
  const subject = `Your CarCheckerVIN report is ready · ${labelOrVin}`;

  const amountLabel = formatMoney(input.amountCents, input.currency);
  const hasBundle = input.bundleSize && input.bundleSize > 1;
  const credits = hasBundle ? input.bundleSize! - 1 : 0;
  const expiresLabel = formatExpiry(input.bundleExpiresAt);

  // ── Buttons ──
  // Gmail mobile breaks bgcolor when style alone is used, so we set
  // bgcolor= attribute too. Padding is doubled to give a comfortable
  // tap target on phones (~44pt minimum).
  const primaryButton = `
    <a href="${escapeHtml(input.reportUrl)}"
       style="background:${PRIMARY};color:#ffffff;text-decoration:none;
              display:inline-block;padding:14px 26px;border-radius:10px;
              font-weight:700;font-size:15px;font-family:Arial,sans-serif;
              line-height:1;"
       bgcolor="${PRIMARY}">
      View your report &nbsp;→
    </a>`;

  const signInButton = input.signInUrl
    ? `
    <p style="margin:16px 0 0 0;font-family:Arial,sans-serif;
              color:${MUTED};font-size:13px;line-height:1.5;">
      Your account is ready. Set a password so you can sign in any
      time without an email link:
    </p>
    <p style="margin:8px 0 0 0;">
      <a href="${escapeHtml(input.signInUrl)}"
         style="background:#ffffff;color:${PRIMARY};text-decoration:none;
                display:inline-block;padding:11px 22px;border-radius:10px;
                font-weight:700;font-size:14px;font-family:Arial,sans-serif;
                border:1.5px solid ${PRIMARY};line-height:1;">
        Set your password
      </a>
    </p>`
    : "";

  // ── Receipt rows ──
  const receiptRow = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 0;font-family:Arial,sans-serif;font-size:13px;
                 color:${MUTED};">${escapeHtml(label)}</td>
      <td style="padding:8px 0;font-family:Arial,sans-serif;font-size:13px;
                 color:${TEXT};text-align:right;font-weight:600;">${escapeHtml(value)}</td>
    </tr>`;

  const receiptRows = [
    receiptRow("VIN", input.vin),
    input.vehicleLabel ? receiptRow("Vehicle", input.vehicleLabel) : "",
    receiptRow("Amount paid", amountLabel),
    receiptRow("Order ID", input.orderId),
  ]
    .filter(Boolean)
    .join("");

  const bundleBlock = hasBundle
    ? `
    <tr>
      <td style="padding:0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"
               style="width:100%;margin-top:20px;background:#fef3c7;
                      border:1px solid #fde68a;border-radius:10px;">
          <tr>
            <td style="padding:14px 18px;font-family:Arial,sans-serif;
                       font-size:13px;color:#92400e;line-height:1.5;">
              <strong style="font-size:14px;">
                ${credits} report credit${credits === 1 ? "" : "s"} added to your account
              </strong>
              <br/>
              ${
                expiresLabel
                  ? `Valid until ${escapeHtml(expiresLabel)} on any VIN. ` +
                    `Redeem from your account dashboard.`
                  : "Redeem from your account dashboard on any VIN."
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>`
    : "";

  // ── Plain-text fallback ──
  // Gmail's preview pane shows the first ~90 chars of this when the
  // user has images blocked, so lead with the most useful line.
  const text = [
    `Your CarCheckerVIN report for ${labelOrVin} is ready.`,
    ``,
    `View it: ${input.reportUrl}`,
    input.signInUrl ? `Set your password: ${input.signInUrl}` : "",
    ``,
    `Order ID: ${input.orderId}`,
    `VIN: ${input.vin}`,
    input.vehicleLabel ? `Vehicle: ${input.vehicleLabel}` : "",
    `Amount paid: ${amountLabel}`,
    hasBundle
      ? `${credits} report credit${credits === 1 ? "" : "s"} added to your account` +
        (expiresLabel ? ` (valid until ${expiresLabel}).` : ".")
      : "",
    ``,
    `Questions? Reply to this email or write us at ${input.supportEmail}.`,
    ``,
    `CarCheckerVIN · ${input.siteOrigin}`,
  ]
    .filter(Boolean)
    .join("\n");

  // ── HTML ──
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BG};
               font-family:Arial,Helvetica,sans-serif;color:${TEXT};">
    <!-- Preheader (hidden but Gmail/Apple Mail read it as the preview snippet) -->
    <div style="display:none;max-height:0;overflow:hidden;color:transparent;
                visibility:hidden;mso-hide:all;">
      Your CarCheckerVIN report for ${escapeHtml(labelOrVin)} is ready.
      Tap "View your report" to open it.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0"
           width="100%" style="background:${BG};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                 width="560" style="max-width:560px;background:#ffffff;
                                    border:1px solid ${BORDER};
                                    border-radius:16px;overflow:hidden;">
            <!-- Brand bar -->
            <tr>
              <td style="background:${PRIMARY};padding:18px 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-family:Arial,sans-serif;color:#ffffff;
                               font-size:18px;font-weight:800;letter-spacing:0.3px;">
                      CarChecker<span style="color:${SECONDARY};">VIN</span>
                    </td>
                    <td style="font-family:Arial,sans-serif;color:#ffffff;
                               font-size:11px;text-align:right;opacity:0.85;
                               letter-spacing:1.4px;">
                      ORDER CONFIRMATION
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px 28px 8px 28px;font-family:Arial,sans-serif;">
                <h1 style="margin:0 0 8px 0;font-size:24px;line-height:1.25;
                           color:${TEXT};font-weight:800;">
                  Your report is ready.
                </h1>
                <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;
                          color:${MUTED};">
                  Thanks for your purchase. Your NMVTIS-backed vehicle history report
                  for <strong style="color:${TEXT};">${escapeHtml(labelOrVin)}</strong>
                  is live and ready to view.
                </p>

                <!-- Primary CTA -->
                ${primaryButton}

                ${signInButton}
              </td>
            </tr>

            <!-- Receipt -->
            <tr>
              <td style="padding:24px 28px 0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                       width="100%" style="border-top:1px solid ${BORDER};
                                          padding-top:16px;">
                  ${receiptRows}
                  ${bundleBlock}
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:28px;border-top:1px solid ${BORDER};
                         margin-top:24px;">
                <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;
                          color:${MUTED};line-height:1.6;">
                  Questions? Reply to this email or write to
                  <a href="mailto:${escapeHtml(input.supportEmail)}"
                     style="color:${PRIMARY};text-decoration:underline;">
                    ${escapeHtml(input.supportEmail)}
                  </a>.
                </p>
                <p style="margin:12px 0 0 0;font-family:Arial,sans-serif;
                          font-size:11px;color:${MUTED};line-height:1.5;">
                  You received this email because you purchased a vehicle history
                  report at ${escapeHtml(input.siteOrigin)}. Reports are powered by
                  ClearVin LLC, an approved NMVTIS Data Provider.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}
