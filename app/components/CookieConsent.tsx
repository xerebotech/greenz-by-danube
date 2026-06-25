"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_COOKIE,
  gtmEvent,
  updateConsent,
  type ConsentChoice,
} from "../lib/gtm";

const SITE = "https://www.cliftonuae.com";

function readStored(): { analytics: boolean; marketing: boolean } | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]+)`),
  );
  if (!m) return null;
  try {
    const c = JSON.parse(decodeURIComponent(m[1]));
    return {
      analytics: c.analytics_storage === "granted",
      marketing: c.ad_storage === "granted",
    };
  } catch {
    return null;
  }
}

function persist(analytics: boolean, marketing: boolean, action: string) {
  const choice: ConsentChoice = {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  };
  const value = encodeURIComponent(JSON.stringify(choice));
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 182}; SameSite=Lax`;
  updateConsent(choice);
  gtmEvent("cookie_consent", {
    consent_action: action,
    analytics_consent: analytics,
    marketing_consent: marketing,
  });
  window.dispatchEvent(new CustomEvent("cc-consent", { detail: choice }));
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function CookieIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z" />
      <path d="M8.5 8.5v.01M16 12v.01M11 14v.01M9 18v.01M15 16v.01" />
    </svg>
  );
}

function Toggle({
  on,
  onChange,
  locked,
}: {
  on: boolean;
  onChange?: () => void;
  locked?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={locked}
      onClick={onChange}
      className={`relative h-7 w-[52px] shrink-0 rounded-full ring-1 ring-inset transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper ${
        on
          ? "bg-gradient-to-r from-copper to-copper-dark ring-copper/40"
          : "bg-white/10 ring-white/15"
      } ${locked ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-all duration-300 [transition-timing-function:var(--ease-lux)] ${
          on ? "left-[28px]" : "left-1"
        }`}
      />
    </button>
  );
}

const categories = [
  {
    key: "necessary" as const,
    title: "Necessary Cookies",
    required: true,
    desc: "Essential for website functionality and security. Cannot be disabled.",
  },
  {
    key: "analytics" as const,
    title: "Analytics Tracking",
    required: false,
    desc: "Help us understand how visitors interact with the site to improve performance.",
  },
  {
    key: "marketing" as const,
    title: "Marketing & Personalization",
    required: false,
    desc: "Used to deliver personalized ads and content based on your interests.",
  },
];

export default function CookieConsent() {
  const [ready, setReady] = useState(false); // scrolled past hero
  const [open, setOpen] = useState(false);
  const [decided, setDecided] = useState(true); // assume decided until mount check
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Read stored choice on mount.
  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setDecided(true);
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
    } else {
      setDecided(false);
    }
  }, []);

  // Reveal once the visitor reaches the content past the hero (so it never
  // overlaps the hero form); auto-open once if undecided.
  useEffect(() => {
    const onScroll = () => {
      const offer = document.getElementById("offer");
      const past = offer
        ? offer.getBoundingClientRect().top < window.innerHeight * 0.6
        : window.scrollY > window.innerHeight * 1.4;
      if (past) {
        setReady(true);
        if (!readStored()) setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function finish(a: boolean, m: boolean, action: string) {
    persist(a, m, action);
    setAnalytics(a);
    setMarketing(m);
    setDecided(true);
    setOpen(false);
  }

  return (
    <>
      {/* Floating "Cookie Settings" pill — appears after the hero */}
      {ready && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Cookie settings"
          className="fixed bottom-5 left-5 z-[110] flex items-center gap-0 rounded-full border border-copper/30 bg-[#23312d] p-3 text-left shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-copper sm:gap-3 sm:px-4 sm:py-2.5"
        >
          <span className="text-copper">
            <CookieIcon />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-[13px] font-semibold text-cream">
              Cookie Settings
            </span>
            <span className="block text-[9px] uppercase tracking-[0.22em] text-cream/50">
              Customize
            </span>
          </span>
        </button>
      )}

      {/* Preferences modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-[460px] overflow-hidden rounded-[28px] border border-copper/20 bg-[#23312d] p-7 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper to-transparent" />

            {decided && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-cream/70 transition-colors hover:text-cream"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* header */}
            <div className="flex flex-col items-center text-center">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-copper/15 text-copper ring-1 ring-copper/20">
                <ShieldIcon />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-[0.06em] text-cream">
                Cookie Preferences
              </h3>
              <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-cream/65 font-light">
                We respect your privacy. Manage how we use cookies to personalize
                your experience.
              </p>
            </div>

            {/* categories */}
            <div className="mt-6 flex flex-col gap-3">
              {categories.map((c) => {
                const on =
                  c.key === "necessary"
                    ? true
                    : c.key === "analytics"
                      ? analytics
                      : marketing;
                return (
                  <div
                    key={c.key}
                    className="rounded-2xl border border-white/5 bg-black/20 p-4 transition-colors duration-300 hover:border-white/15"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[12px] font-bold uppercase tracking-[0.14em] text-cream">
                          {c.title}
                        </h4>
                        {c.required && (
                          <span className="rounded-full bg-copper/20 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.1em] text-copper">
                            Required
                          </span>
                        )}
                      </div>
                      <Toggle
                        on={on}
                        locked={c.required}
                        onChange={
                          c.key === "analytics"
                            ? () => setAnalytics((v) => !v)
                            : c.key === "marketing"
                              ? () => setMarketing((v) => !v)
                              : undefined
                        }
                      />
                    </div>
                    <p className="mt-2 text-[11.5px] leading-relaxed text-cream/55 font-light">
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* actions */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => finish(true, true, "accept_all")}
                className="w-full rounded-xl bg-gradient-to-br from-[#c2a986] via-[#ae9573] to-[#93785a] py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-rich shadow-[0_12px_30px_-12px_rgba(174,149,115,0.7)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Accept all
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => finish(analytics, marketing, "save_custom")}
                  className="rounded-xl border border-cream/25 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-cream/85 transition-colors duration-300 hover:border-cream hover:text-cream"
                >
                  Save custom
                </button>
                <button
                  type="button"
                  onClick={() => finish(false, false, "decline")}
                  className="rounded-xl border border-cream/25 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-cream/85 transition-colors duration-300 hover:border-cream hover:text-cream"
                >
                  Decline
                </button>
              </div>
            </div>

            <p className="mt-4 text-center text-[10.5px] text-cream/40 font-light">
              See our{" "}
              <a
                href={`${SITE}/privacy-policy`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-copper underline underline-offset-2 hover:text-gold"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}
