# ATELIER / LIVING AI-FIRST CREATIVE STUDIO PORTFOLIO

ATELIER is a static-first interactive 3D portfolio for a creative studio, AI production system, and narrative lab. It is built with React, Vite, Three.js, React Three Fiber, Drei, and Framer Motion, and deploys to GitHub Pages without a database, tracking, authentication, or frontend secrets.

## Information architecture

The six-room museum remains the presentation shell. New capabilities live in data-driven editorial layers, overlays, and the accessible fallback rather than additional 3D rooms.

| Room | Current programme |
| --- | --- |
| `00 / ARRIVAL` | **What We Build** capability index and **Now Shipping** editorial highlights. |
| `01 / IMAGE` | Selected Work and Commercial Content Systems — Static. |
| `02 / MOTION` | Films streaming from YouTube. |
| `03 / AI LAB` | How We Build and Generation Lab studies. |
| `04 / SHOWROOM` | Hospitality and Real Estate. |
| `05 / CONTACT` | Work With Us: campaign, ongoing content, or AI system. |

The content model is deliberately separate from the GLB, camera waypoints, touch navigation, reduced-motion handling, and fallback. Do not add more rooms for new content categories unless a spatial experience cannot be expressed through this system.

## Run locally

```bash
npm install
npm run dev
```

For a GitHub Pages-equivalent build:

```powershell
$env:VITE_REPOSITORY_NAME = 'ai-3d-museum-portfolio'
npm run build
```

`?debug=true` enables a small non-production waypoint panel.

## Content system

| Content | Data file | Future asset location |
| --- | --- | --- |
| Selected image work | `src/content/images.ts` | `public/portfolio/images/` |
| Selected motion work | `src/content/videos.ts` | `public/portfolio/thumbnails/`, `public/portfolio/videos/` |
| Commercial campaigns | `src/content/commercial.ts` | `public/portfolio/commercial/food/<campaign-id>/` |
| Generation Lab benchmark studies | `src/content/generationStudies.ts` | `public/portfolio/commercial/food/<campaign-id>/studies/` |
| Capability index and production pipeline | `src/content/capabilities.ts` | n/a |
| Latest / Now Shipping lens | `src/content/latest.ts` | derived; no duplicate metadata |
| Commercial showroom collections | `src/content/showroom.ts` | `public/portfolio/showroom/` |
| Studio identity and Work With Us routes | `src/content/site.ts` | n/a |

### Latest / Now Shipping

`src/content/latest.ts` derives its highlights from real content records. Do not write duplicate titles, descriptions, or media references for this layer.

Supported optional metadata on image, video, resource, commercial, and showroom records:

```ts
latest?: boolean
latestType?: 'film' | 'story' | 'experiment'
```

The current records surface the latest Hospitality film and the Girls' Night micro story. The demo campaigns deliberately do not flood the high-level editorial feed.

### Selected Work

`featured` remains the editorial selection flag for physical screens and curated work. In the showroom, only two `featured` records occupy the existing physical screens; every record remains accessible through its collection selector and fallback.

## Commercial Content Systems

`Commercial Content Systems` is a client-facing result layer in IMAGE. It currently launches with six local, original synthetic food campaigns:

- EMBER BURGER
- NOCHE TACOS
- FORNO PIZZA
- MIDNIGHT RAMEN
- FIRE CUT
- NOIR CHOCOLATE

Each `CommercialContentItem` contains the final 16:9 WebP, accessible alt text, campaign description, copyable visible prompt, optional process-study link, tags, and an honest motion state. It is not a second portfolio record for the same idea.

```ts
type CommercialContentItem = {
  id: string
  slug: string
  title: string
  category: 'food' | 'drink' | 'product' | 'ugc'
  shortDescription: string
  hero: { src: string; alt: string }
  prompt: string
  motion?: { duration?: string; model?: string; videoUrl?: string; youtubeId?: string; demo?: boolean }
  studyId?: string
  tags?: string[]
  demo: boolean
}
```

All six current records use `demo: true` and are visibly labelled **Synthetic demo**. No motion is shown: the campaigns are presented as stills only, until real motion masters exist. When a real public motion master exists, add its optimized local video or YouTube ID to `motion`; load it only after a deliberate user action.

### Commercial asset convention

