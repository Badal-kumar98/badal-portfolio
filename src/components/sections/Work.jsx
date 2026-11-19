import { useRef } from "react";
import { useGSAP } from "../../lib/useGSAP";
import { gsap } from "../../lib/smoothScroll";
import { useMediaQuery } from "../../lib/hooks";

// Surface gradient recipe
const surface = (x, y, top, mid) =>
  `radial-gradient(120% 90% at ${x} ${y}, ${top} 0%, #eef1f7 58%), linear-gradient(135deg, ${mid}, #f6f7fa)`;

// Updated projects from latest resume
const PROJECTS = [
  {
    index: "01",
    title: "MUNAFA CRM",
    url: "https://koncept-invoice.pages.dev",
    category: "Multi-Tenant SaaS CRM & GST Billing",
    stack: "React · TypeScript · Node.js · Express · MongoDB · PayU",
    blurb:
      "Architected a complete multi-tenant SaaS business suite with 10+ modules: leads, client lifecycle, suppliers, employees, products, tasks, documents, invoices, quotations, purchase orders and payment receipts. Tenant-aware routing and role-based UI gating let one codebase serve isolated tenant data, with GST invoice PDFs and SheetJS Excel export.",
    meta: "India · SaaS platform",
    tint: "#173f9c",
    surface: surface("28%", "24%", "#c6d4f0", "#dae3f4"),
    icon: "invoice",
  },
  {
    index: "02",
    title: "SUGAR|BLISS",
    url: "https://sugarbliss.com.co",
    category: "Luxury Keepsakes & Gift Hampers E-Commerce",
    stack: "React · Redux Toolkit · Tailwind CSS · Vite",
    blurb:
      "Engineered bespoke luxury gifting platform featuring an interactive polaroid surprise box and custom keepsake hamper builder, persistent cart, and Pan-India delivery slot serviceability checks.",
    meta: "India · eCommerce",
    tint: "#e11d48",
    surface: surface("25%", "20%", "#fed7aa", "#fecdd3"),
    icon: "basket",
  },
  {
    index: "03",
    title: "DRIVORA",
    url: "https://drivora.co.in",
    category: "On-Demand & Monthly Driver Services",
    stack: "React · TypeScript · Tailwind CSS · Google Maps API",
    blurb:
      "Built customer booking portal for on-demand and monthly verified drivers with service tier selection (City/Outstation/Daily), real-time distance and fare estimation, and driver onboarding pipelines.",
    meta: "India · Mobility platform",
    tint: "#059669",
    surface: surface("78%", "14%", "#a7f3d0", "#d1fae5"),
    icon: "calls",
  },
  {
    index: "04",
    title: "LEGAL|PAPERS",
    url: "https://www.legalpapersindia.in",
    category: "Legal Tech & e-Stamp Portal",
    stack: "React · TypeScript · jsPDF · REST APIs",
    blurb:
      "Customer portal for automated legal document drafting, affidavits, and online e-stamp paper fulfillment with step-by-step document questionnaires and live preview generation.",
    meta: "India · LegalTech",
    tint: "#d97706",
    surface: surface("30%", "76%", "#fde68a", "#fef3c7"),
    icon: "gavel",
  },
  {
    index: "05",
    title: "SANSCRITI |ELECTRIC",
    url: "https://sanscritielectric.com",
    category: "Commercial EV Mobility & Dealership CRM",
    stack: "React · Node.js · Express · MongoDB · Tailwind",
    blurb:
      "Corporate portal and dealership operations CRM for electric commercial vehicles, highlighting specifications, TCO calculators, and dealer spare parts inventory tracking.",
    meta: "India · EV Mobility",
    tint: "#16a34a",
    surface: surface("82%", "34%", "#bbf7d0", "#dcfce7"),
    icon: "beam",
  },
  {
    index: "06",
    title: "ALGO|TIPP",
    url: "https://algotipp.com/",
    category: "Real-Time Consultation Platform",
    stack: "React · WebSockets · Agora SDK · JWT · PayU",
    blurb:
      "Real-time consultation platform for international client. Built the WebSocket chat layer and integrated the Agora SDK for live video and audio calls, with JWT-backed sessions and PayU wallet top-ups.",
    meta: "International client",
    tint: "#1e5bd6",
    surface: surface("22%", "18%", "#ccd9f2", "#dde5f5"),
    icon: "calls",
  },
  {
    index: "07",
    title: "NEERAJ|BOOKS",
    url: "https://www.neerajbooks.com/",
    category: "Pan-India Online Bookstore",
    stack: "React · Redux · PayU · REST APIs",
    blurb:
      "High-volume academic bookstore serving buyers across India, with 10,000+ publications catalog, cart, checkout and order management wired to REST APIs.",
    meta: "India · eCommerce",
    tint: "#3159b0",
    surface: surface("30%", "76%", "#d3dff3", "#e3eaf6"),
    icon: "book",
  },
  {
    index: "08",
    title: "PROCX",
    url: "https://procx.pages.dev/packaging-services/shop",
    category: "B2B Marketplace",
    stack: "React · REST APIs · Responsive UI",
    blurb:
      "Marketplace for wooden packaging materials connecting suppliers with buyers pan-India, built around bulk enquiry and catalog workflows.",
    meta: "India · B2B",
    tint: "#1f57bd",
    surface: surface("70%", "72%", "#ccd8ee", "#dde4f2"),
    icon: "crate",
  },
  {
    index: "09",
    title: "CASE|STACK",
    url: "https://casestack.in/",
    category: "Case Management CRM",
    stack: "React · Redux · Dashboard UI",
    blurb:
      "CRM for lawyers that tracks hearing dates, client records and case data in one dashboard, replacing scattered manual tracking.",
    meta: "India · Legal CRM",
    tint: "#2f5cb4",
    surface: surface("20%", "30%", "#d6e0f4", "#e5ebf7"),
    icon: "gavel",
  },
  {
    index: "10",
    title: "FRESKO",
    url: "https://fresko.in/",
    category: "Hyperlocal Quick Commerce",
    stack: "React · Redux · REST APIs",
    blurb:
      "Quick-commerce app for fresh vegetables built around a sub-10km delivery radius, with catalog browsing, cart and order flow.",
    meta: "India · Quick commerce",
    tint: "#2158b8",
    surface: surface("78%", "14%", "#cfe0f0", "#e0e9f4"),
    icon: "basket",
  },
];

