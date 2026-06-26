// Captures where a visitor came from (Google Ads / Meta Ads / organic / direct)
// so it can be stored alongside the lead in the Google Sheet.
//
// Strategy: first-touch. On the first page load of a session we read the URL
// query (utm_*, gclid, fbclid, …) plus document.referrer and stash it in
// sessionStorage. Later anchor navigation on this single-page site can't wipe
// it, so the value sent with the form reflects the original entry point.

export type Attribution = {
  channel: string; // friendly label: "Google Ads" | "Meta Ads" | ...
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  fbclid: string;
  referrer: string;
  landing_page: string;
};

const STORAGE_KEY = "cc_attribution";

const EMPTY: Attribution = {
  channel: "Direct",
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
  gclid: "",
  gbraid: "",
  wbraid: "",
  fbclid: "",
  referrer: "",
  landing_page: "",
};

/** Derive a human-friendly channel from the raw signals. */
function deriveChannel(a: Omit<Attribution, "channel">): string {
  const src = a.source.toLowerCase();
  const med = a.medium.toLowerCase();
  const ref = a.referrer.toLowerCase();

  // Paid clicks carry a click id — most reliable signal.
  if (a.gclid || a.gbraid || a.wbraid) return "Google Ads";
  if (a.fbclid) return "Meta Ads";

  // Explicit UTM tagging (e.g. set on the ad's final URL).
  const isPaid = med === "cpc" || med === "ppc" || med === "paid" || med.includes("paid");
  if (src.includes("google") && isPaid) return "Google Ads";
  if (
    (src.includes("facebook") || src.includes("instagram") || src.includes("meta") || src === "ig" || src === "fb") &&
    isPaid
  ) {
    return "Meta Ads";
  }
  if (src && isPaid) return `Paid — ${a.source}`;
  if (src) return `Campaign — ${a.source}`; // tagged but not paid (email, newsletter…)

  // No UTM — fall back to the referrer.
  if (ref) {
    if (ref.includes("google.")) return "Google (Organic)";
    if (ref.includes("facebook.") || ref.includes("instagram.")) return "Meta (Organic/Social)";
    if (ref.includes("bing.")) return "Bing (Organic)";
    if (ref.includes("cliftonuae.com")) return "Clifton Website";
    return "Referral";
  }

  return "Direct";
}

/** Read query + referrer and persist first-touch attribution. Call once on mount. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    // Already captured this session — keep first touch.
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const q = new URLSearchParams(window.location.search);
    const base: Omit<Attribution, "channel"> = {
      source: q.get("utm_source") ?? "",
      medium: q.get("utm_medium") ?? "",
      campaign: q.get("utm_campaign") ?? "",
      term: q.get("utm_term") ?? "",
      content: q.get("utm_content") ?? "",
      gclid: q.get("gclid") ?? "",
      gbraid: q.get("gbraid") ?? "",
      wbraid: q.get("wbraid") ?? "",
      fbclid: q.get("fbclid") ?? "",
      referrer: document.referrer || "",
      landing_page: window.location.pathname + window.location.search,
    };
    const full: Attribution = { ...base, channel: deriveChannel(base) };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  } catch {
    /* storage blocked — non-fatal */
  }
}

/** Read the stored attribution (or a Direct default). */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return EMPTY;
}
