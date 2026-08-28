import { useRef, useState } from "react";
import { useGSAP } from "../../lib/useGSAP";
import { gsap } from "../../lib/smoothScroll";
import { Reveal } from "../ui/Reveal";
import { SITE, HAS_PORTRAIT, RESUME_URL } from "../../lib/site";

const portraitJpg = "/portrait.jpg";
const portraitWebp = "/portrait.webp";

// Updated from resume
const STATS = [
  { value: 10, suffix: "", label: "Live client sites" },
  { value: 1.5, suffix: "", decimals: 1, label: "Years in production" },
  { value: 7, suffix: "", label: "Industries shipped for" },
  { value: 1, suffix: "", label: "International client" },
];

// Updated highlights from resume
const HIGHLIGHTS = [
  "Ship React frontends for client web applications across eCommerce, CRM, healthcare, education, hospitality, real estate and B2B, working within a 4-person delivery team.",
  "Improved Lighthouse mobile scores to 95+ on key pages through lazy loading, route-based code splitting, image optimisation and structured data.",
  "Built WebSocket-based real-time chat and integrated the Agora SDK for video and audio consultation flows, with JWT-backed session handling.",
  "Designed shared Redux Toolkit state for cart, checkout, multi-step forms and user sessions, and React Query for server-state caching and background refetching.",
  "Converted Figma designs into a reusable component library — tables, modals, filters and form controls — reused across multiple client projects.",
  "Integrated Razorpay and PayU checkout flows with backend signature verification, handling failure, retry and webhook-confirmation states.",
  "Implemented JWT authentication with role-based access control, validating roles server-side from the token rather than trusting client state.",
  "Own frontend debugging across live client deployments: DevTools profiling, network inspection, API contract validation and cross-browser QA.",
];

function Counter({ value, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const format = (n) => (decimals ? n.toFixed(decimals) : String(Math.round(n)));

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: value,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = format(obj.v);
      },
    });
  }, []);

  return (
    <span className="tabular-nums">
      <span ref={ref}>{format(0)}</span>
      {suffix}
    </span>
  );
}

export default function About() {
  const [imgOk, setImgOk] = useState(HAS_PORTRAIT);

  return (
    <section
      id="about"
      className="relative bg-[var(--color-coal)] px-[var(--gutter)] py-[14vh] md:py-[20vh]"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-14">
        {/* portrait — sticky, offset left, asymmetric */}
        <div className="col-span-12 md:col-span-5 relative">
          <div className="md:sticky md:top-28">
            <p className="label mb-8">
              <span className="text-[var(--color-acid)]">[04]</span>
              <br />
              About
            </p>

            <figure
              data-cursor="hover"
              className="group relative aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-[3px] bg-[radial-gradient(120%_90%_at_30%_20%,#d7e1f4,#eaeef6)]"
            >
              {/* monogram fallback (shows until /public/portrait.jpg exists) */}
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center font-display text-mega leading-none text-[var(--color-bone)]/[0.07]"
              >
                {SITE.initials}
              </span>

              {imgOk && (
                <picture>
                  <source srcSet={portraitWebp} type="image/webp" />
                  <img
                    src={portraitJpg}
                    alt={`${SITE.name}, React.js Frontend Developer based in Delhi NCR`}
                    width={880}
                    height={1100}
                    loading="lazy"
                    decoding="async"
                    onError={() => setImgOk(false)}
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </picture>
              )}

              {/* accent duotone wash + grain seat */}
              <span className="pointer-events-none absolute inset-0 bg-[var(--color-acid)] opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-20" />
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(243,244,247,0.92),transparent_55%)]" />

              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 font-mono text-micro uppercase tracking-[0.16em] text-[var(--color-bone)]">
                <span>{SITE.name}</span>
                <span className="text-[var(--color-acid)]">Delhi NCR</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* bio + experience, pushed right */}
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <h2 className="text-h2 font-display leading-[0.92]">
            Developer
            <br />
            <span className="font-serif font-normal italic text-[var(--color-acid)]">who ships</span>
            .
          </h2>

          <Reveal
            as="p"
            className="mt-8 max-w-[52ch] text-lead font-light leading-[1.45] text-[var(--color-bone-dim)]"
          >
            React.js Frontend Developer with 1.5 years of experience shipping production web
            applications across eCommerce, CRM, GST billing, healthcare and real-time
            communication — including a consultation platform carrying live video, audio and chat
            for an international client.
          </Reveal>

          <Reveal
            as="p"
            className="mt-6 max-w-[52ch] text-body leading-relaxed text-[var(--color-ash)]"
          >
            Strong in React, TypeScript, Redux Toolkit and React Query, with a track record of
            turning Figma designs into responsive, high-performing interfaces. Comfortable working
            end-to-end with Node.js, Express and MongoDB when a feature demands it.
          </Reveal>

          {/* experience — one role, told through what actually shipped */}
          <div className="mt-16 border-t edge pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="font-display text-[clamp(1.5rem,2.2vw,2.15rem)] leading-none text-[var(--color-bone)]">
                React.js Frontend Developer
              </h3>
              <span className="font-mono text-micro uppercase tracking-[0.16em] text-[var(--color-acid)]">
                Feb 2025 — Present
              </span>
            </div>
            <p className="mt-3 text-body text-[var(--color-bone-dim)]">
              Koncept Software Solutions · New Delhi
            </p>

            <ul className="mt-8 border-t edge">
              {HIGHLIGHTS.map((item, i) => (
                <li
                  key={item}
                  className="group grid grid-cols-12 gap-x-4 border-b edge py-5 transition-colors"
                >
                  <span className="col-span-2 font-mono text-micro tabular-nums text-[var(--color-ash)] transition-colors duration-500 group-hover:text-[var(--color-acid)] md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="col-span-10 max-w-[52ch] text-body leading-relaxed text-[var(--color-bone-dim)] md:col-span-11">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* education */}
          <div className="mt-16 border-t edge pt-8">
            <p className="label mb-6">Education</p>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="font-display text-[clamp(1.35rem,1.9vw,1.85rem)] leading-[1.05] text-[var(--color-bone)]">
                Bachelor of Computer Applications
              </h3>
              <span className="font-mono text-micro uppercase tracking-[0.16em] text-[var(--color-acid)]">
                Expected 2028
              </span>
            </div>
            <p className="mt-3 text-body text-[var(--color-bone-dim)]">
              Indira Gandhi National Open University (IGNOU) · Pursuing
            </p>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              aria-label="Open Badal Kumar's résumé as a PDF in a new tab"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-[var(--color-bone)]/25 px-6 py-3.5 font-mono text-label uppercase tracking-[0.16em] text-[var(--color-bone)] transition-colors duration-500 hover:border-[var(--color-acid)] hover:text-[var(--color-acid)]"
            >
              View full résumé
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* stat band — breaks the column rhythm */}
      <div className="mt-24 grid grid-cols-2 gap-px border edge bg-[var(--color-bone)]/[0.06] md:mt-32 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[var(--color-coal)] p-7 md:p-9">
            <p className="font-display text-h2 leading-none text-[var(--color-bone)]">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="label mt-4">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
