import { createElement, Fragment, useRef } from "react";
import { useGSAP } from "../../lib/useGSAP";
import { gsap } from "../../lib/smoothScroll";

/** Block reveal — slides up + fades as it enters the viewport. */
export function Reveal({ children, as: Tag = "div", className, delay = 0, y = 40 }) {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    gsap.from(el, {
      yPercent: 0,
      y,
      autoAlpha: 0,
      duration: 1.1,
      delay,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  }, []);

  return createElement(Tag, { ref, className }, children);
}

/**
 * Word-by-word masked reveal for headlines.
 */
export function SplitReveal({
  text,
  className,
  stagger = 0.08,
  delay = 0,
  as: Tag = "h2",
  start = "top 85%",
}) {
  const ref = useRef(null);
  const words = text.split(" ");

  useGSAP(() => {
    const el = ref.current;
    const inners = el.querySelectorAll("[data-word-inner]");
    gsap.set(inners, { yPercent: 115 });
    gsap.to(inners, {
      yPercent: 0,
      duration: 1.2,
      delay,
      ease: "expo.out",
      stagger,
      scrollTrigger: { trigger: el, start },
    });
  }, []);

  return createElement(
    Tag,
    { ref, className },
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            className="line-mask align-bottom"
            style={{ display: "inline-block", paddingBottom: "0.14em", marginBottom: "-0.14em" }}
          >
            <span data-word-inner style={{ display: "inline-block", willChange: "transform" }}>
              {w}
            </span>
          </span>
          {/* The space must sit OUTSIDE the mask — .line-mask is overflow:hidden,
              so a trailing space inside it gets clipped and words run together. */}
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>,
  );
}
