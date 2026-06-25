import Image from "next/image";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import EnquiryForm from "./components/EnquiryForm";
import Faq from "./components/Faq";
import Gallery from "./components/Gallery";
import Reveal from "./components/Reveal";
import ContactLink from "./components/ContactLink";


const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const stats = [
  {
    value: "3.5M",
    label: "Starting price (AED), 3-bedroom",
    icon: (
      <svg {...iconProps}>
        <path d="M3 7h18v10H3z" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 10v4M18 10v4" />
      </svg>
    ),
  },
  {
    value: "1%",
    label: "Monthly payment plan",
    icon: (
      <svg {...iconProps}>
        <path d="M19 5 5 19" />
        <circle cx="7.5" cy="7.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "Amenities across five hubs",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l2.2 5.6L20 9l-4.5 3.8L17 19l-5-3-5 3 1.5-6.2L4 9l5.8-.4z" />
      </svg>
    ),
  },
  {
    value: "Q4 2029",
    label: "Scheduled handover",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
      </svg>
    ),
  },
];

const cardIcon = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const insideHome = [
  {
    tag: "Furnished",
    title: "Fully furnished",
    body: "Move in to a complete, fully furnished 3-bedroom townhouse. Nothing to buy, build, or wait for.",
    icon: (
      <svg {...cardIcon}>
        <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
        <path d="M3 13a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4H3z" />
        <path d="M5 17v2M19 17v2" />
      </svg>
    ),
  },
  {
    tag: "Space",
    title: "Spacious layouts",
    body: "The bedrooms and living areas are very spacious, with some of the best layouts in the community.",
    icon: (
      <svg {...cardIcon}>
        <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
      </svg>
    ),
  },
  {
    tag: "Design",
    title: "Top-class interiors",
    body: "The interior design is top class throughout, finished to a high standard and ready to enjoy.",
    icon: (
      <svg {...cardIcon}>
        <path d="M12 3 4 9l8 12 8-12z" />
        <path d="M4 9h16M12 3v18" />
      </svg>
    ),
  },
];

