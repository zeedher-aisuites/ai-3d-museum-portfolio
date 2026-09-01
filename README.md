# ATELIER / AI-FIRST CREATIVE STUDIO

ATELIER is a static-first, interactive 3D portfolio and commercial showroom built with React, Vite, Three.js, React Three Fiber, Drei, and Framer Motion. It is designed for GitHub Pages with no database, authentication, tracking, backend, or paid infrastructure.

## Atelier Architecture

The six rooms are one continuous commercial story:

| Moment | Purpose |
| --- | --- |
| `00 / ARRIVAL` | Who we are — studio positioning. |
| `01 / IMAGE` | Finished visual work for campaigns, products and spaces. |
| `02 / MOTION` | Finished moving image. |
| `03 / AI LAB` | How we build: production systems, workflows and infrastructure. |
| `04 / SHOWROOM` | What we could build for a business: concepts, prototypes and POCs. |
| `05 / CONTACT` | Start a collaboration. |

The 3D scene is only the presentation layer. Content remains data-driven and can change without editing camera, scroll, GLB, or interaction code.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

`?debug=true` adds a small non-production panel with the active waypoint and quality level.

## Content management

| Content | Data file | Asset folder |
| --- | --- | --- |
| Image portfolio | `src/content/images.ts` | `public/portfolio/images/` |
| Motion portfolio | `src/content/videos.ts` | `public/portfolio/thumbnails/`, `public/portfolio/videos/` |
| Creative AI Lab systems | `src/content/tutorials.ts` | n/a |
| Commercial showroom POCs | `src/content/showroom.ts` | `public/portfolio/showroom/`, `public/portfolio/videos/` |
| Studio identity, contact and CTAs | `src/content/site.ts` | n/a |

### Add an image portfolio project

1. Add an optimized `.webp`, `.avif`, `.jpg`, `.png`, or `.svg` to `public/portfolio/images/`.
2. Add its metadata to `src/content/images.ts`, including `category`, optional `sector`, `status`, tools and `orientation`.
3. Use a public-relative asset path, for example `portfolio/images/my-project.webp`. The image room and fallback collection update automatically.

### Add a moving-image project

1. Add a lightweight poster to `public/portfolio/thumbnails/`.
2. Add metadata to `src/content/videos.ts`. Use `thumbnail`, optional `youtubeId` or `videoUrl`, and optional `duration`.

No player is loaded until a visitor opens the project modal. A YouTube iframe, or a native `videoUrl`, mounts only inside that modal.

### Add an AI Lab system

Add an entry to `src/content/tutorials.ts`. Choose a `type` (`workflow`, `breakdown`, `tutorial`, `tool`, or `system`) and use `status: 'coming-soon'` whenever there is no genuine public URL. Do not add placeholder links.

## Adding a Showroom POC

Showroom metadata lives exclusively in `src/content/showroom.ts`. Collections and projects are independent data records; the museum, selector, detail overlay and accessible fallback are generated from that data.

1. Add collection metadata to `showroomCollections` if it does not already exist.
2. Put an optimized 16:9 poster in `public/portfolio/showroom/<collection>/concept-<index>/thumbnail.webp` and set `hero.thumbnail` to that public-relative path.
3. Add a data record with `collection`, `index`, `conceptLine`, `territories`, `capabilities`, `applications`, `status`, and the real media reference.
4. Use `youtubeId` for a YouTube-hosted film. The player mounts only after an explicit selection and unmounts when the overlay closes or the visitor moves to another concept.

The showroom screen, detail overlay, previous/next navigation, collection selector and fallback collection update automatically. YouTube players mount only after a visitor explicitly selects a concept and unmount when that overlay closes or changes concept.

## Hospitality Showroom Series

The first Showroom collection is **Hospitality**: _Three creative directions. One production system._ It is a series of speculative ATELIER POCs, not client commissions.

| Index | Title | YouTube ID |
| --- | --- | --- |
| `001` | Brand Experience | `9pNYF_Eyk1Y` |
| `002` | The Night Moves | `wNpkoSjUNOk` |
| `003` | Inside the Invitation | `cZgG3cKVMCI` |

YouTube hosts the actual streams. GitHub hosts the site, metadata, optimized WebP posters and interface only. Never commit the original Hospitality MP4 masters to this repository.

### Add Hospitality Concept 004

1. Create `public/portfolio/showroom/hospitality/concept-004/thumbnail.webp`.
2. Add one `ShowroomProject` to `showroom` with `collection: 'hospitality'`, `index: '004'`, its real YouTube ID and truthful `ATELIER POC` status.
3. Keep `featured: false` unless it intentionally replaces one of the three curated physical installations; the overlay and fallback will still expose it.

