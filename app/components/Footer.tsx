import Image from "next/image";

const SITE = "https://www.cliftonuae.com";
const INSTAGRAM = "https://www.instagram.com/cliftonrealestate/";

const quickLinks = [
  { href: `${SITE}/`, label: "Home" },
  { href: `${SITE}/about-us`, label: "About Us" },
  { href: `${SITE}/contact-us`, label: "Contact Us" },
];

const services = [
  { href: `${SITE}/invest-in-dubai`, label: "Invest in Dubai" },
  { href: `${SITE}/buy-property`, label: "Buy a Property" },
  { href: `${SITE}/sell-property`, label: "Sell Your Property" },
  { href: `${SITE}/rent-property`, label: "Rent Your Property" },
];

function IgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function FbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function LiIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  { href: INSTAGRAM, label: "Instagram", icon: <IgIcon /> },
  { href: INSTAGRAM, label: "Facebook", icon: <FbIcon /> },
  { href: INSTAGRAM, label: "LinkedIn", icon: <LiIcon /> },
];

export default function Footer() {
  return (
    <footer className="bg-footer border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-12 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/logo.png"
              alt="Clifton Capital Real Estate LLC"
              width={2544}
              height={1288}
              className="h-24 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60 font-light">
              We turn dream homes into reality and help sellers get top dollar
              for their properties. With our deep market expertise and personal
              service, we make real estate transactions seamless.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-copper hover:bg-copper hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-white/60 font-light transition-colors hover:text-copper"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-display text-lg font-semibold text-white mt-8 mb-4">
              Get in touch
            </h4>
            <ul className="space-y-2.5 text-[14px] text-white/60 font-light">
              <li>
                <a href="tel:+971559304697" className="transition-colors hover:text-copper">
                  +971 55 930 4697
                </a>
              </li>
              <li>
                <a href="mailto:realestate@cliftonuae.com" className="transition-colors hover:text-copper">
                  realestate@cliftonuae.com
                </a>
              </li>
              <li className="leading-relaxed">
                508, Sultan Business Centre,
                <br />
                Oud Metha, Dubai, UAE
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-[14px] text-white/60 font-light transition-colors hover:text-copper"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <Image
              src="/images/Trakheesi-QR.webp"
              alt="Trakheesi RERA Permit QR — verify this listing"
              width={200}
              height={200}
              className="h-24 w-24 shrink-0 rounded-lg bg-white p-1.5 object-contain sm:h-28 sm:w-28"
            />
            <div>
              <p className="text-[13px] text-white/45 font-light">
                © 2026 Clifton Capital Real Estate LLC. All rights reserved.
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/30">
RERA : 2043214467 | License: 1289051
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <a href={`${SITE}/privacy-policy`} className="text-[13px] text-white/45 font-light transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href={`${SITE}/terms-of-service`} className="text-[13px] text-white/45 font-light transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
