import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Loads GTM with Google Consent Mode v2 defaulting to "denied" for all
 * advertising/analytics storage until the visitor accepts via the cookie
 * banner. Reads any previously stored choice from the `cc_consent` cookie so
 * returning visitors keep their preference.
 */
export default function GtmScripts() {
  if (!GTM_ID) return null;
  return (
    <Script
      id="gtm-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          var stored;
          try {
            var m = document.cookie.match(/(?:^|; )cc_consent=([^;]+)/);
            if (m) stored = JSON.parse(decodeURIComponent(m[1]));
          } catch (e) {}
          gtag('consent', 'default', {
            ad_storage: (stored && stored.ad_storage) || 'denied',
            ad_user_data: (stored && stored.ad_user_data) || 'denied',
            ad_personalization: (stored && stored.ad_personalization) || 'denied',
            analytics_storage: (stored && stored.analytics_storage) || 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
          gtag('js', new Date());
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
        `,
      }}
    />
  );
}

/** GTM <noscript> fallback — render at the very top of <body>. */
export function GtmNoscript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
