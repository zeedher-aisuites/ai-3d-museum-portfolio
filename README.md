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

## 3D environment

The procedural museum is in `src/scenes/MuseumScene.tsx`; interactive content placements are generated from the data files above. A future Blender asset belongs at `public/models/museum.glb`. See `public/models/README.md` for export guidance. Keep the camera path and content entries independent when replacing geometry.

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
- The procedural museum is the active environment. GLB loading is intentionally documented but not enabled until a real `museum.glb` exists.
