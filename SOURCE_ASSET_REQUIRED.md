# Optional CC0 source-asset workflow

Phase 2 is complete without a third-party architectural download: `public/models/museum.glb` is original project geometry and is active in production.

BlendSwap download links currently require an authenticated BlendSwap session. Do not bypass that requirement. If a future visual pass needs higher-detail source material, manually download only one verified CC0 file, keep its original download outside the production bundle, and adapt it in Blender before exporting a new `public/models/museum.glb`.

Preferred reference: **Colonnato** by **lucasassone**, https://blendswap.com/blend/11277, CC0. It is a reference for column rhythm, portals, and monumental volume—not an asset to publish unchanged.

Before export, remove unrelated furniture/cameras/lights, apply transforms, simplify materials to web-compatible PBR, preserve semantic `ARCH_*` naming and `ANCHOR_*` nodes, and record source/export/final size in the pull request or README.
