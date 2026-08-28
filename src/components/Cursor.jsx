import { useEffect, useRef } from "react";
import { useCoarsePointer } from "../lib/hooks";

/**
 * Custom cursor: a small filled dot + a larger trailing ring.
 * FIX #26: removed dead `void hovering` expression
 * FIX #27: added aria-label to the wrapper
 */
export default function Cursor() {
  const coarse = useCoarsePointer();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (coarse) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    let pressed = false;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const render = () => {
      const base = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = base;
      ring.style.transform = pressed ? `${base} scale(0.82)` : base;
    };

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      render();
    };

    const setHover = (active, text = "", variant = "") => {
      ring.dataset.active = active ? "true" : "false";
      ring.dataset.variant = variant;
      label.textContent = text;
    };

    const onOver = (e) => {
      const el = e.target?.closest("[data-cursor]");
      if (el) {
        setHover(true, el.dataset.cursorLabel ?? "", el.dataset.cursor ?? "hover");
      }
    };
    const onOut = (e) => {
      const el = e.target?.closest("[data-cursor]");
      const next = e.relatedTarget?.closest?.("[data-cursor]");
      if (el && !next) setHover(false);
    };
    const onDown = () => {
      pressed = true;
      render();
    };
    const onUp = () => {
      pressed = false;
      render();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [coarse]);

  if (coarse) return null;

  return (
    // FIX #27: added aria-label for better accessibility
    <div aria-hidden="true" aria-label="Custom cursor" className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-[var(--color-acid)] mix-blend-difference"
      />
      <div
        ref={ringRef}
        data-active="false"
        className="cursor-ring fixed left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-bone)]/40"
      >
        <span ref={labelRef} className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-void)]" />
      </div>
    </div>
  );
}
