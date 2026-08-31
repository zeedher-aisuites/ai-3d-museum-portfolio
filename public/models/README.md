# Museum environment model

`museum.glb` is the active, self-contained architectural shell for the gallery. It is generated from `scripts/generate-museum-glb.mjs` and loaded with Drei `useGLTF()` by `src/scenes/MuseumEnvironment.tsx`.

The model must remain architecture-only. Keep content in React: artwork frames, video thumbnails, tutorial terminals, overlays, links, and the camera system are deliberately not baked into the model.

## Required semantic nodes

When replacing the model, retain the `ARCH_*` hierarchy where useful and export these empty anchor nodes at their intended display positions:

`ANCHOR_Room01_WallA_01` through `04`, `ANCHOR_Room02_Screen_01` through `03`, `ANCHOR_Lab_Terminal_01` through `04`, and `ANCHOR_Room04_WallA_01` through `03`.

The matching fallback transform data is in `src/scenes/anchors.ts`.

For Blender exports: apply transforms, use meters, keep materials PBR, bake or pack optimized textures, name objects clearly, and remove hidden geometry. Prefer 512–2048px textures and consolidate repeat materials. Export GLB with optimized geometry; consider Meshopt or Draco only after confirming a meaningful payload improvement.
