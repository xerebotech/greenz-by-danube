"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#offer", label: "The Offer" },
  { href: "#community", label: "Community" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

const linkClass =
  "relative text-[10px] font-bold uppercase tracking-[0.25em] text-ink/70 transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-copper after:transition-all after:duration-300 hover:after:w-full";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          className="h-16 w-auto object-contain sm:h-20"
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
          className="text-[11px] font-bold uppercase tracking-[0.25em] text-copper border border-copper px-5 sm:px-6 py-3 transition-all duration-500 hover:bg-copper hover:text-white"
        >
          Get In Touch
        </a>
      </div>
    </nav>
  );
}
