"use client";

import { gtmEvent } from "../lib/gtm";

const faqs = [
  {
    q: "How much do the homes cost?",
    a: "Three-bedroom townhouses start from AED 3.5 million. Four and five-bedroom homes are priced higher. Request the current price list for the latest availability across all layouts.",
  },
  {
    q: "How does the payment plan work?",
    a: "The community offers a flexible plan with a modest booking amount, followed by 1% monthly installments through the construction period, and the balance due around handover. We'll walk you through the exact schedule for your chosen unit.",
  },
  {
    q: "When is handover?",
    a: "Handover is scheduled for Q4 2029. The years until then are exactly when off-plan values typically appreciate, while you pay in small monthly steps.",
  },
  {
    q: "Are the homes really fully furnished?",
    a: "Yes. Every residence is delivered with Italian designer furniture and fitted kitchens and bathrooms. It is genuinely move-in ready, which also means it can be rented out immediately with no fit-out.",
  },
  {
    q: "Can overseas buyers own here, and is it Golden Visa eligible?",
    a: "Yes. The homes are freehold and open to international buyers with full ownership rights. Purchases at the qualifying threshold can make the buyer eligible for the 10-year UAE Golden Visa. We can explain the current requirements.",
  },
  {
    q: "Where exactly is the community?",
    a: "Right next to Dubai Silicon Oasis and minutes from Mirdif, with direct access to Sheikh Mohammed Bin Zayed Road (E311) and Emirates Road (E611). Downtown Dubai is around 20 to 25 minutes away.",
  },
];

export default function Faq() {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group"
          onToggle={(e) => {
            if (e.currentTarget.open)
              gtmEvent("faq_open", { faq_question: f.q });
          }}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 list-none">
            <span className="font-display text-lg sm:text-xl font-medium text-ink">
              {f.q}
            </span>
            <span className="shrink-0 text-copper text-2xl leading-none transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-6 -mt-1 text-[15px] leading-relaxed text-ink-soft font-light">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
