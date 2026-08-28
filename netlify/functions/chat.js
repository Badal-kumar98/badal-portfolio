// Netlify Function — same assistant as the Vercel edge function.
// The site is deployed on Netlify, which does NOT run /api/*.js as functions;
// netlify.toml rewrites /api/chat to this handler.

import { SYSTEM } from "../../shared/profile.js";
import { streamGroq } from "../../shared/groq.js";

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let messages;
  try {
    const body = await req.json();
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  return streamGroq({
    messages,
    system: SYSTEM,
    apiKey: process.env.GROQ_API_KEY,
  });
}

export const config = { path: "/api/chat" };
