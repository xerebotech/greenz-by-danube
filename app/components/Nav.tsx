"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#offer", label: "The Offer" },
  { href: "#gallery", label: "Gallery" },
  { href: "#community", label: "Community" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // At the very top we sit over the dark cinematic hero → light text/logo.
  // Once scrolled onto the light content → dark text/logo on a frosted bar.
  const linkClass = `relative text-[10px] font-bold uppercase tracking-[0.25em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-copper after:transition-all after:duration-300 hover:after:w-full ${
    scrolled
      ? "text-ink/70 hover:text-ink"
      : "text-cream/75 hover:text-cream"
  }`;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-12 transition-all duration-500 border-b ${
        scrolled
          ? "py-3 bg-cream/90 backdrop-blur-xl border-line shadow-[0_8px_30px_rgba(35,49,45,0.08)]"
          : "py-5 bg-transparent border-transparent"
      }`}
    >
      <a href="#top" aria-label="Clifton Capital Real Estate" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Clifton Capital Real Estate LLC"
          width={2544}
          height={1288}
          priority
          className={`h-16 w-auto object-contain transition-all duration-500 sm:h-20 ${
            scrolled ? "" : "brightness-0 invert"
          }`}
        />
      </a>

      <div className="flex items-center gap-6 lg:gap-10">
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#enquiry"
          className={`text-[11px] font-bold uppercase tracking-[0.25em] border px-5 sm:px-6 py-3 transition-all duration-500 ${
            scrolled
              ? "text-copper border-copper hover:bg-copper hover:text-white"
              : "text-cream border-cream/60 hover:bg-cream hover:text-ink"
          }`}
        >
          Get In Touch
        </a>
      </div>
    </nav>
  );
}
