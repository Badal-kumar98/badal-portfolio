// Vercel Edge Function — CV-grounded assistant powered by Groq (OpenAI-compatible API).
// Grounding lives in ../shared/profile.js so the Vercel function, the Netlify
// function and the client-side fallback can never drift apart.

import { SYSTEM } from "../shared/profile.js";
import { streamGroq } from "../shared/groq.js";

export const config = { runtime: "edge" };

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
