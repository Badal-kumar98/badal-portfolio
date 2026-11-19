import { useRef } from "react";
import { useGSAP } from "../../lib/useGSAP";
import { gsap } from "../../lib/smoothScroll";
import { useMediaQuery } from "../../lib/hooks";

// Surface gradient recipe
const surface = (x, y, top, mid) =>
  `radial-gradient(120% 90% at ${x} ${y}, ${top} 0%, #eef1f7 58%), linear-gradient(135deg, ${mid}, #f6f7fa)`;

// Complete projects with dedicated Enterprise CRMs & Client Platforms
const PROJECTS = [
  // --- ENTERPRISE CRMs (PROTECTED B2B SYSTEMS) ---
  {
    index: "01",
    title: "MUNAFA CRM",
    url: "https://koncept-invoice.pages.dev",
    category: "Enterprise SaaS CRM & GST Billing",
    stack: "React · TypeScript · Node.js · Express · MongoDB · PayU",
    blurb:
      "Architected a complete multi-tenant SaaS business suite with 10+ modules: leads, client lifecycle, suppliers, employees, products, tasks, documents, invoices, quotations, purchase orders and payment receipts. Tenant-aware routing and role-based UI gating let one codebase serve isolated tenant data, with GST invoice PDFs and SheetJS Excel export.",
    meta: "Protected B2B CRM",
    tint: "#173f9c",
    surface: surface("28%", "24%", "#c6d4f0", "#dae3f4"),
    icon: "invoice",
    isCRM: true,
  },
  {
    index: "02",
    title: "SANSCRITI |CRM",
    url: "https://sanscriti.pages.dev/login",
    category: "EV Dealership Operations & Inventory CRM",
    stack: "React · Node.js · Express · MongoDB · Tailwind",
    blurb:
      "Enterprise field operations CRM for electric commercial vehicles. Built field-technician job card flows, warranty verification by serial number, spare parts inventory reconciliation, and multi-tier dealer hierarchy tracking with role-based access control.",
    meta: "Protected B2B CRM",
    tint: "#16a34a",
    surface: surface("82%", "34%", "#bbf7d0", "#dcfce7"),
    icon: "beam",
    isCRM: true,
  },
  {
    index: "03",
    title: "CRYSTALION |CRM",
    url: "https://crystalionengineers.pages.dev/login",
    category: "Industrial Quotation & AMC Renewal CRM",
    stack: "React · TypeScript · Node.js · MongoDB",
    blurb:
      "B2B industrial engineering quotation engine automating complex BOM calculations, GST margin breakdowns, RFP tracking, and Annual Maintenance Contract (AMC) service renewal alerts.",
    meta: "Protected B2B CRM",
    tint: "#b45309",
    surface: surface("30%", "76%", "#fde68a", "#fef3c7"),
    icon: "estate",
    isCRM: true,
  },
  {
    index: "04",
    title: "NEERAVI |CRM",
    url: "https://neeravi-crm.pages.dev/",
    category: "Lead Ingestion & Pipeline Operations CRM",
    stack: "React · Node.js · Express · MongoDB · Redux",
    blurb:
      "Centralized client management system featuring automated inquiry ingestion, stage-wise deal progression pipeline, task delegation matrix, and Proforma Invoice (PI) generation.",
    meta: "Protected B2B CRM",
    tint: "#7c3aed",
    surface: surface("25%", "25%", "#ddd6fe", "#ede9fe"),
    icon: "calls",
    isCRM: true,
  },
  {
    index: "05",
    title: "CASE|STACK",
    url: "https://casestack.in/",
    category: "Legal Case Diary & Hearing CRM",
    stack: "React · TypeScript · Node.js · Express · MongoDB",
    blurb:
      "Comprehensive case management CRM for advocates and law firms tracking client records, court hearing stages, cause list notifications, and secure case document vault.",
    meta: "Protected Legal CRM",
    tint: "#be185d",
    surface: surface("28%", "72%", "#fbcfe8", "#fce7f3"),
    icon: "gavel",
    isCRM: true,
  },

  // --- COMMERCIAL CLIENT PLATFORMS & E-COMMERCE ---
  {
    index: "06",
    title: "SUGAR|BLISS",
    url: "https://sugarbliss.com.co",
    category: "Luxury Keepsakes & Gift Hampers E-Commerce",
    stack: "React · Redux Toolkit · Tailwind CSS · Vite",
    blurb:
      "Engineered bespoke luxury gifting platform featuring an interactive polaroid surprise box and custom keepsake hamper builder, persistent cart, and Pan-India delivery slot serviceability checks.",
    meta: "Live E-Commerce",
    tint: "#e11d48",
    surface: surface("25%", "20%", "#fed7aa", "#fecdd3"),
    icon: "basket",
  },
  {
    index: "07",
    title: "DRIVORA",
    url: "https://drivora.co.in",
    category: "On-Demand & Monthly Driver Services",
    stack: "React · TypeScript · Tailwind CSS · Google Maps API",
    blurb:
      "Built customer booking portal for on-demand and monthly verified drivers with service tier selection (City/Outstation/Daily), real-time distance and fare estimation, and driver onboarding pipelines.",
    meta: "Live Mobility Portal",
    tint: "#059669",
    surface: surface("78%", "14%", "#a7f3d0", "#d1fae5"),
    icon: "calls",
  },
  {
    index: "08",
    title: "LEGAL|PAPERS",
    url: "https://www.legalpapersindia.in",
    category: "Legal Tech & e-Stamp Portal",
    stack: "React · TypeScript · jsPDF · REST APIs",
    blurb:
      "Customer portal for automated legal document drafting, affidavits, and online e-stamp paper fulfillment with step-by-step document questionnaires and live preview generation.",
    meta: "Live LegalTech",
    tint: "#d97706",
    surface: surface("30%", "76%", "#fde68a", "#fef3c7"),
    icon: "gavel",
  },
  {
    index: "09",
    title: "SANSCRITI |ELECTRIC",
    url: "https://sanscritielectric.com",
    category: "Commercial EV Mobility Portal",
    stack: "React · Node.js · Express · MongoDB · Tailwind",
    blurb:
      "Corporate web platform for commercial electric vehicles, showcasing EV lineup specifications, battery telemetry stats, total cost of ownership (TCO) calculator, and dealership inquiry workflows.",
    meta: "Live EV Corporate",
    tint: "#16a34a",
    surface: surface("82%", "34%", "#bbf7d0", "#dcfce7"),
    icon: "beam",
  },
  {
    index: "10",
    title: "ALGO|TIPP",
    url: "https://algotipp.com/",
    category: "Real-Time Consultation Platform",
    stack: "React · WebSockets · Agora SDK · JWT · PayU",
    blurb:
      "Real-time consultation platform for international client. Built the WebSocket chat layer and integrated the Agora SDK for live video and audio calls, with JWT-backed sessions and PayU wallet top-ups.",
    meta: "Live Video/Audio Platform",
    tint: "#1e5bd6",
    surface: surface("22%", "18%", "#ccd9f2", "#dde5f5"),
    icon: "calls",
  },
  {
    index: "11",
    title: "NEERAJ|BOOKS",
    url: "https://www.neerajbooks.com/",
    category: "Pan-India Academic Bookstore",
    stack: "React · Redux · PayU · REST APIs",
    blurb:
      "High-volume academic bookstore serving buyers across India, with 10,000+ publications catalog, cart, checkout and in-browser PDF reader engine.",
    meta: "Live Bookstore",
    tint: "#3159b0",
    surface: surface("30%", "76%", "#d3dff3", "#e3eaf6"),
    icon: "book",
  },
  {
    index: "12",
    title: "KITAB|STREET",
    url: "https://kitabstreet.com/",
    category: "Digital E-Book Marketplace",
    stack: "React · Redux Toolkit · Razorpay · Tailwind",
    blurb:
      "Multi-publisher digital bookstore with nested category routing, instant ebook search, Razorpay checkout, digital library reader, and seller listing management.",
    meta: "Live E-Book Marketplace",
    tint: "#dc2626",
    surface: surface("20%", "20%", "#fecaca", "#fee2e2"),
    icon: "book",
  },
  {
    index: "13",
    title: "TRICITY |ENGINEERS",
    url: "https://www.tricityengineers.in/",
    category: "Sustainable Engineering & EPC Portal",
    stack: "React · TypeScript · Tailwind CSS · Vite",
    blurb:
      "Modern corporate portal for sustainable engineering solutions. Features project milestone timelines, client testimonials, and customized RFP assessment submission flows.",
    meta: "Live Industrial EPC",
    tint: "#65a30d",
    surface: surface("70%", "30%", "#d9f99d", "#ecfccb"),
    icon: "estate",
  },
  {
    index: "14",
    title: "UNITED |HORECA",
    url: "https://unitedhoreca.com/",
    category: "Commercial Kitchen Engineering",
    stack: "React · TypeScript · Tailwind CSS · Vite",
    blurb:
      "World-class commercial kitchen engineering solutions portal for hotels and restaurants with equipment catalog and instant RFQ quotation generation.",
    meta: "Live Hospitality Tech",
    tint: "#ea580c",
    surface: surface("35%", "35%", "#fed7aa", "#ffedd5"),
    icon: "crate",
  },
  {
    index: "15",
    title: "UNITED |INFRA POWER",
    url: "https://unitedinfrapower.in/",
    category: "Industrial Power & Infrastructure EPC",
    stack: "React · TypeScript · Tailwind CSS · Vite",
    blurb:
      "Industrial engineering web presence showcasing complex nationwide infrastructure and power EPC execution, project portfolios, and compliance benchmarks.",
    meta: "Live Power & Infra",
    tint: "#0891b2",
    surface: surface("80%", "20%", "#cffafe", "#e0f2fe"),
    icon: "beam",
  },
  {
    index: "16",
    title: "PROCX",
    url: "https://procx.pages.dev/packaging-services/shop",
    category: "B2B Wooden Packaging Marketplace",
    stack: "React · REST APIs · Responsive UI",
    blurb:
      "Marketplace for wooden packaging materials connecting suppliers with buyers pan-India, built around bulk enquiry and catalog workflows.",
    meta: "Live B2B Marketplace",
    tint: "#7c3aed",
    surface: surface("26%", "82%", "#ddd6fe", "#ede9fe"),
    icon: "crate",
  },
  {
    index: "17",
    title: "FRESKO",
    url: "https://fresko.in/",
    category: "Hyperlocal Grocery Delivery",
    stack: "React · Node.js · Tailwind CSS",
    blurb:
      "Fast, localized grocery delivery web app featuring pin-code serviceability checks, category carousels and delivery time-slot selection.",
    meta: "Live Quick-Commerce",
    tint: "#059669",
    surface: surface("74%", "18%", "#a7f3d0", "#d1fae5"),
    icon: "basket",
  },
];

