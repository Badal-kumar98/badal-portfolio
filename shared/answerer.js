/**
 * CV answerer.
 *
 * Runs entirely in the browser. Every answer below is written from the PROFILE
 * above — nothing is generated, so it cannot invent facts. This is the path
 * used on static hosting (Netlify Drop) where there is no server to call.
 *
 * If the app is deployed somewhere with functions and GROQ_API_KEY is set,
 * Assistant.jsx prefers the hosted model and this becomes the fallback.
 */

const EMAIL = "badalkumar4574@gmail.com";
const LINKEDIN = "linkedin.com/in/badal-kumar-200b45324";

/** Rewrites so everyday phrasing lands on the same tokens the intents use. */
const SYNONYMS = {
  js: "javascript",
  ts: "typescript",
  rtk: "redux",
  "react-query": "reactquery",
  "react query": "reactquery",
  tanstack: "reactquery",
  nextjs: "next",
  "next js": "next",
  "next.js": "next",
  css: "styling",
  tailwind: "styling",
  scss: "styling",
  sass: "styling",
  bootstrap: "styling",
  ui: "styling",
  db: "database",
  mongo: "mongodb",
  api: "backend",
  cv: "resume",
  yrs: "years",
  yr: "years",
  exp: "experience",
  ctc: "salary",
  lpa: "salary",
  wfh: "remote",
  qualification: "education",
  degree: "education",
  college: "education",
};

const GREETING = /^(hi|hii+|hey+|hello|yo|namaste|hola|good (morning|afternoon|evening)|greetings)\b/i;
const THANKS = /\b(thanks|thank you|thx|shukriya|appreciate it|cheers)\b/i;
const BYE = /\b(bye|goodbye|see ya|see you|later|take care)\b/i;
const WHO_ARE_YOU = /\b(who are you|what are you|are you (a )?(bot|ai|human|real)|your name)\b/i;

/**
 * Topics. `k` = trigger terms (multi-word phrases score much higher than
 * single tokens, so specific questions beat generic ones).
 */
