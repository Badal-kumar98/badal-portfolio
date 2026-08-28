import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Silence benign teardown races in React StrictMode dev double-invoke
gsap.config({ nullTargetWarn: false });

// Don't re-measure every trigger when the mobile browser chrome shows/hides
ScrollTrigger.config({ ignoreMobileResize: true });

let lenis = null;

/**
 * Boot Lenis and wire it into GSAP's ticker so ScrollTrigger and Lenis share a
 * single rAF loop. Returns a teardown fn.
 */
export function initSmoothScroll() {
  if (lenis) return () => {};

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    syncTouch: false,
    touchMultiplier: 1.5,
  });

  lenis.on("scroll", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", () => lenis?.resize());
  if (typeof window !== "undefined" && import.meta.env.DEV) {
    window.__gravLenis = lenis;
  }

  const raf = (time) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function getLenis() {
  return lenis;
}

export function scrollTo(target) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  } else if (typeof target !== "number") {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

export { gsap, ScrollTrigger };
