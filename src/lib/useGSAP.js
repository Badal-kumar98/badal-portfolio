import { useEffect } from "react";
import { gsap, ScrollTrigger } from "./smoothScroll";

/**
 * GSAP-in-React hook: runs setup inside a gsap.context so animations & triggers
 * are cleanly managed and cleaned up on unmount.
 */
export function useGSAP(setup, deps = []) {
  useEffect(() => {
    let ctx;
    const id = requestAnimationFrame(() => {
      ctx = gsap.context(setup);
    });
    return () => {
      cancelAnimationFrame(id);
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
