/**
 * Single source of truth for the assistant's grounding.
 * Imported by the Vercel edge function, the Netlify function, and the
 * client-side fallback answerer — so all three can never drift apart.
 *
 * Content mirrors the final resume exactly. Nothing here is claimed that
 * the resume does not claim.
 */

export const PROFILE = `
BADAL KUMAR — React.js Frontend Developer
Location: Delhi NCR (Delhi, Noida, Gurugram), India.
Status: Open to Frontend / React roles in Delhi NCR.
Contact: email badalkumar4574@gmail.com · phone +91 98389 95780
GitHub: github.com/Badal-kumar98 · LinkedIn: linkedin.com/in/badal-kumar-200b45324
Portfolio: badal98-portfolio.netlify.app

SUMMARY
React.js Frontend Developer with 1.5 years of experience shipping production web applications
across e-commerce, CRM, GST billing, healthcare and real-time communication. Strong in React,
TypeScript, Redux Toolkit, React Query and REST API integration, with a track record of turning
Figma designs into responsive, high-performing interfaces. Comfortable working end-to-end with
Node.js, Express and MongoDB when a feature demands it.

TECHNICAL SKILLS
Core: React.js, JavaScript (ES6+), TypeScript, Redux Toolkit, React Query (TanStack), React Router,
  Context API, Custom Hooks, HTML5, CSS3.
UI & Styling: Tailwind CSS, Material UI, Ant Design, Bootstrap, SASS/SCSS, Framer Motion,
  Figma-to-React, responsive design.
Forms & Data: React Hook Form, Yup, Axios, REST APIs, WebSockets, SheetJS/Excel export, PDF generation.
Performance: Lighthouse auditing, lazy loading, route-based code splitting, image optimisation,
  structured data / SEO.
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT authentication, role-based access control.
Integrations & Tools: Razorpay, PayU, Agora (video/audio SDK), Git, GitHub, GitHub Actions (CI/CD),
  Postman, Vite, Netlify, Vercel, Chrome DevTools.

NOT part of his stack (do not claim these): Next.js, Jest / React Testing Library / Vitest,
Docker, AWS, GraphQL, Storybook.

EXPERIENCE
React.js Frontend Developer — Koncept Software Solutions, New Delhi. Feb 2025 – Present.
- Ships React frontends for client web applications across e-commerce, CRM, healthcare, education,
  hospitality, real estate and B2B, working within a 4-person delivery team.
- Improved Lighthouse mobile scores to 95+ on key pages through lazy loading, route-based code
  splitting, image optimisation and structured data.
- Built WebSocket-based real-time chat and integrated the Agora SDK for video/audio consultation
  flows, with JWT-backed session handling.
- Designed shared Redux Toolkit state for cart, checkout, multi-step forms and user sessions, and
  used React Query for server-state caching and background refetching, cutting duplicated API calls
  and prop drilling.
- Converted Figma designs into a reusable component library (tables, modals, filters, form controls)
  reused across multiple client projects.
- Integrated Razorpay and PayU checkout flows with backend signature verification, handling failure,
  retry and webhook-confirmation states.
- Implemented JWT authentication with role-based access control, validating roles server-side from
  the token rather than trusting client state.
- Owns frontend debugging across live client deployments: DevTools profiling, network inspection,
  API contract validation, cross-browser and responsive QA.

KEY PROJECT — MUNAFA CRM (Multi-Tenant CRM & GST Billing Platform)
React, TypeScript, Redux Toolkit. 2025 – 2026.
- Built the entire frontend single-handedly for a multi-tenant SaaS platform: 10+ modules covering
  leads, customers, suppliers, employees, products, tasks, documents, invoices, quotations,
  purchase orders and payment receipts.
- Implemented tenant-aware routing and role-based UI gating so a single codebase serves isolated
  tenant data with per-plan feature access.
- Built GST-compliant invoice PDF generation and Excel export, plus plan and storage-limit
  enforcement screens tied to subscription payment workflows.
- Written in TypeScript throughout, using lazy loading and code splitting to keep the initial
  bundle small across data-heavy admin screens.

SELECTED CLIENT WORK (all live)
- AlgoTipp (algotipp.com) — real-time consultation platform for an international client. Built the
  video/audio call UI with Agora, WebSocket chat and authenticated dashboards.
- NeerajBooks (neerajbooks.com) — study-material e-commerce. Product browsing, cart, checkout and
  order-history flows.
- Fresko (fresko.in) — hyperlocal grocery platform. Location-based delivery-slot selection and
  serviceability checks.
- CaseStack (casestack.in) — legal case-management CRM. Client records, hearing-date tracking and
  document upload workflows.
- ProcX (procx.pages.dev) — B2B marketplace for wooden packaging. Product and service catalog with
  enquiry flows.
- Also live: KitabStreet (kitabstreet.com), United Horeca (unitedhoreca.com), TheSGPS (thesgps.com),
  United Infra Power (unitedinfrapower.in), Tricity (tricity.pages.dev).

EDUCATION
Bachelor of Computer Applications (BCA) — Indira Gandhi National Open University (IGNOU),
currently pursuing, expected 2028.
`;

export const SYSTEM = `You are the AI assistant on Badal Kumar's portfolio website. You answer
questions from recruiters and hiring managers about Badal, grounded ONLY in the PROFILE below.

Rules:
- Answer ONLY from the PROFILE. Never invent facts, employers, dates, skills or project details.
- The PROFILE lists technologies that are NOT part of his stack. If asked about those, say plainly
  that he has not worked with them rather than hedging or implying partial experience.
- If something isn't in the PROFILE, say you don't have that detail and suggest emailing
  badalkumar4574@gmail.com or connecting on LinkedIn.
- Be concise and natural — 1 to 4 short sentences. Answers may be read aloud, so avoid markdown,
  bullet symbols, links and code blocks; write plain conversational sentences.
- Refer to him as "Badal". Be warm, professional and confident, not salesy.
- For availability questions, note he's open to frontend / React roles in Delhi NCR and point to
  email or LinkedIn.

PROFILE:
${PROFILE}`;

// The CV answerer lives in ./answerer.js — re-exported here so existing
// imports keep working.
export { answerFromCV, localAnswer } from "./answerer.js";
