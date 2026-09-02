# ATELIER / LIVING AI-FIRST CREATIVE STUDIO PORTFOLIO

ATELIER is a static-first interactive 3D portfolio for a creative studio, AI production system, narrative lab, digital talent studio, automation/product lab, and original-IP practice. It is built with React, Vite, Three.js, React Three Fiber, Drei, and Framer Motion, and deploys to GitHub Pages without a database, tracking, authentication, or frontend secrets.

## Information architecture

The six-room museum remains the presentation shell. New capabilities live in data-driven editorial layers, overlays, and the accessible fallback rather than additional 3D rooms.

| Room | Current programme |
| --- | --- |
| `00 / ARRIVAL` | **What We Build** capability index and **Now Shipping** editorial highlights. |
| `01 / IMAGE` | Selected Work, AI Talent casting roster, and Commercial Content Systems — Static. |
| `02 / MOTION` | Selected Motion and Commercial Content Systems — Motion. |
| `03 / AI LAB` | AI Demo Lab frontend and client-facing Production Pipeline. |
| `04 / SHOWROOM` | Hospitality, Real Estate, Micro Stories, and Original Worlds. |
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
| AI Talent roster | `src/content/talent.ts` | `public/portfolio/talent/<talent-id>/` |
| Commercial static → motion pairs | `src/content/commercial.ts` | `public/portfolio/commercial/<concept-id>/` |
| AI Lab systems | `src/content/tutorials.ts` | n/a |
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

The current records surface the latest Hospitality film, Micro Story, and campaign-image-system experiment.

### Selected Work

`featured` remains the editorial selection flag for physical screens and curated work. In the showroom, only three `featured` records occupy the existing physical screens; every record remains accessible through its collection selector and fallback.

## AI Talent

`src/content/talent.ts` is intentionally empty until studio-approved original character portraits and details are supplied. The UI supports approximately 10–50 records without a component rewrite.

```ts
type DigitalTalent = {
  id: string
  name: string
  hero: string
  archetype?: string
  shortDescription?: string
  tags: string[]
  capabilities: string[]
  status?: 'available' | 'in-development'
  additionalImages?: string[]
  videoUrl?: string
  youtubeId?: string
  voiceAvailable?: boolean
  personality?: string
  featured?: boolean
}
```

The roster is an editorial casting wall, not a social profile directory. Hover/focus reveals the name and capabilities; click/tap opens the existing detail overlay. Do not add follower counts, social handles, engagement metrics, or unapproved characters.

### Talent asset convention

```text
public/portfolio/talent/<talent-id>/hero.webp
public/portfolio/talent/<talent-id>/detail-001.webp
public/portfolio/talent/<talent-id>/motion.mp4       # only when approved and optimized
```

Use optimized WebP/AVIF portraits, descriptive alt-ready names in data, and public-relative paths such as `portfolio/talent/aria/hero.webp`.

## Commercial Content Systems

One `CommercialContentItem` is one commercial concept, not two unrelated portfolio records. It pairs poster → motion → campaign-ready delivery.

```ts
type CommercialContentItem = {
  id: string
  title?: string
  category: 'food' | 'drink' | 'ugc' | 'item'
  poster: string
  videoUrl?: string
  youtubeId?: string
  duration?: string
  tags: string[]
  featured?: boolean
}
```

The static and motion walls are intentionally empty until approved assets arrive. When records are added, posters use native lazy loading. Native motion previews mount only for the currently hovered/focused card, are muted/inline/looped, unmount on exit, and remain disabled under `prefers-reduced-motion`. Touch opens the same project overlay instead. Never preload a wall of videos or add placeholder commercial work.

### Commercial asset convention

```text
public/portfolio/commercial/<concept-id>/poster.webp
public/portfolio/commercial/<concept-id>/motion.mp4
```

Example data paths: `portfolio/commercial/citrus-soda/poster.webp` and `portfolio/commercial/citrus-soda/motion.mp4`. Keep motion files short, muted-preview-ready, and web-optimized; use YouTube when the public master belongs on YouTube.

## AI Demo Lab

The Demo Lab is a functional frontend and adapter contract, not a fake generator. It accepts JPEG, PNG, and WebP files up to 10 MB, previews the selected image with a revocable object URL, supports replacement/removal, and has explicit states:

```text
idle → ready → uploading → generating → success | error
```

Its content type controls are `food`, `drink`, `ugc`, and `item`. Progress copy represents stages only; the UI does not invent percentage progress.

