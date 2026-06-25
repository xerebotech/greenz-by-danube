// Central GTM dataLayer helpers — used by client components to push events.
// Configure the matching Data Layer Variables + GA4 tags in the GTM container UI
// (see GTM-TRACKING.md for the full event/variable/tag spec).

export type ConsentState = "granted" | "denied";

export type ConsentChoice = {
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  analytics_storage: ConsentState;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Push an arbitrary event + params onto the dataLayer. */
export function gtmEvent(
  event: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** Update Google Consent Mode v2 after the user makes a choice. */
export function updateConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // GTM only recognises a consent command when gtag pushes the `arguments`
  // object (not a plain array). The bootstrap defines window.gtag this way;
  // recreate it as a fallback if it's missing.
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      (window.dataLayer as unknown[]).push(arguments);
    };
  }
  window.gtag("consent", "update", choice);
  // Mirror as a normal event so triggers can also react to the consent change.
  gtmEvent("consent_update", { consent: choice });
}

export const CONSENT_COOKIE = "cc_consent";

export const CONSENT_GRANTED: ConsentChoice = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};

export const CONSENT_DENIED: ConsentChoice = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};