const community = [
  {
    tag: "Sports",
    title: "A sports hub",
    body: "A dedicated hub for sport and active living within the community.",
    icon: (
      <svg {...cardIcon}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    tag: "Family",
    title: "A family hub",
    body: "A family hub at the heart of the community, for every generation.",
    icon: (
      <svg {...cardIcon}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    tag: "Wellness",
    title: "A wellness hub",
    body: "A wellness hub anchored by a 20,000 sq ft gym.",
    icon: (
      <svg {...cardIcon}>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    ),
  },
];

const locIcon = {
  width: 17,
  height: 17,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const locations = [
  {
    place: "Dubai Silicon Oasis",
    note: "Adjacent",
    icon: (
      <svg {...locIcon}>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </svg>
    ),
  },
  {
    place: "Mirdif",
    note: "Minutes away",
    icon: (
      <svg {...locIcon}>
        <path d="M3 9.5 12 3l9 6.5" />
        <path d="M5 10v10h14V10" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
  },
  {
    place: "Downtown Dubai",
    note: "~20–25 min",
    icon: (
      <svg {...locIcon}>
        <path d="M3 21h18" />
        <path d="M5 21V8l5-3v16" />
        <path d="M19 21V12l-5-3" />
        <path d="M8 9v.01M8 13v.01M8 17v.01" />
      </svg>
    ),
  },
  {
    place: "Dubai International Airport",
    note: "~20–25 min",
    icon: (
      <svg {...locIcon}>
        <path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.9 1.7l5.1 3-2 2-2.5-.5a.5.5 0 0 0-.5.8l2 1.8 1.8 2a.5.5 0 0 0 .8-.5L9.3 14l2-2 3 5.1a1 1 0 0 0 1.7-.9z" />
      </svg>
    ),
  },
  {
    place: "Global Village & IMG Worlds",
    note: "Nearby",
    icon: (
      <svg {...locIcon}>
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
        <path d="M13 5v2M13 11v2M13 17v2" />
      </svg>
    ),
  },
  {
    place: "Road access",
    note: "E311 & E611",
    icon: (
      <svg {...locIcon}>
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="5" r="2" />
        <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H12" />
      </svg>
    ),
  },
];

const schools = [
  "Heriot-Watt",
  "Middlesex",
  "University of Dubai",
  "Zayed University",
  "DESC",
  "The Aquila School",
  "GEMS Wellington",
];

const confidence = [
  { value: "30+", label: "Projects launched" },
  { value: "18+", label: "Projects delivered" },
  { value: "15+", label: "Years Clifton in Dubai real estate" },
];

const heroBullets = [
  "Fully furnished, Italian interiors. Move in or rent out from day one",
  "Freehold ownership, with 10-year Golden Visa eligibility",
  "50+ amenities across five lifestyle hubs",
];

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top" className="flex-1">
        {/* ═══════════════ HERO ═══════════════ */}
        <section
          id="enquiry"
          className="relative isolate overflow-hidden bg-ink px-5 pt-28 pb-16 sm:flex sm:min-h-[92vh] sm:items-center sm:px-12 sm:pt-32 sm:pb-24"
        >
          {/* Image: a clean banner on mobile (villa fully visible, text sits on the
              dark base below it); full-bleed cinematic overlay on desktop. */}
          <div className="absolute inset-x-0 top-0 -z-10 h-[300px] overflow-hidden sm:h-full">
            <Image
              src={encodeURI("/images/Exterior–Villas/Exterior 1.webp")}
              alt="Greenz by Danube — fully furnished villas at twilight"
              width={1642}
              height={958}
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-[50%_42%]"
            />
            {/* fade image → solid dark base (downwards on mobile, sideways on desktop) */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/15 to-ink sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/60 sm:to-ink/25" />
            <div className="absolute inset-0 hidden sm:block bg-gradient-to-t from-ink/85 via-transparent to-ink/30" />
          </div>

          <div className="relative mx-auto mt-[210px] grid w-full max-w-[1400px] items-center gap-10 sm:mt-0 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow text-copper">
                  Near Dubai Silicon Oasis · Furnished townhouses &amp; villas
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-5 font-display font-semibold text-cream leading-[1.08] text-[32px] sm:text-[56px] tracking-[0.01em] drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
                  Own a Fully Furnished
                  <br className="hidden sm:block" /> Dubai Townhouse.
                  <span className="block mt-3 text-gradient-copper">
                    From AED 3.5M, paid 1% monthly.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-7 max-w-xl text-[17px] leading-[1.8] text-cream/85 font-light">
                  A green, low-density community minutes from Silicon Oasis and
                  Mirdif. Italian-finished interiors, 50+ amenities, freehold
                  ownership, and a 1% monthly plan until handover in 2029.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <ul className="mt-8 flex flex-col gap-2.5">
                  {heroBullets.map((item) => (
                    <li
                      key={item}
                      className="group flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-[14.5px] font-light text-cream backdrop-blur-md transition-all duration-500 [transition-timing-function:var(--ease-lux)] hover:border-copper/50 hover:bg-white/[0.12]"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-copper to-copper-dark text-white shadow-[0_4px_12px_rgba(174,149,115,0.5)] ring-2 ring-copper/20 transition-transform duration-500 group-hover:scale-110">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a href="#offer" className="btn-lux">
                    See Prices &amp; Floor Plans
                    <span className="btn-arrow">→</span>
                  </a>
                  <a
                    href="#gallery"
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-cream/40 px-9 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-cream transition-all duration-500 hover:border-cream hover:bg-cream hover:text-ink"
                  >
                    View the Residences
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <EnquiryForm />
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ SECTION 2 · THE OFFER ═══════════════ */}
        <section
          id="offer"
          className="bg-grain relative bg-paper px-6 sm:px-12 py-16 sm:py-24"
        >
          <div className="relative mx-auto max-w-[1400px]">
            <Reveal>
              <p className="eyebrow">The offer at a glance</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-3xl font-display font-semibold text-ink leading-[1.12] text-[32px] sm:text-[50px]">
                A turnkey home in one of Dubai&apos;s fastest-growing corridors.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-ink-soft font-light">
                Fully furnished townhouses and villas in a master community of
                around 700 homes, set across landscaped greens beside Dubai
                Silicon Oasis.
              </p>
            </Reveal>

            <div className="relative mt-14 overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_24px_60px_-34px_rgba(35,49,45,0.4)]">
              {/* top accent line across the whole band */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-copper/0 via-copper to-copper/0" />

              <div className="grid grid-cols-2 lg:grid-cols-4">
                {stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 90}>
                    <div className="group relative h-full bg-paper p-7 sm:p-8 transition-colors duration-500 hover:bg-cream/60">
                      <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-copper/10 text-copper ring-1 ring-copper/20 transition-all duration-500 group-hover:bg-copper group-hover:text-white group-hover:ring-copper">
                        {s.icon}
                      </span>
                      <p className="mt-5 font-display text-4xl sm:text-[2.9rem] leading-none font-semibold text-gradient-copper">
                        {s.value}
                      </p>
                      <div className="mt-4 h-px w-8 bg-copper/40 transition-all duration-500 group-hover:w-16" />
                      <p className="mt-4 text-[12px] uppercase tracking-[0.1em] leading-snug text-muted">
                        {s.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* fixed-position dividers (cannot collapse to sub-pixel) */}
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px bg-line lg:hidden" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px bg-line lg:hidden" />
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/4 z-10 hidden w-px bg-line lg:block" />
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px bg-line lg:block" />
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-3/4 z-10 hidden w-px bg-line lg:block" />
            </div>

            <Reveal delay={120}>
              <div className="mt-12 flex flex-wrap items-center gap-5">
                <a href="#enquiry" className="btn-lux">
                  Get the full price list
                </a>
                <span className="text-[13px] text-muted font-light">
                  Floor plans and available units shared on request.
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ SHOWCASE / GALLERY ═══════════════ */}
        <section id="gallery" className="relative bg-cream px-6 sm:px-12 py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <p className="eyebrow">A glimpse inside</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-3xl font-display font-semibold text-ink leading-[1.12] text-[32px] sm:text-[50px]">
                Designed to be lived in, finished to be loved.
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-ink-soft font-light">
                Fully furnished villas and townhouses with Italian Dolce Vita
                interiors, private sky gardens, and 50+ amenities set across
                landscaped greens. Browse the spaces by category.
              </p>
            </Reveal>

            {/* filterable gallery + lightbox */}
            <Gallery />

            <Reveal delay={120}>
              <p className="mt-6 text-[12px] text-muted font-light italic">
                Images are indicative of the lifestyle and finish. Final renders
                and floor plans shared on request.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ SECTION 3 · HOME & COMMUNITY ═══════════════ */}
        <section id="community" className="relative bg-cream px-6 sm:px-12 py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <p className="eyebrow">The home &amp; the community</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-3xl font-display font-semibold text-ink leading-[1.12] text-[32px] sm:text-[50px]">
                A finished home, in a community built for living.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-ink-soft font-light">
                A fully furnished 3-bedroom townhouse with the best layouts, set
                in a community of mind-blowing amenities across three lifestyle
                hubs.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p className="eyebrow mt-12 mb-6">Inside the home</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {insideHome.map((c, i) => (
                <Reveal key={c.title} delay={i * 110}>
                  <div className="card-lux group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-[0_16px_40px_-30px_rgba(35,49,45,0.35)]">
                    {/* copper bottom accent grows on hover */}
                    <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-copper to-gold transition-all duration-500 group-hover:w-full" />

                    <div className="flex items-center gap-4">
                      <span className="inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-copper/10 text-copper ring-1 ring-copper/15 transition-all duration-500 group-hover:bg-copper group-hover:text-white group-hover:ring-copper">
                        {c.icon}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-ink leading-tight">
                        {c.title}
                      </h3>
                    </div>

                    <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft font-light">
                      {c.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <p className="eyebrow mt-12 mb-6">The community</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {community.map((c, i) => (
                <Reveal key={c.title} delay={i * 110}>
                  <div className="card-lux group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-[0_16px_40px_-30px_rgba(35,49,45,0.35)]">
                    {/* copper bottom accent grows on hover */}
                    <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-copper to-gold transition-all duration-500 group-hover:w-full" />

                    <div className="flex items-center gap-4">
                      <span className="inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-copper/10 text-copper ring-1 ring-copper/15 transition-all duration-500 group-hover:bg-copper group-hover:text-white group-hover:ring-copper">
                        {c.icon}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-ink leading-tight">
                        {c.title}
                      </h3>
                    </div>

                    <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft font-light">
                      {c.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-14 text-center">
                <a href="#enquiry" className="btn-lux">
                  See the full details
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ SECTION 4 · LOCATION ═══════════════ */}
        <section
          id="location"
          className="bg-grain relative bg-paper px-6 sm:px-12 py-16 sm:py-24"
        >
          <div className="relative mx-auto max-w-[1400px]">
            <Reveal>
              <p className="eyebrow">The location</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-3xl font-display font-semibold text-ink leading-[1.12] text-[32px] sm:text-[50px]">
                Beside Silicon Oasis. Minutes from everywhere that matters.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-ink-soft font-light">
                Set in the Dubai Silicon Oasis corridor, with direct links to the
                city&apos;s main road network and an incoming metro line.
              </p>
            </Reveal>

            <div className="mt-14 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Connectivity list */}
              <Reveal>
                <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_40px_-30px_rgba(35,49,45,0.35)]">
                  <div className="flex items-center gap-2.5 border-b border-line px-6 py-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                    <p className="text-[10px] uppercase tracking-[0.28em] text-copper font-semibold">
                      Connectivity
                    </p>
                  </div>
                  {locations.map((l) => (
                    <div
                      key={l.place}
                      className="group flex items-center gap-4 border-b border-line px-5 py-4 last:border-0 transition-colors duration-300 hover:bg-cream/60"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-copper/10 text-copper ring-1 ring-copper/15 transition-all duration-500 group-hover:bg-copper group-hover:text-white group-hover:ring-copper">
                        {l.icon}
                      </span>
                      <span className="flex-1 text-[15px] font-medium text-ink">
                        {l.place}
                      </span>
                      <span className="shrink-0 whitespace-nowrap rounded-full border border-copper/25 bg-cream/70 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-copper-dark transition-colors duration-300 group-hover:border-copper group-hover:text-copper">
                        {l.note}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Education card */}
              <Reveal delay={140}>
                <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-white to-cream/60 p-8 sm:p-9 shadow-[0_16px_40px_-30px_rgba(35,49,45,0.35)]">
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-copper via-gold to-copper" />
                  <div className="pointer-events-none absolute -bottom-20 -right-16 h-44 w-44 rounded-full bg-copper/10 blur-3xl" />

                  <div className="relative flex items-center gap-4">
                    <span className="inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-copper/10 text-copper ring-1 ring-copper/15">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 10 12 5 2 10l10 5 10-5z" />
                        <path d="M6 12v5c0 1.2 2.7 3 6 3s6-1.8 6-3v-5" />
                        <path d="M22 10v6" />
                      </svg>
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-ink leading-tight">
                      Education on the doorstep
                    </h3>
                  </div>

                  <p className="relative mt-6 text-[15px] leading-relaxed text-ink-soft font-light">
                    The surrounding district pairs a major technology hub with
                    leading universities and schools, which is exactly what keeps
                    family demand and rental occupancy strong year after year.
                  </p>

                  <div className="relative mt-7">
                    <div className="rule-copper mb-6 opacity-60" />
                    <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-copper font-semibold">
                      Universities &amp; schools nearby
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {schools.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-copper/30 bg-paper px-4 py-2 text-[12px] tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-copper hover:text-copper"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION 5 · CONFIDENCE ═══════════════ */}
        <section className="relative overflow-hidden bg-sand px-6 sm:px-12 py-16 sm:py-24">
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-copper/10 blur-[150px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1400px] grid lg:grid-cols-[1.2fr_0.8fr] gap-14 lg:gap-16 items-center">
            <div>
              <Reveal>
                <p className="eyebrow">Why buy with confidence</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-6 font-display font-semibold text-ink leading-[1.12] text-[32px] sm:text-[50px]">
                  Delivered by a proven developer. Guided by Clifton Capital.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-ink-soft font-light">
                  The community is built by one of the UAE&apos;s top-five
                  developers, with a delivery record stretching back to 1993 and
                  dozens of completed communities across Dubai. Clifton Capital
                  advises you through selection, payment, and handover.
                </p>
              </Reveal>

              <div className="mt-12 grid grid-cols-3 gap-6">
                {confidence.map((c, i) => (
                  <Reveal key={c.label} delay={i * 110}>
                    <div className="border-l-2 border-copper/30 pl-5">
                      <p className="font-display text-4xl sm:text-5xl font-semibold text-gradient-copper leading-none">
                        {c.value}
                      </p>
                      <p className="mt-3 text-[12px] leading-snug text-ink-soft font-light">
                        {c.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={160}>
              <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-white to-cream/60 p-8 shadow-[0_28px_70px_-34px_rgba(35,49,45,0.5)]">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-copper via-gold to-copper" />
                <div className="pointer-events-none absolute -top-20 -right-16 h-44 w-44 rounded-full bg-copper/10 blur-3xl" />

                {/* header */}
                <div className="relative flex items-center gap-4">
                  <span className="inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-copper/10 text-copper ring-1 ring-copper/15">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
                      <path d="M18 19a3 3 0 0 1-3 3h-1.5" />
                      <rect x="3" y="13" width="4" height="6" rx="1.5" />
                      <rect x="17" y="13" width="4" height="6" rx="1.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="eyebrow eyebrow--plain text-[9.5px]">
                      Speak to an advisor
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-ink leading-tight">
                      Talk it through first
                    </h3>
                  </div>
                </div>

                {/* live availability */}
                <div className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-wa/10 px-3 py-1.5 text-[11px] font-medium text-wa">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-wa" />
                  </span>
                  Available now · typically replies in minutes
                </div>

                <p className="relative mt-5 text-sm leading-relaxed text-ink-soft font-light">
                  Prefer a conversation before sharing details? Call or message
                  us directly — no obligation.
                </p>

                <div className="rule-copper my-6 opacity-60" />

                <ContactLink
                  href="tel:+971559304697"
                  enquiry="call-enquiry"
                  className="group flex items-center justify-center gap-2.5 rounded-xl border border-line bg-cream/50 py-4 text-[13px] font-semibold tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-copper hover:text-copper"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call +971 55 930 4697
                </ContactLink>
                <ContactLink
                  href="https://wa.me/971559304697"
                  enquiry="whatsapp-enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-wa py-4 text-[13px] font-semibold tracking-wide text-white shadow-[0_12px_30px_-12px_rgba(47,158,68,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.518 5.26l-.999 3.648 3.97-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Chat on WhatsApp
                </ContactLink>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ SECTION 6 · FAQ ═══════════════ */}
        <section id="faq" className="bg-grain relative bg-cream px-6 sm:px-12 py-16 sm:py-24">
          <div className="relative mx-auto max-w-[1400px]">
            <Reveal>
              <div className="text-center mb-14">
                <p className="eyebrow eyebrow--plain justify-center">Good to know</p>
                <h2 className="mt-6 font-display font-semibold text-ink leading-[1.12] text-[32px] sm:text-[50px]">
                  Questions buyers ask first.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Faq />
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-16 text-center">
                <a href="#enquiry" className="btn-lux">
                  Request the price list
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