### Backend configuration

Set the backend origin at build time only:

```text
VITE_DEMO_API_URL=https://your-api.example.com
```

When the variable is missing, the interface remains usable as a UX preview and clearly says that the live generation backend is not connected. It does not make a request and does not fabricate a generated result.

`src/services/demoLabApi.ts` is the sole browser adapter. No API key, ComfyUI credential, provider token, or localhost production URL belongs in this repository.

### Future API contract

```http
POST /generate-flyer
Content-Type: multipart/form-data

image=<JPEG|PNG|WEBP>
category=<food|drink|ugc|item>
```

Synchronous response:

```json
{ "status": "success", "imageUrl": "https://cdn.example/result.webp" }
```

Asynchronous response:

```json
{ "status": "queued", "jobId": "job_123" }
```

Polling contract:

```http
GET /jobs/:jobId
```

```json
{ "status": "queued" | "processing" | "success" | "error", "imageUrl": "...", "message": "..." }
```

The backend must own provider credentials and implement MIME sniffing, 10 MB-or-lower server limits, rate limiting, moderation/unsafe-content policy, per-IP or session quotas, request timeout, temporary storage, automatic deletion, and practical job cancellation. Frontend validation is a user-experience aid, not a security boundary.

## Showroom

Showroom metadata lives in `src/content/showroom.ts`. The selector, physical-screen curation, overlay, scoped previous/next navigation, and WebGL fallback all derive from it.

| Collection | Published work |
| --- | --- |
| Hospitality | 001 Brand Experience (`9pNYF_Eyk1Y`), 002 The Night Moves (`wNpkoSjUNOk`), 003 Inside the Invitation (`cZgG3cKVMCI`) |
| Real Estate | 001 ALBA DISTRICT (`jK91wfrCGEY`) |
| Micro Stories | 001 Girls' Night (`tU8m1u80onE`) |
| Original Worlds | Original animated series in development; no titles, episodes, characters, thumbnails, or media have been invented. |

The existing three physical screens remain a cross-section: `hospitality-001`, `real-estate-001`, and `micro-stories-001`. Original Worlds is an honest in-development collection until real original-IP assets are supplied.

YouTube players mount only after a visitor explicitly opens a project and unmount on close or project change. There is no autoplay. Do not commit original video masters when YouTube hosts the public stream.

### Future Original Worlds assets

When material exists, use one record per genuine teaser, episode, character test, environment study, action test, or dialogue test. `ShowroomProject.format` supports those six record types. Suggested location:

```text
public/portfolio/showroom/original-worlds/<record-id>/thumbnail.webp
```

Add only real titles, descriptions, posters, and media URLs. Original Worlds is original-IP development; it is not a generic cartoon-placeholder section.

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
- **I Need Ongoing Content** — social media, UGC, AI Talent, food and beverage, recurring production.
- **I Need an AI System** — creative automation, custom workflows, internal tools, POC infrastructure.

No CRM, authentication, database, or analytics is included. Replace `studio@example.com` before production outreach.

## Performance and accessibility

- The initial museum remains lazy-loaded and keeps the existing GLB/procedural fallback.
- Talent and commercial images use lazy loading. Commercial preview videos mount only on intent.
- YouTube iframes mount only in explicit project overlays.
- Native controls, visible focus styles, labels, and buttons preserve keyboard and touch use; hover is never the sole activation path.
- `prefers-reduced-motion` continues to reduce camera/interface motion and disables commercial hover playback.
- The no-WebGL fallback exposes image, motion, talent, commercial-system readiness, Demo Lab, production pipeline, showroom collections, and Work With Us routes.

## Production build and GitHub Pages

```bash
npm run lint
npm run build
```

The Vite base path comes from `VITE_REPOSITORY_NAME`; `assetUrl()` keeps public-relative content paths compatible with repository-hosted GitHub Pages. `.github/workflows/deploy-pages.yml` deploys pushes to `main`.

## Current intentional asset gaps

- AI Talent portraits and optional motion/voice material have not yet been supplied.
- Food/drink commercial posters and their short motion counterparts have not yet been supplied.
- Original Worlds series assets have not yet been supplied.
- The Demo Lab backend is not connected unless `VITE_DEMO_API_URL` is configured.

These states are represented intentionally in the interface. Do not replace them with stock imagery, fake digital characters, invented episodes, or placeholder links.
