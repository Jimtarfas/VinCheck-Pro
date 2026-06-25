/**
 * Abandoned-checkout recovery email.
 *
 * Sent manually from Admin → Leads to a buyer who entered their email + VIN
 * at checkout but never completed payment. The angle is "your report is
 * ready, just finish checkout" — we lead with the specific vehicle so it
 * feels personal, restate exactly what they unlock, and drop a single
 * unmissable CTA back to their own report preview where the inline checkout
 * lives.
 *
 * Pure function — no I/O, no globals — mirroring renderOrderConfirmation so
 * the two transactional emails share a visual language.
 */

export interface CheckoutRecoveryInput {
  /** The VIN the buyer was checking out — shown and carried into the CTA. */
  vin: string;
  /** Human label e.g. "2018 Jeep Grand Cherokee" (falls back to VIN). */
  vehicleLabel?: string | null;
  /** Where "Complete your checkout" points — the report preview w/ checkout. */
  checkoutUrl: string;
  /** Intended price in cents, when known, to anchor the offer. */
  amountCents?: number | null;
  currency?: string | null;
  /** Origin used for the footer brand domain (e.g. www.carcheckervin.com). */
  siteOrigin: string;
  /** Support inbox shown in the footer + set as Reply-To. */
  supportEmail: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

// ── Design tokens (kept in sync with order-confirmation.ts) ──────────
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
const AMBER_BG = "#fffbeb";
const AMBER_BORDER = "#fde68a";
const AMBER_TEXT = "#92400e";

// ── Helpers ──────────────────────────────────────────────────────────
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

function brandDomain(origin: string): string {
  const clean = origin.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  return clean.replace(/^app\./i, "");
}

/**
 * Build the {subject, html, text} triple for one abandoned-checkout
 * recovery email.
 */
export function renderCheckoutRecovery(
  input: CheckoutRecoveryInput
): RenderedEmail {
  const labelOrVin = input.vehicleLabel || `VIN ${input.vin}`;
  const subject = `Your report is ready — finish checkout · ${labelOrVin}`;

  const hasPrice =
    typeof input.amountCents === "number" && input.amountCents > 0;
  const priceLabel = hasPrice
    ? formatMoney(input.amountCents!, input.currency || "usd")
    : "";
  const publicDomain = brandDomain(input.siteOrigin);
  const url = escapeHtml(input.checkoutUrl);

  // ── Brand bar (logo lockup) ──
  // The CarCheckerVIN logo rebuilt as an email-safe table so it renders in
  // every client (Gmail/Outlook strip SVG, so we can't reference logo.svg).
  // A white rounded square holding the brand's orange checkmark sits left of
  // the wordmark, mirroring the on-site mark (navy square + orange check),
  // inverted to a white tile so it reads on the navy header.
  const brandBar = `
    <tr>
      <td bgcolor="${NAVY}"
          style="background:${NAVY};
                 background-image:linear-gradient(135deg,${NAVY} 0%,${NAVY_DARK} 100%);
                 padding:22px 28px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="vertical-align:middle;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="38" style="vertical-align:middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="38">
                      <tr>
                        <td width="38" height="38" align="center"
                            bgcolor="#ffffff"
                            style="background:#ffffff;border-radius:10px;
                                   width:38px;height:38px;text-align:center;
                                   vertical-align:middle;
                                   font-family:Arial,Helvetica,sans-serif;
                                   font-size:22px;font-weight:900;
                                   color:${ORANGE};line-height:38px;
                                   box-shadow:0 1px 3px rgba(0,0,0,0.2);">
                          &#10003;
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="12" style="font-size:0;line-height:0;">&nbsp;</td>
                  <td style="vertical-align:middle;
                             font-family:Arial,Helvetica,sans-serif;
                             color:#ffffff;font-size:20px;font-weight:800;
                             letter-spacing:0.3px;line-height:1;">
                    CarChecker<span style="color:${ORANGE};">VIN</span>
                  </td>
                </tr>
              </table>
            </td>
            <td style="text-align:right;vertical-align:middle;
                       font-family:Arial,Helvetica,sans-serif;
                       color:#ffffff;font-size:10px;font-weight:700;
                       letter-spacing:1.6px;opacity:0.85;line-height:1;">
              REPORT READY
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  // ── Hero ──
  const heroSection = `
    <tr>
      <td style="padding:36px 32px 8px 32px;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-bottom:14px;">
              <span style="display:inline-block;background:${AMBER_BG};
                           color:${AMBER_TEXT};
                           border:1px solid ${AMBER_BORDER};
                           border-radius:999px;padding:5px 12px;
                           font-family:Arial,sans-serif;font-size:11px;
                           font-weight:800;letter-spacing:0.6px;
                           text-transform:uppercase;">
                ⏳ You&rsquo;re one step away
              </span>
            </td>
          </tr>
        </table>
        <h1 style="margin:0 0 10px 0;font-size:24px;line-height:1.25;
                   color:${TEXT};font-weight:800;
                   font-family:Arial,Helvetica,sans-serif;
                   letter-spacing:-0.2px;">
          Your report is ready to unlock.
        </h1>
        <p style="margin:0 0 8px 0;font-size:15px;line-height:1.6;
                  color:${MUTED};font-family:Arial,Helvetica,sans-serif;">
          We saved your spot. The full NMVTIS-backed history report for
          <strong style="color:${TEXT};">${escapeHtml(labelOrVin)}</strong>
          is built and waiting &mdash; you just didn&rsquo;t finish checking out.
          ${
            hasPrice
              ? `Complete your order for <strong style="color:${TEXT};">${escapeHtml(
                  priceLabel
                )}</strong> and it unlocks instantly.`
              : `Complete your order and it unlocks instantly.`
          }
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"
               style="margin:2px 0 26px 0;">
          <tr>
            <td style="background:${SUBTLE_BG};border:1px solid ${BORDER};
                       border-radius:8px;padding:9px 14px;
                       vertical-align:middle;">
              <span style="font-family:Arial,Helvetica,sans-serif;
                           font-size:10px;font-weight:800;color:${MUTED};
                           letter-spacing:1px;text-transform:uppercase;">VIN</span>
              <span style="font-family:'Courier New',Consolas,monospace;
                           font-size:15px;font-weight:700;color:${TEXT};
                           letter-spacing:2px;">&nbsp;&nbsp;${escapeHtml(
                             input.vin
                           )}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  // ── Primary CTA ──
  const ctaSection = `
    <tr>
      <td style="padding:0 32px 4px 32px;">
        <!--[if mso]>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
                     xmlns:w="urn:schemas-microsoft-com:office:word"
                     href="${url}"
                     style="height:50px;v-text-anchor:middle;width:260px;"
                     arcsize="20%" stroke="f" fillcolor="${ORANGE}">
          <w:anchorlock/>
          <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">
            Complete your checkout →
          </center>
        </v:roundrect>
        <![endif]-->
        <!--[if !mso]><!-->
        <a href="${url}"
           bgcolor="${ORANGE}"
           style="background:${ORANGE};
                  background-image:linear-gradient(135deg,${ORANGE} 0%,${ORANGE_DARK} 100%);
                  color:#ffffff;text-decoration:none;
                  display:inline-block;padding:15px 34px;border-radius:10px;
                  font-weight:800;font-size:15px;font-family:Arial,Helvetica,sans-serif;
                  line-height:1;letter-spacing:0.2px;
                  box-shadow:0 2px 6px rgba(255,152,0,0.25);">
          Complete your checkout &nbsp;→
        </a>
        <!--<![endif]-->
        <p style="margin:10px 0 0 0;font-family:Arial,Helvetica,sans-serif;
                  font-size:11px;color:${SOFT};line-height:1.5;">
          Secure payment · instant delivery · no account required
        </p>
      </td>
    </tr>`;

  // ── "What you unlock" checklist ──
  const item = (t: string) => `
    <tr>
      <td style="padding:7px 0;font-family:Arial,Helvetica,sans-serif;
                 font-size:13px;color:${TEXT};line-height:1.5;
                 vertical-align:top;" width="22">
        <span style="color:${NAVY};font-weight:800;">✓</span>
      </td>
      <td style="padding:7px 0;font-family:Arial,Helvetica,sans-serif;
                 font-size:13px;color:${MUTED};line-height:1.5;">
        ${t}
      </td>
    </tr>`;

  const unlockSection = `
    <tr>
      <td style="padding:28px 32px 0 32px;">
        <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;
                  font-size:10px;font-weight:800;color:${SOFT};
                  letter-spacing:1.5px;text-transform:uppercase;">
          What your report reveals
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"
               width="100%" style="background:${SUBTLE_BG};
                                   border:1px solid ${BORDER};
                                   border-radius:12px;padding:10px 20px;">
          ${item(
            "<strong style=\"color:" +
              TEXT +
              ';">Title brands</strong> — salvage, rebuilt, flood, lemon & junk records'
          )}
          ${item(
            "<strong style=\"color:" +
              TEXT +
              ';">Accident & damage history</strong> — severity, impact area, airbags'
          )}
          ${item(
            "<strong style=\"color:" +
              TEXT +
              ';">Odometer readings</strong> — spot rollbacks across every record'
          )}
          ${item(
            "<strong style=\"color:" +
              TEXT +
              ';">Open safety recalls</strong> — straight from NHTSA'
          )}
        </table>
      </td>
    </tr>`;

  // ── Reassurance line ──
  const reassureSection = `
    <tr>
      <td style="padding:20px 32px 0 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="background:${AMBER_BG};border:1px solid ${AMBER_BORDER};
                       border-radius:12px;padding:14px 18px;
                       font-family:Arial,Helvetica,sans-serif;
                       font-size:13px;color:${AMBER_TEXT};line-height:1.55;">
              💡 Buying a used car is a five-figure decision. A few dollars
              now could surface a hidden salvage title or rolled-back
              odometer before you sign anything.
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  // ── Trust strip ──
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
          Changed your mind or need a hand? Just reply to this email or write to
          <a href="mailto:${escapeHtml(input.supportEmail)}"
             style="color:${NAVY};text-decoration:underline;font-weight:600;">
            ${escapeHtml(input.supportEmail)}
          </a>.
        </p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;
                  font-size:11px;color:${SOFT};line-height:1.5;">
          You&rsquo;re receiving this because you started a vehicle history
          report order at ${escapeHtml(publicDomain)}. Reports are powered by
          ClearVin LLC, an approved NMVTIS Data Provider.
        </p>
      </td>
    </tr>`;

  // ── Plain-text fallback ──
  const text = [
    `Your CarCheckerVIN report for ${labelOrVin} is ready — you just need to finish checkout.`,
    ``,
    `Complete your checkout: ${input.checkoutUrl}`,
    hasPrice ? `Price: ${priceLabel}` : "",
    ``,
    `VIN: ${input.vin}`,
    ``,
    `What your report reveals:`,
    `  - Title brands (salvage, rebuilt, flood, lemon, junk)`,
    `  - Accident & damage history`,
    `  - Odometer readings (spot rollbacks)`,
    `  - Open safety recalls (NHTSA)`,
    ``,
    `Buying a used car is a five-figure decision — a few dollars now could`,
    `surface a hidden salvage title or rolled-back odometer before you sign.`,
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
    <!-- Preheader -->
    <div style="display:none;max-height:0;overflow:hidden;color:transparent;
                visibility:hidden;mso-hide:all;
                font-size:1px;line-height:1px;opacity:0;">
      Your ${escapeHtml(labelOrVin)} history report is built and waiting —
      finish checkout to unlock it instantly.
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
            ${unlockSection}
            ${reassureSection}
            ${trustStrip}
            ${footerSection}
          </table>

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
