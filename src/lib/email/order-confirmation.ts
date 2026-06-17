/**
 * Order-confirmation email template — premium redesign.
 *
 * Inline CSS only (Gmail strips <style>, Outlook strips a lot more)
 * and a single outer <table> layout because email clients have been
 * stuck in 2003 since 2003. The design borrows from the marketing
 * site's navy/orange palette and renders correctly across:
 *
 *   • Gmail (web + iOS + Android)
 *   • Apple Mail (macOS + iOS, light + dark)
 *   • Outlook desktop (MSO conditional comments handled)
 *   • Outlook.com / Office 365 web
 *
 * Hosting note: assets in /public/email/* are served from the public
 * app origin. The page passes `siteOrigin` (e.g. "app.carcheckervin.com")
 * — we prepend https:// when building the <img src> so the same code
 * works in preview deploys.
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
   * When present we render a second CTA labelled "Set your password".
   * When omitted (Supabase generateLink failed, or running in mock
   * mode) we hide the button — the report link still works.
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

// ── Design tokens ──────────────────────────────────────────────────
// Pulled straight from the marketing site palette so the email feels
// like the same brand.
const NAVY = "#003178";
const NAVY_DARK = "#001f4d";
const ORANGE = "#ff9800";
const ORANGE_DARK = "#e07f00";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const SOFT = "#94a3b8";
const BORDER = "#e2e8f0";
const SUBTLE_BG = "#f8fafc";
const PAGE_BG = "#eef2f7";
const SUCCESS_BG = "#ecfdf5";
const SUCCESS_BORDER = "#a7f3d0";
const SUCCESS_TEXT = "#065f46";

// ── Helpers ────────────────────────────────────────────────────────
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

function absoluteAsset(origin: string, path: string): string {
  // origin comes in as "app.carcheckervin.com" — strip any accidental
  // protocol, then rebuild with https.
  const clean = origin.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  return `https://${clean}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Strip the "app." subdomain so the human-friendly brand domain
 * (carcheckervin.com) is what shows in the footer, not the internal
 * app subdomain. Preserves the host as-is if there's no "app." prefix
 * (so preview deploys / localhost don't get mangled).
 */
