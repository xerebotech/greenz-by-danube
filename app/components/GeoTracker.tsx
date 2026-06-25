"use client";

import { useEffect } from "react";
import { CONSENT_COOKIE, gtmEvent } from "../lib/gtm";

function analyticsGranted(): boolean {
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]+)`),
  );
  if (!m) return false;
  try {
    return JSON.parse(decodeURIComponent(m[1])).analytics_storage === "granted";
  } catch {
    return false;
  }
}

/**
 * Pushes the visitor's country/city to the dataLayer — only after analytics
 * consent is granted. GA4 also derives geo from IP automatically; this exposes
 * it as a dataLayer variable for GTM (routing, personalisation, reporting).
 */
export default function GeoTracker() {
  useEffect(() => {
    let done = false;

    const run = async () => {
      if (done || !analyticsGranted()) return;
      done = true;
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) return;
        const d = await res.json();
        gtmEvent("geo_resolved", {
          geo_country: d.country_name,
          geo_country_code: d.country_code,
          geo_city: d.city,
          geo_region: d.region,
        });
      } catch {
        /* best-effort; ignore network/geo failures */
      }
    };

    run();
    const onConsent = () => run();
    window.addEventListener("cc-consent", onConsent);
    return () => window.removeEventListener("cc-consent", onConsent);
  }, []);

  return null;
}
