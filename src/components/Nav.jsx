import { useEffect, useState } from "react";
import Magnetic from "./ui/Magnetic";
import MobileMenu from "./MobileMenu";
import { scrollTo } from "../lib/smoothScroll";
import { SITE, NAV_LINKS } from "../lib/site";

/** Live local time in Badal's timezone. */
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: SITE.timeZone,
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time} IST</span>;
}

export default function Nav() {
  return (
    // FIX #10: mix-blend-difference scoped to only the logo — nav links use normal color
    // FIX #27: added aria-label="Site navigation" to header
    <header
      aria-label="Site navigation"
      className="fixed inset-x-0 top-0 z-[9000] flex items-center justify-between px-[var(--gutter)] py-5"
    >
      <Magnetic strength={0.5}>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(0);
          }}
          data-cursor="hover"
          aria-label={`${SITE.name} — back to top`}
          // Light theme: no mix-blend-difference — it would invert the logo to near-white
          className="font-display text-xl font-extrabold tracking-tight text-[var(--color-bone)]"
        >
          Badal<span className="text-[var(--color-acid)]">°</span>
        </a>
      </Magnetic>

      <nav
        aria-label="Sections"
        className="hidden items-center gap-8 font-mono text-label uppercase tracking-[0.16em] text-[var(--color-bone)] md:flex"
      >
        {NAV_LINKS.map(([label, href]) => (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(href);
            }}
            data-cursor="hover"
            className="group relative"
          >
            {label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-acid)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-6 font-mono text-label text-[var(--color-bone)]">
        <span className="hidden sm:inline">
          <Clock />
        </span>
        <Magnetic strength={0.5} className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            data-cursor="hover"
            className="rounded-full border border-[var(--color-bone)]/40 px-4 py-2 uppercase tracking-[0.16em] transition-colors hover:border-[var(--color-acid)]"
          >
            Hire me
          </a>
        </Magnetic>
        <MobileMenu />
      </div>
    </header>
  );
}