const TOPICS = [
  {
    id: "stack",
    k: ["frontend stack", "tech stack", "what stack", "his stack", "skills", "skill",
        "technologies", "technology", "what does he know", "what can he do", "expertise",
        "proficient", "familiar with", "stack", "tools", "javascript", "es6", "frontend"],
    a: `Badal works mainly in React with JavaScript and TypeScript. For state he uses Redux Toolkit and React Query, plus Context API and custom hooks where a full store would be overkill. On the styling side it's Tailwind CSS, Material UI, Ant Design, Bootstrap and SASS, with React Hook Form and Yup for forms. He also works with Node.js, Express and MongoDB when a feature needs the backend touched.`,
  },
  {
    id: "react",
    k: ["react", "reactjs", "react.js", "hooks", "components", "jsx"],
    a: `React is Badal's core skill — it's what all 1.5 years of his production work is built in. He's comfortable with hooks, custom hooks, Context API, React Router, and turning Figma designs into reusable component libraries that get shared across client projects.`,
  },
  {
    id: "state",
    k: ["redux", "redux toolkit", "state management", "reactquery", "react query",
        "context", "global state", "store", "caching", "server state"],
    a: `Badal uses Redux Toolkit for shared client state — cart, checkout, multi-step forms and user sessions. For server state he uses React Query, which handles caching and background refetching and cut a lot of duplicated API calls. Context API and custom hooks cover the lighter cases.`,
  },
  {
    id: "typescript",
    k: ["typescript", "types", "typed", "type safety"],
    a: `Yes — Badal works in TypeScript. Munafa CRM, the multi-tenant SaaS platform he built the frontend for, is written in TypeScript throughout.`,
  },
  {
    id: "styling",
    k: ["styling", "responsive", "figma", "design system", "component library", "mobile friendly", "pixel perfect"],
    a: `Badal works in Tailwind CSS, Material UI, Ant Design, Bootstrap and SASS. A big part of his day is converting Figma designs into responsive React pages — he's built a reusable component library of tables, modals, filters and form controls that gets reused across client projects.`,
  },
  {
    id: "next",
    k: ["next", "server side rendering", "ssr", "ssg", "app router", "remix", "astro", "gatsby"],
    a: `Badal hasn't worked with Next.js — all his production work is React with Vite. Happy to tell you about what he has shipped instead.`,
  },
  {
    id: "testing",
    k: ["test", "tests", "testing", "jest", "vitest", "cypress", "playwright",
        "testing library", "unit test", "e2e", "tdd", "coverage"],
    a: `Badal hasn't worked with Jest, React Testing Library or Vitest yet. His quality process today is Lighthouse auditing, DevTools profiling, API contract validation and cross-browser QA on live deployments.`,
  },
  {
    id: "devops",
    k: ["docker", "kubernetes", "aws", "azure", "gcp", "graphql", "storybook",
        "microservices", "terraform", "devops", "sql", "postgres", "mysql"],
    a: `That's outside what Badal has worked with so far. On the deployment side he uses Git, GitHub Actions for CI/CD, Netlify and Vercel. His database experience is MongoDB with Mongoose.`,
  },
  {
    id: "algotipp",
    k: ["algotipp", "algo tipp", "real time", "realtime", "video call", "audio call",
        "websocket", "agora", "live chat", "consultation"],
    a: `AlgoTipp is a real-time consultation platform for an international client, covering astrology, career and relationship advice. Badal built the WebSocket chat layer and integrated the Agora SDK for live video and audio calls, plus the authenticated dashboards, all with JWT-backed sessions. It's live at algotipp.com.`,
  },
  {
    id: "munafa",
    k: ["munafa", "crm", "gst", "billing", "saas", "multi tenant", "multi-tenant",
        "tenant", "invoice", "biggest project", "best project", "proudest"],
    a: `Munafa CRM is a multi-tenant SaaS CRM and GST billing platform, and Badal built the entire frontend single-handedly. It's 10+ modules — leads, customers, suppliers, employees, products, tasks, documents, invoices, quotations, purchase orders and payment receipts. He added tenant-aware routing and role-based UI gating so one codebase serves isolated tenant data, plus GST-compliant invoice PDFs and Excel export.`,
  },
  {
    id: "projects",
    k: ["projects", "project", "portfolio", "what has he built", "what he built",
        "client work", "live sites", "websites", "case studies", "examples of work", "shipped"],
    a: `Badal has ten live client sites. The headline ones: AlgoTipp, a real-time consultation platform; Munafa CRM, a multi-tenant SaaS GST billing platform; NeerajBooks and KitabStreet for e-commerce; Fresko for hyperlocal grocery; CaseStack, a legal case-management CRM; and ProcX, a B2B packaging marketplace. Also live are United Horeca, TheSGPS, United Infra Power and Tricity.`,
  },
  {
    id: "ecommerce",
    k: ["ecommerce", "e-commerce", "cart", "checkout", "neerajbooks", "kitabstreet",
        "fresko", "shop", "store", "order"],
    a: `Badal has shipped several e-commerce frontends — NeerajBooks and KitabStreet for books, and Fresko for hyperlocal grocery with location-based delivery-slot selection. Across those he's built product browsing, cart, checkout and order-history flows, with Redux Toolkit holding the cart and session state.`,
  },
  {
    id: "dashboards",
    k: ["dashboard", "dashboards", "admin panel", "data table", "tables", "filters",
        "modals", "casestack", "internal tool"],
    a: `Badal has built admin and CRM dashboards with data tables, search and filters, modals, file handling and role-based UI. CaseStack is a legal case-management CRM with client records, hearing-date tracking and document uploads. Munafa CRM is the largest of these at 10+ modules.`,
  },
  {
    id: "experience",
    k: ["how many years", "years of experience", "how long", "experience", "seniority",
        "junior", "senior", "fresher", "level", "current company", "where does he work",
        "koncept", "employer"],
    a: `Badal has 1.5 years of production experience. He's been at Koncept Software Solutions in New Delhi since February 2025 as a React.js Frontend Developer, working within a four-person delivery team.`,
  },
  {
    id: "availability",
    k: ["available for work", "open to work", "looking for a job", "is he available",
        "availability", "hire", "hiring", "notice period", "join", "recruit", "opportunity",
        "interview", "vacancy", "openings"],
    a: `Badal is open to frontend and React roles in Delhi NCR. The best way to take it forward is email at ${EMAIL} or LinkedIn at ${LINKEDIN}.`,
  },
  {
    id: "salary",
    k: ["salary", "compensation", "package", "expected ctc", "rate", "budget", "cost", "charges"],
    a: `I don't have salary details in Badal's CV — that's best discussed directly. You can reach him at ${EMAIL}.`,
  },
  {
    id: "contact",
    k: ["contact", "email", "phone", "number", "reach him", "get in touch",
        "linkedin", "github", "call him", "connect"],
    a: `You can reach Badal at ${EMAIL} or on +91 98389 95780. He's on LinkedIn at ${LINKEDIN} and GitHub at github.com/Badal-kumar98.`,
  },
  {
    id: "resume",
    k: ["resume", "download resume", "pdf", "send resume", "share resume"],
    a: `There's a résumé link in the hero section at the top of this page, in the About section, and in the footer — it opens the PDF in a new tab. You can also email Badal at ${EMAIL}.`,
  },
  {
    id: "education",
    k: ["education", "bca", "ignou", "university", "studied", "school", "academic", "graduation"],
    a: `Badal is pursuing a Bachelor of Computer Applications at IGNOU, expected in 2028, alongside working full time.`,
  },
  {
    id: "performance",
    k: ["performance", "lighthouse", "optimis", "optimiz", "speed", "fast", "bundle size",
        "load time", "seo", "core web vitals", "lazy loading", "code splitting"],
    a: `Badal improved Lighthouse mobile scores to 95+ on key pages using lazy loading, route-based code splitting, image optimisation and structured data. On Munafa CRM he used code splitting to keep the initial bundle small across data-heavy admin screens.`,
  },
  {
    id: "payments",
    k: ["payment", "razorpay", "payu", "gateway", "stripe", "transaction", "subscription"],
    a: `Badal has integrated both Razorpay and PayU checkout flows, wired to backend signature verification and handling failure, retry and webhook-confirmation states. On Munafa CRM he also built plan and storage-limit screens tied to subscription payments.`,
  },
  {
    id: "backend",
    k: ["backend", "node", "express", "mongodb", "database", "server", "full stack",
        "fullstack", "rest", "endpoints"],
    a: `Badal works end-to-end with Node.js, Express and MongoDB with Mongoose when a feature needs it. He's implemented JWT authentication with role-based access control, validating roles server-side from the token rather than trusting client state. Frontend is where he goes deep; the backend is working knowledge he uses to close a feature without waiting on anyone.`,
  },
  {
    id: "auth",
    k: ["auth", "authentication", "jwt", "login", "security", "rbac", "permissions", "roles"],
    a: `Badal has implemented JWT authentication with role-based access control, validating roles server-side from the token rather than trusting client state. On Munafa CRM he layered tenant-aware routing and role-based UI gating on top of that.`,
  },
  {
    id: "location",
    k: ["location", "where is he", "where does he live", "based", "delhi", "ncr", "noida",
        "gurugram", "relocate", "remote", "onsite", "city"],
    a: `Badal is based in Delhi NCR and is looking at roles there — Delhi, Noida or Gurugram.`,
  },
  {
    id: "workstyle",
    k: ["team", "collaborate", "agile", "scrum", "process", "how does he work",
        "communication", "code review", "debugging", "workflow"],
    a: `Badal works in a four-person delivery team and handles client projects from Figma handoff through to deployment. He owns frontend debugging across live client deployments — DevTools profiling, network inspection, API contract validation, and cross-browser and responsive QA.`,
  },
  {
    id: "strengths",
    k: ["strength", "good at", "best at", "why hire", "why should we", "stand out",
        "unique", "special", "differentiator"],
    a: `Two things stand out. First, breadth of shipping — ten live client sites across e-commerce, CRM, healthcare, education, hospitality, real estate and B2B in 1.5 years. Second, ownership — he built the whole Munafa CRM frontend on his own, and handled the real-time video, audio and chat layer on AlgoTipp end to end.`,
  },
  {
    id: "domains",
    k: ["industries", "domains", "sectors", "verticals", "what kind of clients", "clients"],
    a: `Badal has shipped across e-commerce, CRM, healthcare, education, hospitality, real estate and B2B — seven industries in 1.5 years, including one international client.`,
  },
];

