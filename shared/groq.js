/**
 * Shared Groq streaming helper used by both the Vercel edge function and the
 * Netlify function. Kept separate from profile.js so the client bundle can
 * import the profile without pulling in server-only code.
 */

const MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "openai/gpt-oss-20b",
];

// Signals the client to silently switch to its built-in offline answerer
// instead of showing an error bubble.
const UNAVAILABLE = { status: 503, headers: { "x-assistant": "unavailable" } };

export async function streamGroq({ messages, system, apiKey }) {
  if (!apiKey) {
    return new Response("assistant_unavailable", UNAVAILABLE);
  }

  // Guards — abuse / cost control
  const clean = (Array.isArray(messages) ? messages : [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));

  if (clean.length === 0) return new Response("No message", { status: 400 });

  const payload = {
    messages: [{ role: "system", content: system }, ...clean],
    max_completion_tokens: 400,
    temperature: 0.4,
    top_p: 0.9,
    stream: true,
  };

  let upstream = null;
  let lastErr = "";
  for (const model of MODELS) {
    let r;
    try {
      r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ ...payload, model }),
      });
    } catch (e) {
      lastErr = `${model} -> network ${e}`;
      continue;
    }
    if (r.ok && r.body) {
      upstream = r;
      break;
    }
    lastErr = `${model} -> ${r.status} ${(await r.text().catch(() => "")).slice(0, 120)}`;
    console.error("[chat] model attempt failed:", lastErr);
  }

  if (!upstream || !upstream.body) {
    console.error("[chat] all models failed, last error:", lastErr);
    return new Response("assistant_unavailable", UNAVAILABLE);
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      let buffer = "";
      (async () => {
        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            let nl;
            while ((nl = buffer.indexOf("\n")) >= 0) {
              const line = buffer.slice(0, nl).trim();
              buffer = buffer.slice(nl + 1);
              if (!line.startsWith("data:")) continue;
              const data = line.slice(5).trim();
              if (!data || data === "[DONE]") continue;
              try {
                const json = JSON.parse(data);
                const text = json?.choices?.[0]?.delta?.content ?? "";
                if (text) controller.enqueue(encoder.encode(text));
              } catch {
                /* partial json — wait for more */
              }
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      })();
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-assistant": "live",
    },
  });
}
