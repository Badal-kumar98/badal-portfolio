import { useEffect, useRef, useState } from "react";
import { initSmoothScroll, ScrollTrigger, scrollTo } from "./lib/smoothScroll";
import Cursor from "./components/Cursor";
import Grain from "./components/Grain";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/hero/Hero";
import Manifesto from "./components/sections/Manifesto";
import Work from "./components/sections/Work";
import Capabilities from "./components/sections/Capabilities";
import About from "./components/sections/About";
import Marquee from "./components/sections/Marquee";
import Footer from "./components/sections/Footer";
// FIX #25: Assistant is now imported and rendered
import Assistant from "./components/Assistant";

export default function App() {
  const [ready, setReady] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const teardown = initSmoothScroll();
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  useEffect(() => {
    if (ready) {
      const id = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(id);
    }
  }, [ready]);

  return (
    <>
      <a
        href="#top"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          scrollTo(0);
          mainRef.current?.focus();
        }}
      >
        Skip to content
      </a>
      <Grain />
      <Cursor />
      <Preloader onDone={() => setReady(true)} />
      <Nav />
      <main id="top" ref={mainRef} tabIndex={-1}>
        <Hero />
        <Manifesto />
        <Work />
        <Capabilities />
        <About />
        <Marquee />
        <Footer />
      </main>
      {/* FIX #25: Assistant chatbot rendered — CV-grounded, Chatzy removed */}
      <Assistant />
    </>
  );
}
