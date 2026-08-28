import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { usePointer, usePrefersReducedMotion, useCoarsePointer } from "../../lib/hooks";
import { useGSAP } from "../../lib/useGSAP";
import { gsap } from "../../lib/smoothScroll";
import { scrollTo } from "../../lib/smoothScroll";
import { SITE, RESUME_URL } from "../../lib/site";

const GravScene = lazy(() => import("./GravScene"));

// Honour Data Saver — skip heavy WebGL on metered connections
const saveData =
  typeof navigator !== "undefined" &&
  navigator.connection?.saveData === true;

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const coarse = useCoarsePointer();
  const { target } = usePointer();
  const root = useRef(null);
  const [heroOnScreen, setHeroOnScreen] = useState(true);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroOnScreen(entry.isIntersecting),
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(() => {
    const el = root.current;
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(el.querySelectorAll("[data-hero-line] > span"), {
      yPercent: 120,
      duration: 1.3,
      ease: "expo.out",
      stagger: 0.09,
    })
      .from(
        el.querySelectorAll("[data-hero-fade]"),
        { autoAlpha: 0, y: 24, duration: 1, ease: "expo.out", stagger: 0.12 },
        "-=0.8",
      )
      .from(
        "[data-hero-canvas]",
        { autoAlpha: 0, scale: 1.08, duration: 1.6, ease: "expo.out" },
        0,
      );

    gsap.to(el.querySelector("[data-hero-type]"), {
      yPercent: 16,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.5 },
    });
    gsap.to("[data-hero-canvas]", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.5 },
    });
  }, []);

  return (
    <section
      ref={root}
      // FIX #2: added sm:pt-28 breakpoint between mobile pt-24 and md:pt-32
      className="vignette relative flex min-h-[100svh] w-full flex-col overflow-hidden px-[var(--gutter)] pb-10 pt-24 sm:pt-28 md:pt-32"
    >
      {/* WebGL layer */}
      <div data-hero-canvas className="pointer-events-none absolute inset-0 -z-0">
        {!reduced && !saveData ? (
          <Suspense fallback={null}>
            <GravScene pointer={target} reduced={reduced} lite={coarse} active={heroOnScreen} />
          </Suspense>
        ) : (
          <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#c2d3f2,transparent_70%)] blur-2xl" />
        )}
      </div>

      {/* top meta row */}
      <div data-hero-fade className="relative z-10 flex items-start justify-between">
        <p className="label max-w-[18ch] leading-relaxed">
          React.js Developer
          <br />
          React / TypeScript / Redux
        </p>
        {/* FIX #3: show location from sm breakpoint, not only md */}
        <p className="label hidden text-right sm:block">
          {SITE.location}
          <br />
          <span className="text-[var(--color-acid)]">● Open to work</span>
        </p>
      </div>

      {/* headline */}
      <div
        data-hero-type
        className="relative z-10 flex flex-1 flex-col items-center justify-center text-center select-none"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 66% 62% at 50% 52%, color-mix(in oklab, var(--color-void) 78%, transparent) 0%, color-mix(in oklab, var(--color-void) 46%, transparent) 58%, transparent 82%)",
          }}
        />
        <h1 className="font-display text-mega leading-[0.82]">
          <span className="sr-only">
            Badal Kumar — React.js Frontend Developer based in Delhi NCR, India
          </span>
          <span data-hero-line className="line-mask" aria-hidden="true">
            <span className="inline-block will-change-transform">{SITE.first}</span>
          </span>
        </h1>
        <p
          data-hero-fade
          className="mt-2 font-serif text-h3 italic leading-none text-[var(--color-acid)]"
        >
          {SITE.last}
        </p>
        <p
          data-hero-fade
          className="mt-7 max-w-[44ch] text-lead font-light text-[var(--color-bone-dim)]"
        >
          I build interfaces that feel{" "}
          <span className="font-serif italic text-[var(--color-bone)]">weightless</span> — fast,
          pixel-perfect React work shipped to production for clients in India and abroad.
        </p>

        <div
          data-hero-fade
          className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          <button
            data-cursor="view"
            data-cursor-label="Scroll"
            onClick={() => scrollTo("#work")}
            className="group flex items-center gap-3 text-label uppercase tracking-[0.2em] text-[var(--color-bone-dim)] transition-colors hover:text-[var(--color-acid)]"
          >
            <span className="font-mono">[ View work ]</span>
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-1">
              ↓
            </span>
          </button>
          <button
            data-cursor="hover"
            onClick={() => scrollTo("#contact")}
            className="group flex items-center gap-3 text-label uppercase tracking-[0.2em] text-[var(--color-bone-dim)] transition-colors hover:text-[var(--color-acid)]"
          >
            <span className="font-mono">[ Contact ]</span>
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              →
            </span>
          </button>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            aria-label="Open Badal Kumar's résumé as a PDF in a new tab"
            className="group flex items-center gap-3 text-label uppercase tracking-[0.2em] text-[var(--color-bone-dim)] transition-colors hover:text-[var(--color-acid)]"
          >
            <span className="font-mono">[ Résumé ]</span>
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