```text
public/portfolio/commercial/food/<campaign-id>/hero.webp
public/portfolio/commercial/food/<campaign-id>/studies/model-a-standard.webp
```

The checked-in WebP set contains exactly six final heroes and the 27 variants used by the three benchmark studies. Do not replace these with stock media or make real-client claims from the demo data.

## Generation Lab

Generation Lab lives inside `03 / AI LAB`; it is not a seventh museum room or a second client-facing campaign library. Its internal navigation is **How We Build** and **Generation Lab**.

The first three public studies — EMBER BURGER, NOCHE TACOS and NOIR CHOCOLATE — each expose a responsive 3 × 3 comparison of demo-only `Model A`, `Model B`, and `Model C` at `Standard`, `High`, and `Ultra` quality. The UI derives model groups and quality cards from data, and labels the made-up cost values as `1`, `2`, and `4` **DEMO CREDITS**. It must never present these values as provider pricing, benchmarks, APIs or live generation results.

The overlay shows the final campaign cross-link, copyable prompt, the selected direction, and evaluation language for framing, material response, atmosphere, and campaign fit. The final campaign overlay returns to Final / Prompt / Process views.

## Showroom

Showroom metadata lives in `src/content/showroom.ts`. The selector, physical-screen curation, overlay, scoped previous/next navigation, and WebGL fallback all derive from it.

| Collection | Published work |
| --- | --- |
| Hospitality | 001 Brand Experience (`9pNYF_Eyk1Y`), 002 The Night Moves (`wNpkoSjUNOk`), 003 Inside the Invitation (`cZgG3cKVMCI`) |
| Real Estate | 001 ALBA DISTRICT (`jK91wfrCGEY`) |

The existing two physical screens feature `hospitality-001` and `real-estate-001`. Girls' Night (`tU8m1u80onE`), formerly a Micro Stories showroom project, now lives in the Motion room as a video record.

YouTube players mount only after a visitor explicitly opens a project and unmount on close or project change. There is no autoplay. Do not commit original video masters when YouTube hosts the public stream.

## Optional project breakdowns

Image, video, and showroom records support an optional lightweight `breakdown` object. Populate it only from approved information:

```ts
breakdown?: {
  challenge?: string
  approach?: string
  process?: string[]
  result?: string
  referenceImages?: string[]
  behindTheScenes?: string[]
  tools?: string[]
}
```

The showroom overlay renders supplied brief, direction, process, and final fields. Never invent client metrics, results, private prompts, or behind-the-scenes content.

## Work With Us

`src/content/site.ts` provides three direct, mailto-based routes:

- **I Need a Campaign** — commercials, hospitality, real estate, launches, branded storytelling.
- **I Need Ongoing Content** — social media, UGC, food and beverage, recurring production.
- **I Need an AI System** — creative automation, custom workflows, internal tools, POC infrastructure.

No CRM, authentication, database, or analytics is included. Contact details are real: `zeedher.ia@gmail.com`, +52 771 750 8350 (WhatsApp), and LinkedIn.

## Performance and accessibility

- The initial museum remains lazy-loaded and keeps the existing GLB/procedural fallback.
- Commercial hero and Generation Lab variant images use lazy loading.
- YouTube iframes mount only in explicit project overlays.
- Native controls, visible focus styles, labels, and buttons preserve keyboard and touch use; hover is never the sole activation path.
- `prefers-reduced-motion` continues to reduce camera/interface motion and disables commercial hover playback.
- The no-WebGL fallback exposes image, motion, all commercial campaigns, Generation Lab, production pipeline, showroom collections, and Work With Us routes.

## Production build and GitHub Pages

```bash
npm run lint
npm run build
```

The Vite base path comes from `VITE_REPOSITORY_NAME`; `assetUrl()` keeps public-relative content paths compatible with repository-hosted GitHub Pages. `.github/workflows/deploy-pages.yml` deploys pushes to `main`.

## Content not on the site yet

The site shows only finished, real content. The following are intentionally absent until real material exists; do not add placeholders for them:

- AI Talent portraits and optional motion/voice material.
- Real motion masters for the six commercial demo campaigns; the campaigns are shown as stills only.
- Original Worlds series assets.
- A live generation backend (the Demo Lab UI was removed together with it).

Do not replace them with stock imagery, fake digital characters, invented episodes, or placeholder links.
