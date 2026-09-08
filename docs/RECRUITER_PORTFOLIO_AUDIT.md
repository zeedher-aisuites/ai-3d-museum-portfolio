# Recruiter-first portfolio architecture audit

## Scope and baseline

Audit date: 2026-09-08. The inspected checkout is `origin/main` at `29e6296` (`feat: add commercial generation lab`), before any recruiter-view implementation. This document describes the running source, not just the README. No existing portfolio media was removed or changed.

## 1. Current architecture

The application is a Vite + React 19 single-page application. `src/main.tsx` mounts `App`, which imports the single stylesheet at `src/styles/global.css`.

`src/App.tsx` is the application controller. It owns the current room, overlay selection, active generation study, showroom collection, renderer quality, loading state, pointer input, touch/wheel room navigation, and the sound-toggle UI state. It detects WebGL synchronously:

- A WebGL-capable browser receives the six-room museum. `MuseumExperience` is code-split with `React.lazy`, but it is still the default first experience.
- A browser without WebGL receives `FallbackCollection`, a long accessible DOM collection containing much of the same content. It is a capability fallback, not a normal recruiter landing route.

The museum path is `App` → lazy `MuseumExperience` → React Three Fiber `Canvas` → `MuseumScene`. `MuseumExperience` first sends a `HEAD` request for `public/models/museum.glb`. It then selects the GLB or procedural architecture. `MuseumScene` has fixed camera waypoints for six rooms and renders the React-owned frames, screens, terminals, and showroom installations over either the GLB or the legacy procedural shell.

The active GLB is a 754 KB, original, generated architecture shell. The generator creates `ARCH_*` and `ANCHOR_*` nodes. Runtime placement does **not** read those GLB anchors: `src/scenes/anchors.ts` duplicates their coordinates, and `MuseumScene` uses that TypeScript data for every display position. This is a deliberate decoupling, but it means model and source anchor drift is possible.

The application is static. Vite's `base` uses `VITE_REPOSITORY_NAME`, and `assetUrl()` prefixes all local public assets with that base. GitHub Pages builds and deploys only pushes to `main`; the workflow runs `npm ci` and passes the repository name to the build.

## 2. Current data flow

Content is mostly data-first, under `src/content/`, then composed into room layers, the fallback collection, and detail modals.

| Source | Records | Current consumers |
| --- | --- | --- |
| `site.ts` | ATELIER identity, six rooms, mail routes | `App`, loading screen, fallback |
| `images.ts` | 4 image artworks | 3D image frames, image layer, fallback, modal |
| `videos.ts` | 3 motion entries | 3D screens, motion layer, fallback, modal |
| `tutorials.ts` | 4 coming-soon resources | 3D lab terminals, lab layer, fallback, modal |
| `showroom.ts` | 4 collections, 5 projects | 3D showroom, selector, fallback, modal, latest |
| `commercial.ts` | 6 synthetic food campaigns | image/motion content walls and modal |
| `generationStudies.ts` | 3 studies × 9 locally hosted variants | Generation Lab and study modal |
| `talent.ts` | empty roster | Talent roster and modal, currently empty state |
| `capabilities.ts` | capability links and production pipeline | lobby, lab, fallback |
| `latest.ts` | derived highlights | lobby; derives showroom, video, tutorial items |

`CollectionModal` is the shared detailed-view renderer for six discriminated `Selection` variants: artwork, video, resource, showroom, talent, and commercial. `GenerationStudyModal` is deliberately separate. The view layers (`StudioLayers`) and `FallbackCollection` reuse the same data arrays rather than copying records. `experimental.ts` is not imported by the application; its three records and corresponding SVGs are presently orphaned from the live UI.

## 3. Documentation/source mismatches

- README says the “current records” in the Latest / Now Shipping lens are the Hospitality film and Micro Story. The actual derived list additionally includes `campaign-image-system` from `tutorials.ts` as “Latest Experiment.”
- README documents `experimental` media implicitly through the image-asset convention, but it does not list `src/content/experimental.ts`; more importantly, that module is unused by current source.
- README describes GLB semantic anchors as the basis for display placement. The generated GLB does contain them, but active placement is from duplicated coordinates in `src/scenes/anchors.ts`, not the GLB node transforms.
- README's `portfolio/talent/aria/hero.webp` is an illustrative future path in a code block. It does not exist. It is not referenced by a live `DigitalTalent` record, so it is not an active broken asset.
- README correctly says the six commercial heroes and 27 study variants exist. The current `public/portfolio/` tree confirms all 33 referenced WebP files are present.
- The static site metadata remains agency-first: `index.html`, `site.webmanifest`, and `site.ts` identify ATELIER as an AI-first creative studio. That is expected until the recruiter view is implemented, but it must change at the new entry point rather than being silently overwritten for the museum.

## 4. Risks

### Content integrity and placeholders