export default function Work() {
  const root = useRef(null);
  const track = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useGSAP(
    () => {
      if (!isDesktop) return;
      const el = root.current;
      const tr = track.current;
      if (!el || !tr) return;

      const getScrollAmount = () => -(tr.scrollWidth - window.innerWidth + 96);

      const tween = gsap.to(tr, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${tr.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [isDesktop], revertOnUpdate: true }
  );

  return (
    <section
      ref={root}
      id="work"
      className="relative bg-[var(--color-void)] py-[12vh] lg:py-0"
    >
      {/* section header */}
      <div className="px-[var(--gutter)] pb-8 lg:absolute lg:left-0 lg:top-12 lg:z-20 lg:w-full lg:pb-0">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="label mb-3">
              <span className="text-[var(--color-acid)]">[02]</span>
              <br />
              Production Work & Enterprise CRMs
            </p>
            <h2 className="text-h2 font-display leading-[0.92]">
              Work that ships
              <span className="text-[var(--color-acid)]">.</span>
            </h2>
          </div>
          <p className="label max-w-[34ch] text-[var(--color-bone-dim)] md:text-right">
            17 production systems · Enterprise CRMs & commercial platforms
            <br />
            <span className="font-mono text-micro text-[var(--color-acid)]">
              [ Protected B2B & Public Deployments ]
            </span>
          </p>
        </div>
      </div>

      {/* Recruiter / Interviewer Note for CRMs */}
      <div className="px-[var(--gutter)] pt-4 pb-8 lg:hidden">
        <div className="rounded-xl border border-[var(--color-bone)]/20 bg-[var(--color-coal)] p-5 text-sm text-[var(--color-bone-dim)]">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-acid)] mb-1 font-bold">
            Notice for Technical Interviewers
          </p>
          <p className="leading-relaxed">
            Enterprise CRMs (Munafa, Sanscriti, Crystalion, Neeravi, CaseStack) are internal operations platforms protected by Role-Based Access Control (RBAC). Architecture schemas and live walkthroughs are demonstrated during technical interviews.
          </p>
        </div>
      </div>

      {/* track container */}
      <div className="lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden">
        <div
          ref={track}
          className="grid grid-cols-1 gap-6 px-[var(--gutter)] sm:grid-cols-2 lg:flex lg:flex-nowrap lg:gap-8 lg:px-[var(--gutter)] lg:pt-20"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const live = Boolean(project.url);
  const Tag = live ? "a" : "div";

  return (
    <Tag
      href={project.url}
      target={live ? "_blank" : undefined}
      rel={live ? "noreferrer" : undefined}
      data-cursor={live ? "view" : undefined}
      className="group relative flex h-[520px] w-full flex-col justify-between overflow-hidden rounded-[3px] border edge text-[var(--color-bone)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--color-acid)] sm:h-[560px] lg:h-[68vh] lg:w-[480px] lg:shrink-0"
      style={{ background: project.surface }}
    >
      <span
        className="absolute left-0 top-0 z-10 h-1 w-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
        style={{ background: project.tint }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
        <div className="flex items-start justify-between gap-4 font-mono text-label uppercase tracking-[0.16em] text-[var(--color-bone-dim)]">
          <span style={{ color: project.tint }}>{project.index}</span>
          <span className="text-right">
            {project.isCRM ? (
              <span className="rounded bg-black/60 px-2 py-0.5 text-[9px] text-[#38bdf8] font-bold">
                Protected CRM
              </span>
            ) : (
              project.meta
            )}
          </span>
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
              {project.isCRM ? "Portal Login" : "Visit site"}
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
