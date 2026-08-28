import { useState } from "react";
import { SplitReveal } from "../ui/Reveal";

// Updated from resume technical skills
const CAPS = [
  {
    n: "01",
    title: "Core",
    tags: "React.js · JavaScript (ES6+) · TypeScript · Redux Toolkit · React Query (TanStack) · React Router · Context API · Custom Hooks · HTML5 · CSS3",
  },
  {
    n: "02",
    title: "UI & Styling",
    tags: "Tailwind CSS · Material UI · Ant Design · Bootstrap · SASS/SCSS · Framer Motion · Figma-to-React · Responsive Design",
  },
  {
    n: "03",
    title: "Forms & Data",
    tags: "React Hook Form · Yup · Axios · REST APIs · WebSockets · SheetJS / Excel export · PDF generation",
  },
  {
    n: "04",
    title: "Performance",
    tags: "Lighthouse auditing · Lazy loading · Route-based code splitting · Image optimisation · Structured data / SEO",
  },
  {
    n: "05",
    title: "Backend",
    tags: "Node.js · Express.js · MongoDB · Mongoose · JWT Auth · Role-Based Access Control",
  },
  {
    n: "06",
    title: "Integrations & Tools",
    tags: "Razorpay · PayU · Agora (video/audio SDK) · Git · GitHub · GitHub Actions (CI/CD) · Postman · Vite · Netlify · Vercel · Chrome DevTools",
  },
];

export default function Capabilities() {
  const [open, setOpen] = useState({});

  return (
    <section id="stack" className="relative px-[var(--gutter)] py-[14vh] md:py-[18vh]">
      <div className="grid grid-cols-12 gap-y-8">
        <p className="label col-span-12 md:col-span-3">
          <span className="text-[var(--color-acid)]">[03]</span>
          <br />
          Stack
        </p>
        <div className="col-span-12 md:col-span-8 md:col-start-4">
          <SplitReveal
            as="h2"
            text="The stack I reach for, front to back"
            className="text-h2 font-display leading-[0.95]"
          />
          <p className="mt-8 max-w-[46ch] text-lead font-light text-[var(--color-bone-dim)] md:ml-auto md:text-right">
            Frontend is where I go deep; the rest is working knowledge I use to close the loop on a
            feature end to end without waiting on anyone. All of it aimed at interfaces that feel{" "}
            <span className="font-serif italic text-[var(--color-bone)]">effortless</span>.
          </p>
        </div>
      </div>

      <ul className="mt-16 border-t edge md:mt-24">
        {CAPS.map((c) => {
          const expanded = !!open[c.n];
          return (
            <li key={c.n} className="group border-b edge">
              <button
                data-cursor="hover"
                aria-expanded={expanded}
                onClick={() => setOpen((o) => ({ ...o, [c.n]: !o[c.n] }))}
                className="relative flex w-full flex-col overflow-hidden py-7 text-left md:flex-row md:items-center md:justify-between md:gap-6 md:py-9"
              >
                {/* Accent sweep on hover */}
                <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-[var(--color-acid)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

                <span className="relative z-10 flex items-center justify-between gap-5 md:justify-start md:gap-10">
                  <span className="flex items-baseline gap-5 md:gap-10">
                    <span className="font-mono text-label text-[var(--color-ash)] transition-colors duration-500 group-hover:text-[var(--color-void)]">
                      {c.n}
                    </span>
                    <span className="text-h3 font-display leading-none text-[var(--color-bone)] transition-colors duration-500 group-hover:text-[var(--color-void)]">
                      {c.title}
                    </span>
                  </span>
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={`shrink-0 text-[var(--color-bone-dim)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[var(--color-void)] md:hidden ${expanded ? "rotate-45" : ""}`}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>

                {/* Desktop: reveal on hover */}
                <span className="relative z-10 hidden font-mono text-label uppercase tracking-[0.16em] text-[var(--color-bone-dim)] transition-colors duration-500 group-hover:text-[var(--color-void)] md:inline">
                  {c.tags}
                </span>

                {/* Mobile: tap to expand */}
                <span
                  className="relative z-10 grid font-mono text-label uppercase tracking-[0.16em] text-[var(--color-bone-dim)] transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden"
                  style={{ gridTemplateRows: expanded ? "1fr" : "0fr", opacity: expanded ? 1 : 0 }}
                >
                  <span className="overflow-hidden">
                    <span className="block pt-4">{c.tags}</span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
