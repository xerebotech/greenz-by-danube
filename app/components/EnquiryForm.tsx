"use client";

import { useEffect, useRef, useState } from "react";
import { gtmEvent } from "../lib/gtm";
import { captureAttribution, getAttribution } from "../lib/attribution";

/* — inline icons — */
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5 12 3l9 6.5" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 7h4v4" />
    </svg>
  );
}

const fields = [
  { id: "name", label: "Full name", type: "text", placeholder: "Your name", required: true, icon: <UserIcon /> },
  { id: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+971 50 000 0000", required: true, icon: <PhoneIcon /> },
  { id: "email", label: "Email", type: "email", placeholder: "you@email.com", required: false, icon: <MailIcon /> },
] as const;

export default function EnquiryForm() {
  const [intent, setIntent] = useState<"live" | "invest">("live");
  const [sent, setSent] = useState(false);
  const startedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Record the visitor's entry point (Google Ads / Meta Ads / organic / direct)
  // on first load so it can travel with the lead to the sheet.
  useEffect(() => {
    captureAttribution();
  }, []);

  function closeSuccess() {
    setSent(false);
    setIntent("live");
    startedRef.current = false;
    formRef.current?.reset();
  }

  function handleFirstFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    gtmEvent("form_start", { form_id: "hero_enquiry" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string) || "";
    const phone = (data.get("phone") as string) || "";
    const email = (data.get("email") as string) || "";
    const intentLabel = intent === "live" ? "to live in" : "to invest";
    const attribution = getAttribution();

    setSent(true);

    // Lead conversion — source is the on-page enquiry form (not WhatsApp).
    // `user_data` is for Google Ads Enhanced Conversions ONLY (GTM hashes it).
    // Never map these raw fields into GA4 event parameters.
    gtmEvent("generate_lead", {
      form_id: "hero_enquiry",
      enquiry_type: intent === "live" ? "to_live_in" : "to_invest",
      lead_source: "form-enquiry",
      traffic_channel: attribution.channel,
      utm_source: attribution.source,
      utm_medium: attribution.medium,
      utm_campaign: attribution.campaign,
      user_data: {
        name,
        email_address: email,
        phone_number: phone,
      },
    });

    // Store the lead in the Google Sheet (with where it came from).
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, intent: intentLabel, attribution }),
      });
    } catch {
      /* network failure is non-blocking for the visitor */
    }
  }

  const labelClass =
    "block text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cream/70 mb-2";

  const intents = [
    { key: "live", label: "To live in", icon: <HomeIcon /> },
    { key: "invest", label: "To invest", icon: <TrendIcon /> },
  ] as const;

  return (
    <>
    <div className="group/card relative rounded-[30px] bg-[linear-gradient(135deg,#e3d4ba_0%,#ae9573_38%,#8a7458_72%,#cdb999_100%)] p-[2px] shadow-[0_2px_6px_rgba(35,49,45,0.05),0_48px_100px_-46px_rgba(35,49,45,0.65)] transition-shadow duration-500 hover:shadow-[0_2px_6px_rgba(35,49,45,0.06),0_56px_110px_-44px_rgba(35,49,45,0.7)]">
      {/* soft outer halo behind the metallic frame */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[40px] bg-copper/15 blur-2xl" />

      <div className="relative overflow-hidden rounded-[28px] bg-[#141d1a]/55 p-7 sm:p-9 ring-1 ring-inset ring-white/10 backdrop-blur-2xl">
        {/* refined top sheen + soft corner glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="pointer-events-none absolute -top-24 -right-20 h-44 w-44 rounded-full bg-copper/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-44 w-44 rounded-full bg-gold/15 blur-3xl" />

        {/* bespoke corner accents */}
        <div className="pointer-events-none absolute inset-[14px] z-10">
          <span className="absolute left-0 top-0 h-4 w-4 rounded-tl-[10px] border-l border-t border-copper/45" />
          <span className="absolute right-0 top-0 h-4 w-4 rounded-tr-[10px] border-r border-t border-copper/45" />
          <span className="absolute bottom-0 left-0 h-4 w-4 rounded-bl-[10px] border-b border-l border-copper/45" />
          <span className="absolute bottom-0 right-0 h-4 w-4 rounded-br-[10px] border-b border-r border-copper/45" />
        </div>

        <div className="relative">
        <p className="eyebrow eyebrow--plain mb-3 text-copper">
          <span className="text-copper">◆</span> Private Enquiry
        </p>
        <h3 className="font-display text-[27px] font-semibold text-cream leading-tight">
          Request the full details
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-cream/70 font-light">
          Price list, floor plans, payment plan and available units — sent to you
          directly.
        </p>

        <div className="rule-copper my-7 opacity-70" />

        <form
          ref={formRef}
          id="enquiry-form"
          name="enquiry-form"
          data-form="hero-enquiry"
          onSubmit={handleSubmit}
          onFocusCapture={handleFirstFocus}
          className="flex flex-col gap-[18px]"
        >
          {fields.map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className={labelClass}>
                {f.label}
                {f.required && <span className="text-copper"> *</span>}
              </label>
              <div className="group relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-copper/80 transition-colors duration-300 group-focus-within:text-copper">
                  {f.icon}
                </span>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  required={f.required}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-white/25 bg-white/[0.1] py-3.5 pl-11 pr-4 text-[15px] text-cream placeholder:text-cream/45 outline-none transition-all duration-300 focus:border-copper focus:bg-white/[0.16] focus:ring-4 focus:ring-copper/20"
                />
              </div>
            </div>
          ))}

          <div>
            <span className={labelClass}>I&apos;m enquiring as</span>
            <div className="relative grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5">
              {/* sliding indicator */}
              <span
                className="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-xl bg-gradient-to-br from-[#c2a986] to-[#9a8159] shadow-[0_6px_18px_-6px_rgba(174,149,115,0.6)] transition-transform duration-300 [transition-timing-function:var(--ease-lux)]"
                style={{
                  transform:
                    intent === "invest" ? "translateX(100%)" : "translateX(0)",
                }}
                aria-hidden="true"
              />
              {intents.map((it) => (
                <button
                  key={it.key}
                  type="button"
                  onClick={() => setIntent(it.key)}
                  className={`relative z-10 flex items-center justify-center gap-2 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                    intent === it.key ? "text-rich" : "text-cream/55 hover:text-cream"
                  }`}
                >
                  {it.icon}
                  {it.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            id="enquiry-submit"
            data-cta="enquiry-submit"
            disabled={sent}
            className="group relative mt-1 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-br from-[#c2a986] via-[#ae9573] to-[#93785a] py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-rich transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(174,149,115,0.7)] disabled:opacity-80"
          >
            {/* shine sweep */}
            <span className="pointer-events-none absolute top-0 left-[-80%] h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-[left] duration-700 [transition-timing-function:var(--ease-lux)] group-hover:left-[135%]" />
            {sent ? "Sending…" : "Send me the details"}
            {!sent && (
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            )}
          </button>

          <p className="flex items-center justify-center gap-2 text-[11px] leading-relaxed text-cream/50 font-light">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-copper">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your details stay private — we never share them.
          </p>
        </form>
        </div>
      </div>
    </div>

      {sent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Request received"
          className="animate-fade fixed inset-0 z-[130] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
        >
          <div className="animate-pop relative w-full max-w-md overflow-hidden rounded-[28px] border border-copper/30 bg-gradient-to-br from-white to-cream/80 p-8 text-center shadow-[0_44px_100px_-30px_rgba(35,49,45,0.7)]">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-copper via-gold to-copper" />

            {/* animated checkmark */}
            <div className="relative mx-auto mt-2 h-20 w-20">
              <span className="animate-ring absolute inset-0 rounded-full bg-copper/40" />
              <span className="animate-check relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-copper to-copper-dark text-white shadow-[0_12px_30px_-8px_rgba(174,149,115,0.7)]">
                <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>

            <h3 className="mt-6 font-display text-[28px] font-semibold text-ink">
              Thank you!
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft font-light">
              Your request has been received. Our team will contact you shortly
              with the price list, floor plans and payment plan.
            </p>

            <button
              type="button"
              onClick={closeSuccess}
              className="mt-7 w-full rounded-xl bg-gradient-to-br from-[#2c3d37] to-[#1b2723] py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-12px_rgba(35,49,45,0.6)]"
            >
              Done
            </button>

            <p className="mt-4 text-[12px] text-muted">
              Prefer to talk now?{" "}
              <a
                href="https://wa.me/971559304697"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  gtmEvent("contact_click", {
                    enquiry_type: "whatsapp-enquiry",
                    method: "whatsapp-enquiry",
                  })
                }
                className="font-semibold text-copper underline underline-offset-2 hover:text-copper-dark"
              >
                WhatsApp us
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