- Contact is knowingly placeholder-only: `studio@example.com`, blank Instagram and LinkedIn fields, and `isPlaceholder: true` in `site.ts`. All three contact routes mail this address.
- All six commercial campaigns are explicitly synthetic demos. Their six-second Seedance 2.5 motion metadata describes planned tests; no commercial video URL or YouTube ID is set, so no commercial motion master exists in this checkout.
- All three `videos.ts` entries have a thumbnail and duration but no `videoUrl` or `youtubeId`; their modal correctly says the moving-image master is coming soon. The SVG thumbnails are visual placeholders, not video files.
- `talent.ts` intentionally has zero records and no portrait assets. Original Worlds is intentionally an empty showroom collection. Four AI Lab resources are all `coming-soon`. These must not be presented as completed recruiter evidence.
- The current image and motion SVGs are deliberately stylized static art/thumbnail assets. Several unused legacy SVGs remain under `public/portfolio/` (`midnight-grand-tourer.svg`, the three showroom `*-poc.svg` files); retain them until a separate curation decision.

### Performance and deployment

- The verified production build has a 1,087.75 kB minified / 309.61 kB gzip museum chunk and emits Vite's over-500 kB warning. React Three Fiber, Drei, and Three are isolated in the lazy museum chunk, which is good, but the existing app loads it immediately for all WebGL visitors.
- `public/` currently totals about 6.5 MB; `midnight-grand-tourer-v2.png` alone is about 2.0 MB. Recruiter case-study media should not repeat that pattern, and media placed in `public/` is copied verbatim without bundler image optimization.
- Google Fonts are imported from CSS at runtime. This adds a third-party dependency and can delay typography; keep it out of the critical recruiter path unless self-hosted or deliberately accepted.
- GitHub Pages has no image transformation, redirects, server rendering, or protected media. Large video masters and confidential/client-only material do not belong in this repository.

### Accessibility and mobile

- The fallback has meaningful DOM sections, native buttons, labels, lazy images, and modal focus placement. The interface also respects `prefers-reduced-motion` and has mobile CSS at 700 px.
- The primary experience still requires WebGL, dense overlay panels, fixed viewport positioning, wheel/swipe navigation, and pointer-driven camera drift. This is not a fast, recruiter-appropriate first route on mobile or assistive-technology-heavy workflows.
- Modal dialogs set `aria-modal` and focus the close button, but do not trap focus or restore it to the invoking control. Keyboard navigation can reach background controls.
- The `soundEnabled` control currently changes only local button state; no audio is wired. Mobile CSS hides that button. Treat it as a placeholder control.
- The 3D image fallback uses generated geometry for SVG artwork rather than the actual SVG texture; that visual path is independent of the DOM/modal asset presentation.

## 5. Components that should be reused

- `CollectionModal` as the basis for an accessible case-study detail view, after its type contract is widened for recruiter fields. Its lazy media behavior, shared breakdown rendering, and explicit video mounting are useful.
- `FallbackCollection` patterns: semantic long-form DOM sections, card grids, contact routes, and data-driven collections. It should inform the recruiter view, not be rebranded in place.
- `TalentRoster` and `DigitalTalent` for the curated AI Talent roster. The empty-state, lazy portrait loading, and detail modal path are already appropriate, subject to approved data.
- `assetUrl()`, Vite base configuration, and the public-relative asset strategy for Pages-safe static delivery.
- Existing `ProjectBreakdown` as a nested evidence block. It can be reused for approved context/process/tools, but recruiter case studies require additional role, scope, and outcome fields.
- `MuseumExperience`, `MuseumScene`, anchors, GLB/procedural fallback, `StudioLayers`, Generation Lab, and showroom components as the preserved secondary ATELIER experience.

## 6. Components that should be changed

- `App.tsx`: become a small route/entry-shell decision, with recruiter content as the default and the museum behind an explicit “Explore ATELIER 3D” route/action. Do not make WebGL support decide which brand experience a recruiter sees.
- `index.html` and `site.webmanifest`: move recruiter-first title, description, social metadata, and identity into the default entry. Museum-specific identity can be set when that route is entered.
- `site.ts`: split person/recruiter identity from museum/studio identity; retain the latter unchanged for the ATELIER route. Replace no contact values until supplied and approved.
- `types.ts`: add a dedicated recruiter case-study model rather than forcing factual case studies into `Artwork`, `CommercialContentItem`, or `ShowroomProject`. Keep `Selection` extensible.
- `src/styles/global.css`: split critical recruiter styles from museum styles so the primary path does not need the museum's visual system. Keep shared tokens deliberately small.
- `latest.ts` and `capabilities.ts`: keep them museum editorial data. Create recruiter-specific curated navigation/highlights rather than mixing audiences and claims.

## 7. Proposed recruiter-first architecture

Use a client-side, static, path-based shell that works on GitHub Pages without server rewrites:

```text
/ (default)                         RecruiterPortfolio — no Canvas/WebGL import
  ├─ intro / contact / selected work
  ├─ six CaseStudy cards and details
  ├─ curated AI Talent roster
  └─ explicit link: /atelier

/atelier (secondary)                Existing MuseumApp, lazy-loaded
  ├─ MuseumExperience / Canvas
  ├─ 3D museum room overlays
  └─ current non-WebGL FallbackCollection
```