### Current Showroom Collections

The three physical screens are a curated cross-section of current ATELIER capabilities. The selector exposes every published concept within each collection.

#### Hospitality

- Concept 001 — Brand Experience
- Concept 002 — The Night Moves
- Concept 003 — Inside the Invitation

#### Real Estate

- Concept 001 — ALBA DISTRICT
- YouTube ID: `jK91wfrCGEY`

#### Micro Stories

- Concept 001 — Girls' Night
- YouTube ID: `tU8m1u80onE`

## Showroom vs Portfolio

- **SHOWROOM** = concepts, prototypes and sales demonstrations. They are clearly marked and must not imply a completed client commission.
- **PORTFOLIO** = finished visual or moving-image work. A successful POC can later be represented in Image or Motion as final work without changing the showroom architecture.

## Contact configuration

Edit `src/content/site.ts` to set the real `email`, social URLs and collaboration routes. The committed `studio@example.com` value is an explicit temporary placeholder; replace it before production outreach.

## 3D Environment Pipeline

Phase 2 uses a production GLB at `public/models/museum.glb` as the preferred architectural shell. It is a 0.75 MB, web-safe model generated from the source script `scripts/generate-museum-glb.mjs`, with no runtime textures or paid assets. The GLB contributes only static architecture: travertine-like walls, portals, columns, floors, display walls, laboratory counter, stairs, and the contact monument.

```
architecture source / Blender source
  → cleanup and semantic naming
  → PBR material consolidation and geometry reduction
  → GLB export
  → public/models/museum.glb
  → useGLTF() in src/scenes/MuseumEnvironment.tsx
```

`MuseumExperience` first checks for the GLB. If the model is unavailable or fails to parse, `MuseumScene` uses the preserved procedural environment instead. Interactive portfolio content is never baked into the model:

- `src/scenes/anchors.ts` maps semantic art, screen, and terminal anchors.
- The GLB exports matching empty nodes such as `ANCHOR_Room01_WallA_01`.
- React continues to create frames, video screens, terminal interactions, overlays, links, and camera navigation.

To regenerate the included model after an architectural edit:

```bash
node scripts/generate-museum-glb.mjs
```

For a Blender-authored replacement, preserve the anchor names, use meters, apply transforms, remove hidden or render-only geometry, consolidate PBR materials, keep textures at 512–2048px, and export a single GLB. Check the finished file size before committing; the target is 5–15 MB or less for a textured replacement.

### Asset provenance

No external BlendSwap or Poly Haven file is bundled in this release. The architectural GLB is original project geometry. These CC0 references were researched as optional source material and are documented for future manual work:

| Asset | Creator | Source | License | Used now |
| --- | --- | --- | --- | --- |
| Colonnato | lucasassone | https://blendswap.com/blend/11277 | CC0 | Reference only |
| Modern Home Interior | CianGameDev | https://blendswap.com/blend/18670 | CC0 | Reference only |
| Interior Room Visualization | MattMump | https://blendswap.com/blend/6437 | CC0 | Reference only |
| Interior art | Ndakasha | https://blendswap.com/blend/16843 | CC0 | Reference only |
| Poly Haven assets | Poly Haven contributors | https://polyhaven.com/ | CC0 | Not bundled |

The flagship `midnight-grand-tourer-v2.png` is an original project image generated for this portfolio; it is not an externally downloaded asset.

## Performance and accessibility

- Low, medium, and high render modes control DPR, antialiasing, and shadows.
- The default quality is chosen from screen size, cores, and device memory; visitors can override it.
- Touch swipe, scroll, arrows, Page Up/Down, and room controls all navigate the museum.
- `prefers-reduced-motion` reduces camera drift and interface animation.
- When WebGL is unavailable, a fully usable collection view renders with the same content and video/resource overlays.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml` deploys only pushes to `main`.

1. Push this repository to GitHub.
2. In **Settings → Pages**, choose **GitHub Actions** as the source once.
3. Push to `main`; the workflow builds with the repository base path and publishes to `https://<username>.github.io/<repository>/`.

## Branches and releases

Use `main` for stable production, `develop` for integration, and `feature/*` branches for work. V3 showroom work is developed on `feature/atelier-v3-showroom` before merging through `develop` to `main`.

## Current limitations

- `studio@example.com` is a clearly marked temporary contact configuration. Replace it in `src/content/site.ts` before using the site for outreach.
- The “Enable sound” control is preparatory; no audio file is included or autoplayed.
- The GLB environment is active and a procedural architecture fallback remains available when the file cannot load.
- The current GLB intentionally uses material-first architecture rather than photo textures; a future Blender replacement can add optimized CC0 PBR textures after measuring payload and mobile performance.
