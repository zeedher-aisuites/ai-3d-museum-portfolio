# Optional museum model

Place a future architectural replacement here as `museum.glb`.

The current MVP renders `src/scenes/MuseumScene.tsx` procedurally, while artwork, video, lab, and contact interactions remain data-driven. A future `MuseumModel` component can load `/models/museum.glb` alongside the interactive content placements without changing the data files.

For Blender exports: apply transforms, use meters, keep materials PBR, bake or pack optimized textures, name objects clearly, and remove hidden geometry. Export GLB with optimized geometry; consider Meshopt or Draco only after checking their actual payload benefit.
