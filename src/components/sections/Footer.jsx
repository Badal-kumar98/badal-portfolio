import Magnetic from "../ui/Magnetic";
import { SplitReveal } from "../ui/Reveal";
import { SITE, NAV_LINKS, RESUME_URL } from "../../lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      // FIX #8: added overflow-x: hidden to contain the mega wordmark
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[var(--color-void)] px-[var(--gutter)] pb-24 pt-[16vh] sm:pb-8"
    >
      <div className="grid grid-cols-12 gap-y-12">
        <p className="label col-span-12 md:col-span-3">
          <span className="text-[var(--color-acid)]">[05]</span>
          <br />
          Contact
        </p>

        <div className="col-span-12 md:col-span-9">
          <SplitReveal
            as="h2"
            text="Let's build something that ships."
            className="text-h2 font-display leading-[0.95]"
          />

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${SITE.email}`}
                data-cursor="hover"
                className="group inline-flex items-center gap-4 rounded-full bg-[var(--color-acid)] px-6 py-4 font-display text-base font-bold break-all text-[var(--color-void)] transition-[gap] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:gap-6 sm:px-8 sm:py-5 sm:text-lg"
              >
                {SITE.email}
                <span className="shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                  ↗
                </span>
              </a>
            </Magnetic>
            <p className="max-w-[28ch] text-body text-[var(--color-bone-dim)]">
              <span className="text-[var(--color-acid)]">●</span> {SITE.availability}.
            </p>
          </div>
        </div>
      </div>

      {/* Link columns - FIX #9: sm:grid-cols-2 for better layout at 640-767px */}
      <div className="mt-24 grid grid-cols-2 gap-6 border-t edge pt-10 sm:gap-8 md:grid-cols-4">
        <div>
          <p className="label mb-4">Contact</p>
          <p className="text-body text-[var(--color-bone-dim)]">
            {SITE.locationLong}
            <br />
            <a
              href={`tel:${SITE.phoneHref}`}
              data-cursor="hover"
              className="transition-colors hover:text-[var(--color-acid)]"
            >
              {SITE.phone}
            </a>
          </p>
        </div>
        <div>
          <p className="label mb-4">Elsewhere</p>
          <ul className="space-y-1 text-body text-[var(--color-bone-dim)]">
            {[
              ["GitHub", SITE.github],
              ["LinkedIn", SITE.linkedin],
              ["Résumé (PDF)", RESUME_URL],
              ["Email", `mailto:${SITE.email}`],
            ].map(([l, h]) => (
              <li key={l}>
                <a
                  href={h}
                  target={h.startsWith("mailto:") ? undefined : "_blank"}
                  rel={h.startsWith("mailto:") ? undefined : "noreferrer"}
                  data-cursor="hover"
                  className="transition-colors hover:text-[var(--color-acid)]"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4">Index</p>
          <ul className="space-y-1 text-body text-[var(--color-bone-dim)]">
            {NAV_LINKS.map(([l, h]) => (
              <li key={h}>
                <a
                  href={h}
                  data-cursor="hover"
                  className="transition-colors hover:text-[var(--color-acid)]"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <p className="label mb-4">Now</p>
          <p className="text-body text-[var(--color-bone-dim)]">
            Shipping client frontends at Koncept Software Solutions &mdash; and open to what&rsquo;s
            next.
          </p>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="pointer-events-none mt-12 select-none overflow-hidden" aria-hidden="true">
        <h2 className="text-center font-display text-mega font-extrabold leading-[0.9] tracking-tight text-[var(--color-bone)]">
          BADAL<span className="text-[var(--color-acid)]">°</span>
        </h2>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 border-t edge pt-6 font-mono text-micro uppercase tracking-[0.16em] text-[var(--color-ash)] md:flex-row">
        <span>© {year} {SITE.name}</span>
        <span>{SITE.roleLong}</span>
        <span>{SITE.locationLong}</span>
      </div>
    </footer>
  );
}
