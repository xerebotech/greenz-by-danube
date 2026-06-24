"use client";

import { useState } from "react";

const WHATSAPP = "971559304697";

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string) || "";
    const phone = (data.get("phone") as string) || "";
    const email = (data.get("email") as string) || "";
    const intentLabel = intent === "live" ? "to live in" : "to invest";

    const message =
      `Hi Clifton Capital, I'd like the price list, floor plans and payment plan ` +
      `for the Greenz community (${intentLabel}).\n\n` +
      `Name: ${name}\nPhone/WhatsApp: ${phone}\nEmail: ${email}`;

    setSent(true);
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    window.setTimeout(() => setSent(false), 3500);
  }

  const labelClass =
    "block text-[10.5px] font-semibold uppercase tracking-[0.2em] text-ink/55 mb-2";

  const intents = [
    { key: "live", label: "To live in", icon: <HomeIcon /> },
    { key: "invest", label: "To invest", icon: <TrendIcon /> },
  ] as const;

  return (
    <div className="group/card relative rounded-[30px] bg-[linear-gradient(135deg,#e3d4ba_0%,#ae9573_38%,#8a7458_72%,#cdb999_100%)] p-[2px] shadow-[0_2px_6px_rgba(35,49,45,0.05),0_48px_100px_-46px_rgba(35,49,45,0.65)] transition-shadow duration-500 hover:shadow-[0_2px_6px_rgba(35,49,45,0.06),0_56px_110px_-44px_rgba(35,49,45,0.7)]">
      {/* soft outer halo behind the metallic frame */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[40px] bg-copper/15 blur-2xl" />

      <div className="bg-grain relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-white to-cream/70 p-7 sm:p-9 ring-1 ring-inset ring-white/70">
        {/* refined top sheen + soft corner glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
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
        <h3 className="font-display text-[27px] font-semibold text-ink leading-tight">
          Request the full details
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-soft font-light">
          Price list, floor plans, payment plan and available units — sent to you
          directly.
        </p>

        <div className="rule-copper my-7 opacity-70" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
          {fields.map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className={labelClass}>
                {f.label}
                {f.required && <span className="text-copper"> *</span>}
              </label>
              <div className="group relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-copper/55 transition-colors duration-300 group-focus-within:text-copper">
                  {f.icon}
                </span>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  required={f.required}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-line bg-white py-3.5 pl-11 pr-4 text-[15px] text-ink placeholder:text-muted/55 outline-none transition-all duration-300 focus:border-copper focus:ring-4 focus:ring-copper/10 focus:shadow-[0_6px_22px_-12px_rgba(174,149,115,0.7)]"
                />
              </div>
            </div>
          ))}

          <div>
            <span className={labelClass}>I&apos;m enquiring as</span>
            <div className="relative grid grid-cols-2 rounded-2xl border border-line bg-cream/60 p-1.5 shadow-[inset_0_1px_3px_rgba(35,49,45,0.06)]">
              {/* sliding indicator */}
              <span
                className="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-xl bg-gradient-to-br from-[#2c3d37] to-[#1b2723] shadow-[0_6px_18px_-6px_rgba(35,49,45,0.55)] transition-transform duration-300 [transition-timing-function:var(--ease-lux)]"
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
                    intent === it.key ? "text-cream" : "text-muted hover:text-ink"
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
            className={`group relative mt-1 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
              sent
                ? "bg-copper text-white"
                : "bg-gradient-to-br from-[#2c3d37] to-[#1b2723] text-cream hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(35,49,45,0.7)]"
            }`}
          >
            {/* shine sweep */}
            {!sent && (
              <span className="pointer-events-none absolute top-0 left-[-80%] h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-[left] duration-700 [transition-timing-function:var(--ease-lux)] group-hover:left-[135%]" />
            )}
            {sent ? (
              <>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Opening WhatsApp…
              </>
            ) : (
              <>
                Send me the details
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </button>

          <p className="flex items-center justify-center gap-2 text-[11px] leading-relaxed text-muted font-light">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-copper/70">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your details stay private — we never share them.
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}
