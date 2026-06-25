"use client";

import { gtmEvent } from "../lib/gtm";

type Props = {
  href: string;
  /** Enquiry label pushed to the dataLayer, e.g. "call-enquiry" | "whatsapp-enquiry" */
  enquiry: string;
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
};

/**
 * Anchor that records a contact conversion on click (call / WhatsApp / email).
 * Fires `contact_click` with `enquiry_type` so GTM/GA4 can attribute the source.
 */
export default function ContactLink({
  href,
  enquiry,
  className,
  target,
  rel,
  children,
}: Props) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() =>
        gtmEvent("contact_click", { enquiry_type: enquiry, method: enquiry })
      }
    >
      {children}
    </a>
  );
}
