import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "../lib/smoothScroll";
import { scrollTo, getLenis } from "../lib/smoothScroll";
import { SITE, NAV_LINKS, SOCIAL_LINKS } from "../lib/site";

const LINKS = [
  ...NAV_LINKS,
  ["Contact", "#contact"],
];

/**
 * Mobile navigation overlay.
 * FIX #11: Assistant launcher properly hidden when menu is open via CSS targeting body[data-menu-open]
 * FIX #28: z-index and md:hidden handled correctly
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const overlay = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const el = overlay.current;
    if (!el) return;
    const lines = el.querySelectorAll("[data-mm-line]");
    const fades = el.querySelectorAll("[data-mm-fade]");

    gsap.set(el, { autoAlpha: 0 });
    const t = gsap
      .timeline({ paused: true })
      .set(el, { autoAlpha: 1 })
      .fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.inOut" },
      )
      .fromTo(
        lines,
        { yPercent: 115 },
        { yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.07 },
        "-=0.25",
      )
      .fromTo(
        fades,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 },
        "-=0.4",
      );
    tl.current = t;
    return () => {
      t.kill();
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      tl.current?.timeScale(1).play();
      // FIX #15: use only ONE scroll-lock mechanism — Lenis stop only
      lenis?.stop();
      document.body.dataset.menuOpen = "true";
    } else {
      tl.current?.timeScale(1.5).reverse();
      lenis?.start();
      delete document.body.dataset.menuOpen;
    }
  }, [open]);

  useEffect(
    () => () => {
      delete document.body.dataset.menuOpen;
    },
    [],
  );

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const go = (href) => {
    setOpen(false);
    window.setTimeout(() => scrollTo(href), 380);
  };

  return (
    <>
      {/* FIX #28: toggle only visible on mobile (md:hidden) with correct z-index */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-[9001] h-5 w-7 md:hidden"
      >
        <span
          className="absolute left-0 block h-[2px] w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
          style={{
            top: open ? "50%" : "20%",
            transform: open ? "translateY(-50%) rotate(45deg)" : "none",
          }}
        />
        <span
          className="absolute left-0 block h-[2px] w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
          style={{
            top: open ? "50%" : "80%",
            transform: open ? "translateY(-50%) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {createPortal(
        <div
          ref={overlay}
          className="fixed inset-0 z-[8000] flex flex-col justify-between overflow-hidden bg-[var(--color-void)] px-[var(--gutter)] pb-10 pt-28 md:hidden"
          style={{ visibility: "hidden" }}
        >
          <nav className="mt-4 flex flex-col">
            {LINKS.map(([label, href], i) => (
              <button
                key={href}
                onClick={() => go(href)}
                className="group flex items-baseline gap-4 border-b border-[var(--color-bone)]/10 py-3 text-left"
              >
                <span className="font-mono text-label text-[var(--color-acid)]">
                  0{i + 1}
                </span>
                <span className="line-mask block">
                  <span
                    data-mm-line
                    className="inline-block font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[clamp(1.75rem,8vw,3rem)] text-[var(--color-bone)] transition-colors duration-300 group-active:text-[var(--color-acid)]"
                    style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
                  >
                    {label}
                  </span>
                </span>
              </button>
            ))}
          </nav>

          <div className="space-y-6">
            <div data-mm-fade>
              <p className="label mb-2">Get in touch</p>
              <a
                href={`mailto:${SITE.email}`}
                className="font-display text-[clamp(1.25rem,6vw,1.9rem)] font-bold leading-tight [overflow-wrap:anywhere] text-[var(--color-acid)]"
              >
                {SITE.email.split("@")[0]}@<wbr />
                {SITE.email.split("@")[1]}
              </a>
            </div>
            <div
              data-mm-fade
              className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-label text-[var(--color-bone-dim)]"
            >
              <span>{SITE.location}</span>
              <span className="text-[var(--color-acid)]">● Open to work</span>
            </div>
            <div data-mm-fade className="flex gap-5 font-mono text-label text-[var(--color-bone-dim)]">
              {SOCIAL_LINKS.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="transition-colors hover:text-[var(--color-acid)]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
