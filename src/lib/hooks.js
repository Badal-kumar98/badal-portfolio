import { useEffect, useState, useRef } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Generic media-query hook (SSR-safe, live-updating). */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const on = () => setMatches(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

/**
 * Coarse pointer — true ONLY on purely touch devices with no mouse/trackpad.
 * On hybrid laptops with both touch and mouse, fine pointer takes precedence
 * so the custom cursor & magnetic animations work smoothly.
 */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const check = () => {
      const hasCoarse = window.matchMedia("(pointer: coarse)").matches;
      const hasFine = window.matchMedia("(pointer: fine)").matches;
      setCoarse(hasCoarse && !hasFine);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return coarse;
}

/**
 * Smoothed, normalized pointer position in [-1, 1].
 * Lerped each frame so downstream consumers (WebGL, parallax) get buttery values.
 */
export function usePointer() {
  const target = useRef({ x: 0, y: 0 });
  const value = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return { target, value };
}
