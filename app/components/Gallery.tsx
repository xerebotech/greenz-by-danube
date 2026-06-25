"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { gtmEvent } from "../lib/gtm";

type Item = { cat: string; src: string; label: string };

/* Images are read straight from the folders in /public/images.
   To add more, drop files into the folder and list the filename here. */
const groups: { cat: string; folder: string; files: string[] }[] = [
  {
    cat: "Villas",
    folder: "Exterior–Villas",
    files: ["Exterior 1.webp", "Exterior 2.webp", "Exterior 3.webp", "Exterior 4.webp"],
  },
  {
    cat: "Living Room",
    folder: "Interior–Living-Room",
    files: ["Interior 1.webp", "Interior 2.webp", "Interior 3.webp", "Interior 4.webp"],
  },
  {
    cat: "Bedroom",
    folder: "Interior–Bedroom",
    files: ["Interior-1.webp", "Interior-2.webp", "Interior-3.webp", "Interior-4.webp"],
  },
  {
    cat: "Community",
    folder: "Community",
    files: ["community-1.webp", "community-2.webp", "community-3.webp", "community-4.webp"],
  },
];

const categories = ["All", ...groups.map((g) => g.cat)];

const items: Item[] = groups.flatMap((g) =>
  g.files.map((f) => ({
    cat: g.cat,
    src: encodeURI(`/images/${g.folder}/${f}`),
    label: g.cat,
  })),
);

export default function Gallery() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = active === "All" ? items : items.filter((i) => i.cat === active);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: number) =>
      setLightbox((cur) =>
        cur === null ? cur : (cur + dir + shown.length) % shown.length,
      ),
    [shown.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, step]);

  return (
    <div>
      {/* category tabs */}
      <div className="mt-10 flex flex-wrap gap-2.5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setActive(c);
              gtmEvent("gallery_filter", { gallery_category: c });
            }}
            className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
              active === c
                ? "bg-ink text-cream shadow-[0_8px_20px_-8px_rgba(35,49,45,0.5)]"
                : "border border-line bg-white text-ink-soft hover:border-copper hover:text-copper"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* bento mosaic */}
      <div className="mt-6 grid auto-rows-[170px] grid-cols-2 gap-3.5 [grid-auto-flow:dense] sm:auto-rows-[220px] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {shown.map((img, i) => {
          const span =
            i % 6 === 0
              ? "col-span-2 row-span-2"
              : i % 6 === 3
                ? "sm:col-span-2"
                : "";
          return (
            <button
              key={img.src}
              onClick={() => {
                setLightbox(i);
                gtmEvent("view_gallery_image", {
                  gallery_category: img.label,
                  image_position: i + 1,
                });
              }}
              className={`group relative overflow-hidden rounded-2xl border border-line shadow-[0_16px_40px_-30px_rgba(35,49,45,0.4)] transition-shadow duration-500 hover:shadow-[0_28px_55px_-30px_rgba(35,49,45,0.55)] ${span}`}
            >
              <Image
                src={img.src}
                alt={`Greenz by Danube — ${img.label}`}
                width={900}
                height={900}
                sizes="(max-width: 640px) 50vw, 25vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-[1.07]"
              />
              {/* hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {/* expand icon */}
              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream/15 text-cream backdrop-blur-sm opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
              {/* category label — only on hover */}
              <span className="absolute bottom-4 left-4 translate-y-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {img.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous"
            className="absolute left-3 sm:left-6 grid h-12 w-12 place-items-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next"
            className="absolute right-3 sm:right-6 grid h-12 w-12 place-items-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <figure
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={shown[lightbox].src}
              alt={`Greenz by Danube — ${shown[lightbox].label}`}
              width={1400}
              height={933}
              className="mx-auto max-h-[85vh] w-auto rounded-xl object-contain"
              priority
            />
            <figcaption className="mt-4 text-center text-[11px] uppercase tracking-[0.25em] text-cream/70">
              {shown[lightbox].label} · {lightbox + 1} / {shown.length}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