The simplest implementation is a tiny pathname router in `App.tsx` (or a new `AppShell`) that lazy-loads `RecruiterPortfolio` and `MuseumApp` independently. This avoids a router dependency and works with Pages' SPA fallback for direct navigation only if `404.html` is added or hash routing is used. The lowest-risk first version is a default `/` recruiter view and an explicit `?view=atelier` or `#/atelier` museum route; a later Pages-safe `404.html` can enable clean `/atelier` deep links. The recruiter module must not import Three, React Three Fiber, Drei, or museum components.

Preserve current museum data files and components under the ATELIER branch of the shell. The recruiter view may link to an approved museum section but should not recast synthetic demos, in-development work, or placeholders as résumé achievements.

## 8. Proposed content model

Create a recruiter-specific content module, for example `src/content/recruiter.ts`, with explicitly supplied values only. Six records are supported by the model, but this audit supplies no project names, clients, dates, roles, tools, metrics, URLs, or personal details.

```ts
type RecruiterProfile = {
  name: string
  headline: string
  summary?: string
  contact?: { email?: string; linkedin?: string; location?: string }
  museumEntryLabel: string
}

type RecruiterCaseStudy = {
  id: string
  slug: string
  title: string
  status: 'published' | 'private' | 'in-development'
  cover: { src: string; alt: string }
  summary: string
  role?: string[]
  disciplines?: string[]
  tools?: string[]
  year?: string
  client?: string
  context?: string
  contribution?: string[]
  outcome?: string
  media?: Array<{ src: string; alt: string; kind: 'image' | 'video' }>
  externalUrl?: string
  breakdown?: ProjectBreakdown
}

type RecruiterPortfolioContent = {
  profile: RecruiterProfile
  caseStudies: RecruiterCaseStudy[] // curate exactly six only when approved
  talent: DigitalTalent[]
}
```

Require `alt`, `status`, and source approval for every published case-study media item. Do not make outcome, client, tool, metric, or link fields required: their absence should render cleanly rather than encourage invented claims. Keep the existing `DigitalTalent` structure for the curated roster; add only data that has been approved, and keep the roster visually/semantically separate from José Eduardo Hernández's personal credentials.

## 9. Proposed media folder conventions

Keep existing `public/portfolio/` untouched as the ATELIER museum archive. Add a separate recruiter namespace so sources cannot be confused:

```text
public/
  recruiter/
    profile/
      portrait.webp                 # optional, approved
    case-studies/
      <case-study-slug>/
        cover.webp                  # card/OG-sized image
        detail-001.webp
        detail-002.webp
        poster.webp                 # optional video poster
        motion.mp4                  # only an approved, optimized public master
    talent/
      <talent-id>/
        hero.webp
        detail-001.webp
        motion.mp4                  # optional, optimized, approved
  portfolio/                        # existing museum assets; do not reorganize now
```

Use lower-case kebab-case IDs, WebP or AVIF for stills, descriptive data-owned alt text, and `loading="lazy"` below the first viewport. Define a published image-size budget before adding all six case studies (for example, one responsive cover plus a small, deliberate detail set), run compression before commit, and do not commit unoptimized originals. Keep video out of the initial recruiter payload, use `preload="metadata"`, and consider a hosted player only after consent, privacy, and page-weight needs are assessed.

## 10. Migration plan in small commits

1. `chore: audit portfolio architecture for recruiter mode` — add this audit only; preserve all runtime behavior. (This commit.)
2. `feat: add recruiter portfolio content contracts` — add empty, validated profile/case-study content types and a separate data file; no invented records or media.
3. `feat: add recruiter-first application shell` — make the fast DOM recruiter entry the default and move the existing app into a lazy ATELIER museum route without altering museum behavior.
4. `feat: add recruiter portfolio overview` — build accessible profile, contact, selected-work navigation, and exactly six data-driven case-study slots using approved source material.
5. `feat: add recruiter case-study details` — add evidence-oriented detail views, media loading, accessible dialog/focus behavior, and no unsupported result claims.
6. `feat: add curated AI talent roster` — populate only approved talent records/media; reuse the existing roster/detail patterns where appropriate.
7. `chore: optimize recruiter media and metadata` — add responsive/optimized approved media, recruiter-specific document/social metadata, performance budgets, and Pages-safe route handling.
8. `test: verify recruiter and museum entry paths` — run keyboard/mobile/reduced-motion checks, WebGL/no-WebGL checks, direct Pages URLs, `npm run lint`, and Pages-equivalent production build.

## Verified commands

- `npm install`: completed; 234 packages audited, 0 vulnerabilities. npm reported that an `esbuild` install script was blocked by the local package-manager policy, but the existing installed binary still produced a successful build.
- `npm run lint`: passed with exit code 0.
- `VITE_REPOSITORY_NAME=ai-3d-museum-portfolio npm run build`: passed. The only build concern was Vite's museum-chunk size warning described above.
