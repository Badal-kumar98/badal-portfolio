import { useRef } from "react";
import { useGSAP } from "../../lib/useGSAP";
import { gsap } from "../../lib/smoothScroll";

export default function Marquee() {
  const section = useRef(null);
  const track = useRef(null);

  useGSAP(() => {
    const el = track.current;
    if (!el) return;

    let x = 0;
    let dir = -1;

    const tick = () => {
      const half = el.scrollWidth / 2 || 1000;
      x += 0.8 * dir;
      if (x <= -half) x = 0;
      if (x > 0) x = -half;
      gsap.set(el, { x });
    };

    gsap.ticker.add(tick);

    const st = gsap.to({}, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          dir = self.direction === 1 ? -1 : 1;
          const skew = gsap.utils.clamp(-12, 12, self.getVelocity() / -180);
          gsap.to(el, { skewX: skew, duration: 0.4, ease: "power3.out", overwrite: true });
        },
      },
    });

    return () => {
      gsap.ticker.remove(tick);
      st.scrollTrigger?.kill();
    };
  }, []);

  const WORDS = [
    "REACT",
    "REDUX TOOLKIT",
    "TYPESCRIPT",
    "REACT QUERY",
    "TAILWIND",
    "WEBSOCKETS",
    "NODE.JS",
    "MONGODB",
    "EXPRESS",
    "JWT",
  ];

  return (
    <section
      ref={section}
      className="relative overflow-hidden border-y edge bg-[var(--color-void)] py-10 md:py-14"
    >
      <div ref={track} className="flex w-max items-center will-change-transform">
        {[...Array(2)].map((_, dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {WORDS.map((w, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="px-8 font-display text-h2 font-bold uppercase leading-none text-[var(--color-bone)]">
                  {w}
                </span>
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rotate-45 bg-[var(--color-acid)]"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
