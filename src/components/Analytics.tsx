"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// Microsoft Clarity — free heatmaps & session replays from Microsoft.
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "x3242sq7oo";
// PostHog product analytics — public write-only client key + US cloud host.
const POSTHOG_KEY = "phc_y5gMUYZ2PyX2hdbAgj5HRcPVx9pvdTjw2ENmeWNvvjAm";
const POSTHOG_HOST = "https://us.i.posthog.com";
// Reddit Ads conversion pixel — public advertiser id for ad attribution.
const REDDIT_PIXEL_ID =
  process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID || "a2_ixshjzc8ty4p";

/**
 * Holds the SESSION-REPLAY analytics tools (PostHog + Clarity). Unlike GA4/GTM
 * — which only log URLs and events — these tools record the page DOM. Our
 * admin console and dashboards render customer PII (emails, chat messages,
 * contact submissions, VIN lookups) as visible text, which replay tools do
 * NOT mask (only typed inputs are masked). Shipping those screens to PostHog
 * and Microsoft would be a privacy leak and a policy/GDPR/CCPA risk.
 *
 * So we refuse to load them on operator/auth surfaces. Mirrors the same
 * pathname-gating used by ConditionalFooter.tsx and Header.tsx.
 */
const BLOCKED_PREFIXES = [
  "/admin",
  "/dashboard",
  "/studio",
  "/login",
  "/signup",
];

export default function Analytics() {
  const pathname = usePathname() ?? "";
  const blocked = BLOCKED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (blocked) return null;

  return (
    <>
      {/* Microsoft Clarity — lazyOnload keeps it off the critical path. */}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      )}

      {/* PostHog — product analytics, session replay, feature flags.
          lazyOnload keeps the ~50KB array.js off the critical path. */}
      <Script id="posthog-init" strategy="lazyOnload">
        {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('${POSTHOG_KEY}',{api_host:'${POSTHOG_HOST}', defaults:'2026-01-30'})`}
      </Script>

      {/* Reddit Pixel — marketing conversion pixel (NOT session replay, no DOM
          capture). afterInteractive (not lazyOnload) so rdt/pixel.js is present
          soon after hydration — Reddit's Event Setup Tool probes for it early
          and times out if it loads too late. Inherits the BLOCKED_PREFIXES gate
          above, so it never fires on operator/auth pages. */}
      {REDDIT_PIXEL_ID && (
        <Script id="reddit-pixel-init" strategy="afterInteractive">
          {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=${REDDIT_PIXEL_ID}",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
          rdt('init','${REDDIT_PIXEL_ID}');
          rdt('track','PageVisit');`}
        </Script>
      )}
    </>
  );
}
