# ATELIER / AI Museum

A static-first, interactive 3D portfolio built with React, Vite, Three.js, React Three Fiber, Drei, and Framer Motion. It is designed to run on GitHub Pages with no database, authentication, tracking, or paid infrastructure.

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

All portfolio content is deliberately separate from the 3D scene.

| Content | Data file | Asset folder |
| --- | --- | --- |
| Image gallery | `src/content/images.ts` | `public/portfolio/images/` |
| Experimental gallery | `src/content/experimental.ts` | `public/portfolio/images/` |
| Videos | `src/content/videos.ts` | `public/portfolio/thumbnails/` |
| Tutorials / links | `src/content/tutorials.ts` | n/a |
| Name, introduction, contact, social URLs | `src/content/site.ts` | n/a |

### Add an image or experimental project

1. Add an optimized `.webp`, `.avif`, `.jpg`, or `.svg` to `public/portfolio/images/`.
2. Add an entry in `src/content/images.ts` or `src/content/experimental.ts`. Use the public-relative path, for example `portfolio/images/my-project.webp`.
3. Set its orientation (`landscape`, `portrait`, or `square`) and the modal metadata. The room and fallback view generate automatically.

### Add a video

1. Add a lightweight poster to `public/portfolio/thumbnails/`.
2. Add a record in `src/content/videos.ts` with either `youtubeId`, `externalUrl`, or both.

YouTube only loads its iframe after a visitor opens the item. For a normal YouTube URL, copy the ID after `v=` (or the final part of a `youtu.be/` URL) into `youtubeId`. Vimeo or any other host can use `externalUrl` now; add its embed format to `CollectionModal.tsx` when needed.

### Add a tutorial or workflow

Add an entry in `src/content/tutorials.ts`. External links are opened with `target="_blank"` and `rel="noreferrer"`.

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

Use `main` for stable production, `develop` for integration, and `feature/*` branches for work. Recommended release tag for this MVP: `v0.1.0` — **3D AI Museum Portfolio — MVP**.

## Current limitations

- Demo artwork and posters are lightweight SVG placeholders; replace them with your own optimized assets before launch.
- The “Enable sound” control is preparatory; no audio file is included or autoplayed.
- The GLB environment is active and a procedural architecture fallback remains available when the file cannot load.
- The current GLB intentionally uses material-first architecture rather than photo textures; a future Blender replacement can add optimized CC0 PBR textures after measuring payload and mobile performance.
