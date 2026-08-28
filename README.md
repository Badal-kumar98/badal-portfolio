# Badal Kumar — Portfolio

Personal portfolio for **Badal Kumar**, React.js Frontend Developer based in Delhi NCR.
Light, cinematic, scroll-driven, built for 60fps.

**Sections:** Hero (WebGL) → Manifesto → Work (9 projects) → Stack → About (experience + education + stat counters) → Marquee → Contact.

## Stack

React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger) · Lenis · OGL (WebGL)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview
```

## Things you will want to change

Everything personal lives in **`src/lib/site.js`** — name, role, email, phone, location, GitHub,
LinkedIn, availability line. Change it there and it updates across the nav, mobile menu, hero,
about and footer.

The deployed domain is **not** in that file, because it is also baked into static files that never
run through the bundler. If the domain changes, update it in all four places:

| File | What to change |
| --- | --- |
| `src/lib/site.js` | `url` |
| `index.html` | `<link rel="canonical">`, all `og:*` and `twitter:*` URLs, the JSON-LD `url` / `image` |
| `public/sitemap.xml` | `<loc>` |
| `public/robots.txt` | `Sitemap:` line |

### Portrait

`public/portrait.webp` (with a `.jpg` fallback) at 880×1100, 4:5. `HAS_PORTRAIT` is `true`
in `src/lib/site.js`. To swap it, replace both files at the same 4:5 ratio — the figure is
`aspect-[4/5]` with `object-cover`, so an off-ratio image gets cropped top and bottom.

### Résumé

The PDF lives at `public/Badal-Kumar-Resume.pdf` and is linked from three places via
`RESUME_URL` in `src/lib/site.js`: the hero CTA row, a button under Education in About,
and the "Elsewhere" column in the footer. Replace the file and all three update.

Until then the About section shows the "BK" monogram. The monogram and the photo occupy the same
box, so nothing shifts when you add one.

### The AI assistant

`api/chat.ts` is a Vercel Edge Function that answers questions about Badal, grounded **only** in the
CV text embedded at the top of that file. It calls Groq's OpenAI-compatible API.

- Set `GROQ_API_KEY` in the Vercel project's environment variables.
- Without the key, the widget still renders and returns a polite "not configured yet, email me
  instead" message. Nothing breaks.
- To change what the assistant knows, edit the `PROFILE` string in `api/chat.ts`. It is the single
  source of truth; the model is instructed not to go beyond it.

If you would rather not ship the assistant at all: delete `src/components/Assistant.tsx` and
`api/chat.ts`, and remove the `<Assistant />` line from `src/App.tsx`.

## Notes for future edits

- **Colour tokens live in `src/index.css`** under `@theme`. `--color-acid` is the blue accent and is
  used *both* as accent text on dark backgrounds *and* as a fill with dark text on top (the footer
  mail button, the Stack hover sweep). If you change it, check contrast in both directions — the
  current value clears 7.2:1 either way.
- **Project titles in `src/components/sections/Work.tsx`** may contain a `|`, which renders as a
  `<wbr />`. That is a break *opportunity*, used so long compound names like `NEERAJ|BOOKS` break
  between words instead of mid-syllable when a card is narrow.
- **`stacked` in `Work.tsx`** is the single flag deciding horizontal-pinned vs vertical layout. It
  also controls whether project blurbs are hover-revealed or always visible. Do not swap it for a
  `md:` breakpoint class — 768px tablets match `md` but never fire hover, which hides the text.
- **Animations are reduced-motion aware.** `useGSAP` skips motion entirely and runs a static
  fallback; Lenis does not initialise; the WebGL hero is replaced by a CSS gradient.
- **The WebGL hero uses OGL, not Three.js**, and is lazy-loaded, paused via IntersectionObserver
  when off-screen, and skipped entirely on Data Saver connections.


---

## Assistant ("Ask my AI")

The panel answers from `shared/profile.js` — the CV text — via a topic matcher in
`shared/answerer.js`. **It needs no server and no API key**, which is what makes it
work on static hosting (Netlify Drop). Nothing is generated, so it cannot invent facts.

To change what it knows, edit `PROFILE` in `shared/profile.js` and the `TOPICS` array
in `shared/answerer.js`.

### Optional: hosted model

If you later deploy somewhere that runs serverless functions (Netlify **via Git**, or
Vercel), the panel will prefer a hosted model and fall back to the local answerer only
if it is unreachable.

- Netlify via Git: `netlify.toml` rewrites `/api/chat` to `netlify/functions/chat.js`.
- Vercel: `api/chat.js` runs as an edge function; `vercel.json` keeps `/api/*` out of
  the SPA rewrite.
- Either way, set `GROQ_API_KEY` in the host's environment variables.

**Netlify Drop (drag-and-drop) does not run functions at all** — it only serves static
files, so `/api/chat` will not exist and the local answerer handles everything. That is
the expected, supported setup.

## Theme

Light theme. All colour lives in the `@theme` block in `src/index.css`. Token names are
historical — `void`/`ink`/`coal` are surfaces (lightest → light grey) and `bone` is the
text ink. Changing those nine values reskins the whole site. Note that the WebGL hero
(`src/components/hero/GravScene.jsx`) carries its own colours and blend mode, so it needs
updating separately.