export default function Work() {
  const section = useRef(null);
  const track = useRef(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useGSAP(() => {
    if (isMobile) return;
    const trackEl = track.current;
    if (!trackEl || !section.current) return;

    const getScroll = () => trackEl.scrollWidth - window.innerWidth;

    const tween = gsap.to(trackEl, {
      x: () => -getScroll(),
      ease: "none",
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: () => `+=${getScroll()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    const bar = section.current.querySelector("[data-work-bar]");
    if (bar) {
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${getScroll()}`,
          scrub: true,
        },
      });
    }

    return () => {
      tween.kill();
    };
  }, [isMobile]);

  useGSAP(() => {
    if (!isMobile) return;
    const cards = section.current?.querySelectorAll("[data-work-card]");
    cards?.forEach((card) => {
      gsap.from(card, {
        y: 48,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });
  }, [isMobile]);

  return (
    <section id="work" ref={section} className="relative overflow-hidden bg-[var(--color-ink)]">
      <div className="pointer-events-none z-20 flex items-start justify-between px-[var(--gutter)] pt-28 pb-6 md:absolute md:inset-x-0 md:top-0 md:pb-0 md:pt-28">
        <p className="label">
          <span className="text-[var(--color-acid)]">[02]</span>
          <br />
          Selected work
        </p>
        {!isMobile && (
          <p className="label hidden text-right md:block">
            Scroll to pan
            <br />
            {PROJECTS.length} projects
          </p>
        )}
      </div>

      <div
        ref={track}
        className={
          isMobile
            ? "flex flex-col gap-12 px-[var(--gutter)] pb-24 pt-2"
            : "flex h-[100svh] items-center gap-[6vw] px-[var(--gutter)] will-change-transform"
        }
        style={isMobile ? undefined : { width: "max-content" }}
      >
        {/* Intro plate */}
        <div
          className={`flex shrink-0 flex-col justify-end ${isMobile ? "w-full" : "h-[70vh] w-[60vw]"}`}
        >
          <h2 className="text-h2 font-display leading-[0.9]">
            Things I&rsquo;ve
            <br />
            <span className="font-serif font-normal italic text-[var(--color-acid)]">shipped</span>.
          </h2>
          <p className="mt-6 max-w-[36ch] text-body text-[var(--color-bone-dim)]">
            Production client work across eCommerce, real estate, hospitality, legal and engineering
            — plus a multi-tenant SaaS CRM and a real-time platform for an international client.
          </p>
        </div>

        {PROJECTS.map((p) => (
          <Card key={p.index} project={p} stacked={isMobile} />
        ))}

        {/* End plate */}
        <div
          className={`flex shrink-0 flex-col justify-center ${isMobile ? "w-full py-6" : "h-[70vh] w-[42vw]"}`}
        >
          <p className="label mb-4">All nine shipped to production, from Figma handoff to launch</p>
          <a
            href="#contact"
            data-cursor="view"
            data-cursor-label="Say hi"
            className="text-h3 font-display leading-none transition-colors hover:text-[var(--color-acid)]"
          >
            Let&rsquo;s
            <br />
            talk →
          </a>
        </div>
      </div>

      {!isMobile && (
        <div className="absolute inset-x-[var(--gutter)] bottom-8 z-20 hidden h-px bg-[var(--color-bone)]/15 md:block">
          <div data-work-bar className="h-full w-full origin-left scale-x-0 bg-[var(--color-acid)]" />
        </div>
      )}
    </section>
  );
}

function Card({ project, stacked }) {
  const live = Boolean(project.url);
  // Live projects are real links; the one without a public URL stays an article
  // so it never looks clickable when it isn't.
  const Tag = live ? "a" : "article";
  const linkProps = live
    ? {
        href: project.url,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": `${project.title.replace("|", "")} — open the live site in a new tab`,
      }
    : {};

  return (
    <Tag
      {...linkProps}
      data-work-card
      data-cursor={live ? "view" : "hover"}
      data-cursor-label={live ? "Visit" : undefined}
      className={`group relative block shrink-0 overflow-hidden rounded-[2px] ${
        live ? "cursor-pointer" : ""
      } ${
        stacked ? "h-auto min-h-[360px] sm:h-[56vh] sm:min-h-[420px] w-full" : "h-[70vh] w-[clamp(320px,44vw,600px)]"
      }`}
      style={{ background: project.surface }}
    >
      <span
        className="absolute left-0 top-0 z-10 h-1 w-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
        style={{ background: project.tint }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
        <div className="flex items-start justify-between gap-4 font-mono text-label uppercase tracking-[0.16em] text-[var(--color-bone-dim)]">
          <span style={{ color: project.tint }}>{project.index}</span>
          <span className="text-right">{project.meta}</span>
        </div>

        <div data-card-meta>
          <ProjectIcon
            kind={project.icon}
            className="mb-4 h-8 w-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
            style={{ color: project.tint }}
          />
          <p className="label mb-3">{project.category}</p>
          <h3 className="font-display text-[clamp(1.4rem,2.6vw,2.75rem)] leading-[0.95] [overflow-wrap:break-word] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
            <ProjectTitle title={project.title} />
          </h3>
          <p
            className="mt-4 max-w-[42ch] text-body leading-snug text-[var(--color-bone-dim)]"
          >
            {project.blurb}
          </p>
          <p
            className="mt-4 font-mono text-micro uppercase tracking-[0.16em]"
            style={{ color: project.tint }}
          >
            {project.stack}
          </p>

          {live && (
            <span
              className="mt-5 inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.16em]"
              style={{ color: project.tint }}
            >
              Visit site
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </span>
          )}
        </div>
      </div>

      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(80% 60% at 50% 100%, ${project.tint}14, transparent 70%)`,
        }}
      />
    </Tag>
  );
}

function ProjectTitle({ title }) {
  const parts = title.split("|");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <wbr />}
        </span>
      ))}
    </>
  );
}

function ProjectIcon({ kind, className, style }) {
  const shared = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  return (
    <svg className={className} style={style} aria-hidden="true" {...shared}>
      {kind === "calls" && (
        <>
          <rect x="2.5" y="7" width="12" height="10" rx="2.5" />
          <path d="M14.5 11.2l5-2.6v6.8l-5-2.6z" />
          <path d="M6 20.5c1.6 1 4.2 1 5.8 0" opacity="0.5" />
        </>
      )}
      {kind === "basket" && (
        <>
          <path d="M3 8.5h18l-1.7 9a2.4 2.4 0 0 1-2.4 2H7.1a2.4 2.4 0 0 1-2.4-2z" />
          <path d="M8.5 8.5 11 3M15.5 8.5 13 3" />
        </>
      )}
      {kind === "book" && (
        <>
          <path d="M4 4.5h9.5a2.5 2.5 0 0 1 2.5 2.5v13H6.5A2.5 2.5 0 0 1 4 17.5z" />
          <path d="M16 7h4v13h-4" opacity="0.55" />
        </>
      )}
      {kind === "crate" && (
        <>
          <rect x="3" y="6" width="18" height="12" rx="1.5" />
          <path d="M3 10h18M3 14h18M9 6v12M15 6v12" opacity="0.55" />
        </>
      )}
      {kind === "invoice" && (
        <>
          <path d="M5.5 3.5h13v17l-2.2-1.5-2.2 1.5-2.1-1.5-2.2 1.5-2.3-1.5z" />
          <path d="M9 8h6M9 11.5h6M9 15h3.5" opacity="0.6" />
        </>
      )}
      {kind === "gavel" && (
        <>
          <path d="M3 20.5h9" />
          <path d="M7.5 20.5 13 15" />
          <rect x="11.6" y="7.4" width="7.8" height="4.4" rx="1" transform="rotate(45 15.5 9.6)" />
        </>
      )}
      {kind === "beam" && (
        <>
          <path d="M4 4.5h16M4 19.5h16M12 4.5v15" />
          <path d="M7.5 9.5h9M7.5 14.5h9" opacity="0.5" />
        </>
      )}
      {kind === "shelf" && (
        <>
          <path d="M4 5.5h3.2v13H4zM8.6 5.5h3.2v13H8.6z" />
          <path d="m14.2 6.6 3.1-.8 3.2 12.1-3.1.8z" opacity="0.7" />
        </>
      )}
      {kind === "estate" && (
        <>
          <path d="M3.5 10.5 12 4l8.5 6.5" />
          <path d="M5.8 12.2v8h12.4v-8" />
          <path d="M10 20.2v-4.6h4v4.6" opacity="0.6" />
        </>
      )}
    </svg>
  );
}
