/**
 * Single source of truth for identity, contact details and links.
 * Updated to Full Stack Developer (MERN) — Nov 2026.
 */
export const SITE = {
  name: "Badal Kumar",
  first: "BADAL",
  last: "Kumar",
  initials: "BK",
  role: "Full Stack Developer (MERN)",
  roleLong: "Full Stack Developer (MERN) — React, Node.js, TypeScript, Express, MongoDB",
  location: "Delhi NCR, India",
  locationLong: "Delhi · Noida · Gurugram",
  timeZone: "Asia/Kolkata",
  email: "badalkumar4574@gmail.com",
  phone: "9838995780",
  phoneHref: "+919838995780",
  url: "https://badal98-portfolio.netlify.app",
  github: "https://github.com/Badal-kumar98",
  linkedin: "https://www.linkedin.com/in/badal-kumar-200b45324/",
  availability: "Open to Full Stack / MERN / Frontend roles in Delhi NCR & Remote",
};

/**
 * Flip to true after dropping portrait.jpg in /public.
 */
export const HAS_PORTRAIT = true;

/** Résumé PDF — lives in /public so it is served as a static file. */
export const RESUME_URL = "/Badal-Kumar-Resume.pdf";

export const NAV_LINKS = [
  ["Work", "#work"],
  ["Stack", "#stack"],
  ["About", "#about"],
];

export const SOCIAL_LINKS = [
  ["GitHub", SITE.github],
  ["LinkedIn", SITE.linkedin],
];