function brandDomain(origin: string): string {
  const clean = origin.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  return clean.replace(/^app\./i, "");
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
  const logoIconUrl = absoluteAsset(input.siteOrigin, "/email/icon.png");
  // Brand-facing domain (carcheckervin.com) — what we show to the
  // buyer, even though the email links technically resolve through
  // the app. subdomain.
  const publicDomain = brandDomain(input.siteOrigin);

  // ── Brand bar (gradient navy with icon + wordmark) ──
  // Outlook ignores CSS gradients entirely; we paint the solid navy
  // as a fallback and the gradient on top via -webkit-/inline only.
  // bgcolor= on the <td> guarantees the fallback shows in MSO.
  const brandBar = `
    <tr>
      <td bgcolor="${NAVY}"
          style="background:${NAVY};
                 background-image:linear-gradient(135deg,${NAVY} 0%,${NAVY_DARK} 100%);
                 padding:20px 28px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="vertical-align:middle;">
              <img src="${escapeHtml(logoIconUrl)}"
                   width="32" height="32" alt="CarCheckerVIN"
                   style="display:inline-block;vertical-align:middle;
                          border-radius:6px;border:0;outline:none;
                          margin-right:10px;"/>
              <span style="display:inline-block;vertical-align:middle;
                           font-family:Arial,Helvetica,sans-serif;
                           color:#ffffff;font-size:18px;font-weight:800;
                           letter-spacing:0.3px;">CarChecker<span style="color:${ORANGE};">VIN</span></span>
            </td>
            <td style="text-align:right;vertical-align:middle;
                       font-family:Arial,Helvetica,sans-serif;
                       color:#ffffff;font-size:10px;font-weight:700;
                       letter-spacing:1.6px;opacity:0.85;">
              ORDER CONFIRMATION
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  // ── Hero section ──
  // The hero leads with a green "Paid" pill (psychological close on
  // the transaction) and a tight vehicle-headline. The amount lives
  // here too so the most important "facts" are visible in the
  // Gmail preview pane without scrolling.
  const heroSection = `
    <tr>
      <td style="padding:36px 32px 8px 32px;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-bottom:14px;">
              <span style="display:inline-block;background:${SUCCESS_BG};
                           color:${SUCCESS_TEXT};
                           border:1px solid ${SUCCESS_BORDER};
                           border-radius:999px;padding:5px 12px;
                           font-family:Arial,sans-serif;font-size:11px;
                           font-weight:800;letter-spacing:0.6px;
                           text-transform:uppercase;">
                ✓ Paid · ${escapeHtml(amountLabel)}
              </span>
            </td>
          </tr>
        </table>
        <h1 style="margin:0 0 10px 0;font-size:28px;line-height:1.2;
                   color:${TEXT};font-weight:800;
                   font-family:Georgia,'Times New Roman',serif;
                   letter-spacing:-0.3px;">
          Your report is ready.
        </h1>
        <p style="margin:0 0 28px 0;font-size:15px;line-height:1.6;
                  color:${MUTED};font-family:Arial,Helvetica,sans-serif;">
          Thanks for your purchase. Your full NMVTIS-backed history report for
          <strong style="color:${TEXT};">${escapeHtml(labelOrVin)}</strong>
          is live and ready to view.
        </p>
      </td>
    </tr>`;

  // ── CTAs ──
  // Primary: orange "View your report" — the action that pays off the
  // transaction. Secondary (when magic-link URL is present): outline
  // "Set your password" with a short label of what it does, so the
  // buyer understands they're not being asked to log in to view this
  // particular report.
  const ctaSection = `
    <tr>
      <td style="padding:0 32px 4px 32px;">
        <!--[if mso]>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
                     xmlns:w="urn:schemas-microsoft-com:office:word"
                     href="${escapeHtml(input.reportUrl)}"
                     style="height:50px;v-text-anchor:middle;width:230px;"
                     arcsize="20%" stroke="f" fillcolor="${ORANGE}">
          <w:anchorlock/>
          <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">
            View your report →
          </center>
        </v:roundrect>
        <![endif]-->
        <!--[if !mso]><!-->
        <a href="${escapeHtml(input.reportUrl)}"
           bgcolor="${ORANGE}"
           style="background:${ORANGE};
                  background-image:linear-gradient(135deg,${ORANGE} 0%,${ORANGE_DARK} 100%);
                  color:#ffffff;text-decoration:none;
                  display:inline-block;padding:15px 32px;border-radius:10px;
                  font-weight:800;font-size:15px;font-family:Arial,Helvetica,sans-serif;
                  line-height:1;letter-spacing:0.2px;
                  box-shadow:0 2px 6px rgba(255,152,0,0.25);">
          View your report &nbsp;→
        </a>
        <!--<![endif]-->
      </td>
    </tr>`;

  const signInBlock = input.signInUrl
    ? `
    <tr>
      <td style="padding:20px 32px 4px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="border-top:1px solid ${BORDER};padding-top:22px;">
              <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;
                        color:${TEXT};font-size:14px;font-weight:700;line-height:1.4;">
                One last thing — set a password
              </p>
              <p style="margin:0 0 14px 0;font-family:Arial,Helvetica,sans-serif;
                        color:${MUTED};font-size:13px;line-height:1.6;">
                Your account was created automatically with this email.
                Add a password so you can sign in any time without
                clicking an email link.
              </p>
              <a href="${escapeHtml(input.signInUrl)}"
                 style="display:inline-block;padding:11px 22px;
                        border:1.5px solid ${NAVY};border-radius:10px;
                        color:${NAVY};text-decoration:none;
                        font-weight:700;font-size:13px;
                        font-family:Arial,Helvetica,sans-serif;line-height:1;">
                Set your password
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
    : "";

  // ── Receipt block ──
  // Faux-table list with subtle row dividers. Right-aligned values
  // and tabular-style numerals so the column lines up cleanly even
  // when Gmail strips font features.
  const receiptRow = (label: string, value: string, isLast = false) => `
    <tr>
      <td style="padding:11px 0 ${isLast ? "0" : "10px"};
                 ${isLast ? "" : `border-bottom:1px solid ${BORDER};`}
                 font-family:Arial,Helvetica,sans-serif;font-size:13px;
                 color:${MUTED};">${escapeHtml(label)}</td>
      <td style="padding:11px 0 ${isLast ? "0" : "10px"};
                 ${isLast ? "" : `border-bottom:1px solid ${BORDER};`}
                 font-family:'Courier New',Consolas,monospace;font-size:13px;
                 color:${TEXT};text-align:right;font-weight:600;
                 letter-spacing:0.2px;">${escapeHtml(value)}</td>
    </tr>`;

  const receiptRows = [
    receiptRow("VIN", input.vin),
    input.vehicleLabel ? receiptRow("Vehicle", input.vehicleLabel) : "",
    receiptRow("Amount paid", amountLabel),
    receiptRow("Order ID", input.orderId, true),
  ]
    .filter(Boolean)
    .join("");

  const receiptSection = `
    <tr>
      <td style="padding:28px 32px 0 32px;">
        <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;
                  font-size:10px;font-weight:800;color:${SOFT};
                  letter-spacing:1.5px;text-transform:uppercase;">
          Order receipt
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"
               width="100%" style="background:${SUBTLE_BG};
                                   border:1px solid ${BORDER};
                                   border-radius:12px;padding:18px 20px;">
          ${receiptRows}
        </table>
      </td>
    </tr>`;

  const bundleBlock = hasBundle
    ? `
    <tr>
      <td style="padding:18px 32px 0 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"
               width="100%" style="background:#fef3c7;
                                   border:1px solid #fbbf24;
                                   border-radius:12px;">
          <tr>
            <td style="padding:16px 20px;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 4px 0;font-size:14px;font-weight:800;color:#78350f;">
                🎁 ${credits} report credit${credits === 1 ? "" : "s"} added to your account
              </p>
              <p style="margin:0;font-size:13px;line-height:1.5;color:#92400e;">
                ${
                  expiresLabel
                    ? `Spend them on any VIN until <strong>${escapeHtml(expiresLabel)}</strong>. Sign in to your account dashboard to redeem.`
                    : "Spend them on any VIN within the next 12 months from your account dashboard."
                }
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
    : "";

  // ── Trust strip ──
  // 3 mini-badges in a single row, no images required — just inline
  // SVG-like emoji + text so it renders identically in every client.
  const trustStrip = `
    <tr>
      <td style="padding:28px 32px 24px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"
               width="100%" style="border-top:1px solid ${BORDER};
                                   padding-top:22px;">
          <tr>
            <td align="center" width="33%"
                style="font-family:Arial,Helvetica,sans-serif;
                       font-size:11px;color:${MUTED};line-height:1.4;">
              <div style="font-size:14px;color:${NAVY};font-weight:800;
                          letter-spacing:0.4px;margin-bottom:2px;">NMVTIS</div>
              Federal title<br/>data source
            </td>
            <td align="center" width="33%"
                style="font-family:Arial,Helvetica,sans-serif;
                       font-size:11px;color:${MUTED};line-height:1.4;
                       border-left:1px solid ${BORDER};
                       border-right:1px solid ${BORDER};">
              <div style="font-size:14px;color:${NAVY};font-weight:800;
                          letter-spacing:0.4px;margin-bottom:2px;">NICB</div>
              Stolen + salvage<br/>records
            </td>
            <td align="center" width="33%"
                style="font-family:Arial,Helvetica,sans-serif;
                       font-size:11px;color:${MUTED};line-height:1.4;">
              <div style="font-size:14px;color:${NAVY};font-weight:800;
                          letter-spacing:0.4px;margin-bottom:2px;">NHTSA</div>
              Safety recall<br/>data
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  // ── Footer ──
  const footerSection = `
    <tr>
      <td style="padding:24px 32px;background:${SUBTLE_BG};
                 border-top:1px solid ${BORDER};
                 border-radius:0 0 16px 16px;">
        <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;
                  font-size:12px;color:${MUTED};line-height:1.6;">
          Questions? Reply to this email or write to
          <a href="mailto:${escapeHtml(input.supportEmail)}"
             style="color:${NAVY};text-decoration:underline;font-weight:600;">
            ${escapeHtml(input.supportEmail)}
          </a>.
        </p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;
                  font-size:11px;color:${SOFT};line-height:1.5;">
          You received this email because you purchased a vehicle history
          report at ${escapeHtml(publicDomain)}. Reports are powered by
          ClearVin LLC, an approved NMVTIS Data Provider.
        </p>
      </td>
    </tr>`;

  // ── Plain-text fallback ──
  const text = [
    `Your CarCheckerVIN report for ${labelOrVin} is ready.`,
    ``,
    `View it: ${input.reportUrl}`,
    input.signInUrl ? `Set your password: ${input.signInUrl}` : "",
    ``,
    `─── Order receipt ───`,
    `VIN: ${input.vin}`,
    input.vehicleLabel ? `Vehicle: ${input.vehicleLabel}` : "",
    `Amount paid: ${amountLabel}`,
    `Order ID: ${input.orderId}`,
    hasBundle
      ? `\n${credits} report credit${credits === 1 ? "" : "s"} added to your account` +
        (expiresLabel ? ` (valid until ${expiresLabel}).` : ".")
      : "",
    ``,
    `Questions? Reply to this email or write us at ${input.supportEmail}.`,
    ``,
    `CarCheckerVIN · ${publicDomain}`,
  ]
    .filter(Boolean)
    .join("\n");

  // ── HTML ──
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta name="x-apple-disable-message-reformatting"/>
    <meta name="color-scheme" content="light"/>
    <meta name="supported-color-schemes" content="light"/>
    <title>${escapeHtml(subject)}</title>
    <!--[if mso]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
  </head>
  <body style="margin:0;padding:0;background:${PAGE_BG};
               font-family:Arial,Helvetica,sans-serif;color:${TEXT};
               -webkit-font-smoothing:antialiased;
               -moz-osx-font-smoothing:grayscale;">
    <!-- Preheader (hidden but Gmail/Apple Mail show as preview snippet) -->
    <div style="display:none;max-height:0;overflow:hidden;color:transparent;
                visibility:hidden;mso-hide:all;
                font-size:1px;line-height:1px;opacity:0;">
      Your ${escapeHtml(labelOrVin)} history report is ready — tap to view.
      Receipt and account access inside.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0"
           width="100%" style="background:${PAGE_BG};">
      <tr>
        <td align="center" style="padding:32px 16px 40px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                 width="600" style="max-width:600px;background:#ffffff;
                                    border:1px solid ${BORDER};
                                    border-radius:16px;overflow:hidden;
                                    box-shadow:0 2px 8px rgba(15,23,42,0.04);">
            ${brandBar}
            ${heroSection}
            ${ctaSection}
            ${signInBlock}
            ${receiptSection}
            ${bundleBlock}
            ${trustStrip}
            ${footerSection}
          </table>

          <!-- Sub-footer below the card with a soft secondary CTA + branding -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                 width="600" style="max-width:600px;margin-top:16px;">
            <tr>
              <td align="center"
                  style="font-family:Arial,Helvetica,sans-serif;
                         font-size:11px;color:${SOFT};line-height:1.6;">
                © ${new Date().getFullYear()} CarCheckerVIN ·
                Powered by ClearVin LLC, an approved NMVTIS Data Provider
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
