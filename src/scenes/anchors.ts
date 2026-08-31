export type AnchorName =
  | 'Room01_WallA_01'
  | 'Room01_WallA_02'
  | 'Room01_WallA_03'
  | 'Room01_WallA_04'
  | 'Room02_Screen_01'
  | 'Room02_Screen_02'
  | 'Room02_Screen_03'
  | 'Lab_Terminal_01'
  | 'Lab_Terminal_02'
  | 'Lab_Terminal_03'
  | 'Lab_Terminal_04'
  | 'Room04_WallA_01'
  | 'Room04_WallA_02'
  | 'Room04_WallA_03'

export type Anchor = { name: AnchorName; position: [number, number, number] }

// These semantic anchors mirror named empty nodes in public/models/museum.glb.
// Keeping them as data makes a future architectural replacement independent from
// the portfolio collections and gives content a reliable procedural fallback.
export const galleryAnchors: Record<AnchorName, Anchor> = {
  Room01_WallA_01: { name: 'Room01_WallA_01', position: [-5.7, 3.2, -10.78] },
  Room01_WallA_02: { name: 'Room01_WallA_02', position: [-1.9, 3.25, -10.78] },
  Room01_WallA_03: { name: 'Room01_WallA_03', position: [2.0, 3.2, -10.78] },
  Room01_WallA_04: { name: 'Room01_WallA_04', position: [5.75, 3.15, -10.78] },
  Room02_Screen_01: { name: 'Room02_Screen_01', position: [-5.8, 3.25, -25.78] },
  Room02_Screen_02: { name: 'Room02_Screen_02', position: [0, 3.25, -25.78] },
  Room02_Screen_03: { name: 'Room02_Screen_03', position: [5.8, 3.25, -25.78] },
  Lab_Terminal_01: { name: 'Lab_Terminal_01', position: [-5.2, 4.0, -40.78] },
  Lab_Terminal_02: { name: 'Lab_Terminal_02', position: [5.2, 4.0, -40.78] },
  Lab_Terminal_03: { name: 'Lab_Terminal_03', position: [-5.2, 1.75, -40.78] },
  Lab_Terminal_04: { name: 'Lab_Terminal_04', position: [5.2, 1.75, -40.78] },
  Room04_WallA_01: { name: 'Room04_WallA_01', position: [-5.1, 3.2, -55.78] },
  Room04_WallA_02: { name: 'Room04_WallA_02', position: [0, 3.35, -55.78] },
  Room04_WallA_03: { name: 'Room04_WallA_03', position: [5.1, 3.2, -55.78] },
}

export const anchorPosition = (name: AnchorName) => galleryAnchors[name].position
