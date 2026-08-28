import { useRef } from "react";
import { useGSAP } from "../../lib/useGSAP";
import { gsap } from "../../lib/smoothScroll";
import { usePrefersReducedMotion } from "../../lib/hooks";

const TEXT =
  "Most portfolios list technologies. I would rather point at what shipped — ten live client sites, a multi-tenant SaaS CRM with GST billing, and a consultation platform carrying live video, audio and chat for an international client. Figma handoff to production, every time.";

const DIM = "#7d8698";
const READ = "#10131a";

export default function Manifesto() {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    // Reduced motion (or no JS at all): words stay at their readable colour,
    // which is what they render with. The dim state only exists as the start
    // of the scroll reveal.
    if (reduced) return;
    const words = el.querySelectorAll("[data-w]");
    gsap.fromTo(
      words,
      { color: DIM },
      {
        color: READ,
        stagger: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 80%",
          scrub: 0.5,
        },
      },
    );
  }, [reduced]);

  return (
    <section
      ref={root}
      className="relative grid grid-cols-12 gap-y-10 px-[var(--gutter)] py-[16vh] md:py-[22vh]"
    >
      <div className="col-span-12 md:col-span-3">
        <p className="label sticky top-28">
          <span className="text-[var(--color-acid)]">[01]</span>
          <br />
          Manifesto
        </p>
      </div>

      <h2 className="col-span-12 text-h3 font-display font-semibold leading-[1.08] tracking-[-0.02em] md:col-span-9 md:col-start-4">
        {TEXT.split(" ").map((w, i) => (
          <span key={i} data-w className="inline-block" style={{ color: READ }}>
            {w}&nbsp;
          </span>
        ))}
      </h2>
    </section>
  );
}