const STOP = new Set(["what","whats","the","his","him","he","is","are","a","an","of","to","for",
  "in","on","does","do","did","has","have","and","or","me","you","tell","about","with","can",
  "any","how","much","many","was","were","would","could","please","i","we","us","my","your",
  "it","this","that","there","their","them","be","been","am","so","if","then","just","also",
  "some","more","most","know","knows","think","like","want","need","give","get","got","hi","hey"]);

const ESCAPE = /[.*+?^${}()|[\]\\]/g;

function normalise(raw) {
  let q = String(raw || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents: "résumé" -> "resume"
    .trim();

  // Longest first: otherwise js->javascript fires inside "next.js" (the dot is a
  // word boundary) and mangles it to "next.javascript" before next.js is seen.
  const ordered = Object.entries(SYNONYMS).sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of ordered) {
    // Word boundaries matter: a plain substring swap turns "projects" into
    // "projectypescript" via ts->typescript, which then matches the wrong topic.
    const body = from.replace(ESCAPE, "\\$&");
    const pattern = /[\s.\-]/.test(from) ? body : `\\b${body}\\b`;
    q = q.replace(new RegExp(pattern, "g"), to);
  }
  return q;
}

function score(q, topic) {
  const words = q.replace(/[^a-z0-9\s.+#-]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w));
  let total = 0;
  for (const key of topic.k) {
    // Multi-word phrases are strong signals — weight them by word count.
    if (key.includes(" ")) {
      if (q.includes(key)) total += 5 * key.split(" ").length;
      continue;
    }
    // Single tokens must match a whole word, not a substring. Otherwise
    // "reactquery" would score for the plain "react" topic.
    for (const w of words) {
      if (w === key) total += 3;
      else if (w.length > 3 && key.length > 3 && (w.startsWith(key) || key.startsWith(w))) {
        total += 1;
      }
    }
  }
  return total;
}

const SUGGEST = `You can ask about his stack, the projects he's shipped, Munafa CRM, his experience, or whether he's available.`;

/**
 * @param {string} question
 * @param {string|null} lastTopicId  id returned by the previous call, for follow-ups
 * @returns {{text: string, topicId: string|null}}
 */
export function answerFromCV(question, lastTopicId = null) {
  const raw = String(question || "").trim();
  const q = normalise(raw);

  if (!q) return { text: `Ask me anything about Badal's work. ${SUGGEST}`, topicId: null };

  if (WHO_ARE_YOU.test(raw)) {
    return {
      text: `I'm the assistant on Badal's portfolio, and I answer from his CV. ${SUGGEST}`,
      topicId: null,
    };
  }
  if (GREETING.test(raw) && raw.split(/\s+/).length <= 4) {
    return {
      text: `Hi — I'm Badal's assistant, and I answer from his CV. ${SUGGEST}`,
      topicId: null,
    };
  }
  if (THANKS.test(q)) {
    return {
      text: `Happy to help. If you'd like to take it further, Badal's at ${EMAIL}.`,
      topicId: null,
    };
  }
  if (BYE.test(q) && q.split(/\s+/).length <= 4) {
    return { text: `Thanks for stopping by — Badal's at ${EMAIL} if you'd like to reach him.`, topicId: null };
  }

  // Short follow-ups ("more", "and?", "go on") re-use the previous topic.
  if (lastTopicId && /^(more|tell me more|go on|and\??|elaborate|details|expand|continue)\b/i.test(raw)) {
    const prev = TOPICS.find((t) => t.id === lastTopicId);
    if (prev) {
      return {
        text: `${prev.a}\n\nAnything specific about that you'd like to dig into?`,
        topicId: prev.id,
      };
    }
  }

  let best = null;
  let bestScore = 0;
  for (const topic of TOPICS) {
    const sc = score(q, topic);
    if (sc > bestScore) {
      bestScore = sc;
      best = topic;
    }
  }

  if (best && bestScore >= 3) return { text: best.a, topicId: best.id };

  return {
    text: `I don't have that in Badal's CV, so I'd rather not guess. ${SUGGEST} For anything else, email him at ${EMAIL} or connect on LinkedIn at ${LINKEDIN}.`,
    topicId: null,
  };
}

/** Back-compat wrapper. */
export function localAnswer(question) {
  return answerFromCV(question).text;
}
