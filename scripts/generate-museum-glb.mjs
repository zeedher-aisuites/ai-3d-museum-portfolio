import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as THREE from 'three'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'

// GLTFExporter uses FileReader in browsers. This small implementation allows the
// same official Three.js exporter to run under Node without introducing another
// modeling dependency.
globalThis.FileReader = class FileReader {
  result = null
  onload = null
  onloadend = null
  onerror = null
  readAsArrayBuffer(blob) {
    blob.arrayBuffer()
      .then((buffer) => {
        this.result = buffer
        this.onload?.({ target: this })
        this.onloadend?.({ target: this })
      })
      .catch((error) => this.onerror?.(error))
  }
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const output = path.join(root, 'public', 'models', 'museum.glb')

const scene = new THREE.Scene()
scene.name = 'AI_Museum_Architecture'

const limestone = new THREE.MeshStandardMaterial({ color: '#c7bca9', roughness: 0.78, metalness: 0.04 })
const plaster = new THREE.MeshStandardMaterial({ color: '#e2ddd3', roughness: 0.92, metalness: 0 })
const darkStone = new THREE.MeshStandardMaterial({ color: '#191919', roughness: 0.52, metalness: 0.2 })
const charcoal = new THREE.MeshStandardMaterial({ color: '#242321', roughness: 0.58, metalness: 0.38 })
const brass = new THREE.MeshStandardMaterial({ color: '#a77b4a', roughness: 0.35, metalness: 0.8 })
const smokedGlass = new THREE.MeshPhysicalMaterial({ color: '#4c5857', roughness: 0.12, metalness: 0.15, transparent: true, opacity: 0.26 })

function group(name) {
  const node = new THREE.Group()
  node.name = name
  scene.add(node)
  return node
}

function box(parent, name, [width, height, depth], [x, y, z], material, bevel = 0) {
  const geometry = bevel > 0
    ? new THREE.BoxGeometry(width, height, depth, 1, 1, 1)
    : new THREE.BoxGeometry(width, height, depth)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = name
  mesh.position.set(x, y, z)
  mesh.castShadow = true
  mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}

function column(parent, name, x, z, height = 7.6) {
  const columnGroup = new THREE.Group()
  columnGroup.name = name
  columnGroup.position.set(x, 0, z)
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.58, 0.16, 20), darkStone)
  base.position.y = 0.08
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.43, 0.26, 20), limestone)
  plinth.position.y = 0.29
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.34, height - 0.86, 24), limestone)
  shaft.position.y = height / 2
  const capital = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.35, 0.2, 20), limestone)
  capital.position.y = height - 0.33
  const abacus = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.14, 1.12), limestone)
  abacus.position.y = height - 0.16
  columnGroup.add(base, plinth, shaft, capital, abacus)
  parent.add(columnGroup)
}

function portal(parent, name, z, dark = false) {
  const material = dark ? charcoal : limestone
  const portalGroup = new THREE.Group()
  portalGroup.name = name
  const left = box(portalGroup, `${name}_PierL`, [0.8, 6.4, 0.7], [-4.35, 3.2, z], material)
  const right = box(portalGroup, `${name}_PierR`, [0.8, 6.4, 0.7], [4.35, 3.2, z], material)
  const arch = new THREE.Mesh(new THREE.TorusGeometry(4.0, 0.38, 10, 32, Math.PI), material)
  arch.name = `${name}_Arch`
  arch.position.set(0, 6.35, z)
  portalGroup.add(left, right, arch)
  scene.add(portalGroup)
}

function anchor(name, [x, y, z]) {
  const node = new THREE.Object3D()
  node.name = `ANCHOR_${name}`
  node.position.set(x, y, z)
  scene.add(node)
}

const lobby = group('ARCH_Lobby')
box(lobby, 'ARCH_Floor', [19, 0.3, 90], [0, -0.15, -25], limestone)
box(lobby, 'ARCH_CentralInlay', [4.1, 0.04, 83], [0, 0.03, -25], darkStone)
box(lobby, 'ARCH_LeftWall', [0.32, 8.4, 90], [-9.35, 4.2, -25], plaster)
box(lobby, 'ARCH_RightWall', [0.32, 8.4, 90], [9.35, 4.2, -25], plaster)
box(lobby, 'ARCH_Lobby_Monolith', [13.2, 6.2, 0.42], [0, 3.1, 5.8], charcoal)
box(lobby, 'ARCH_Lobby_LightSlot', [8.6, 0.1, 0.08], [0, 5.48, 6.04], brass)

const ceilings = group('ARCH_Ceiling')
for (const z of [11, -4, -19, -34, -49, -64]) {
  box(ceilings, `ARCH_CeilingBeam_${z}`, [18.6, 0.38, 0.44], [0, 8.1, z + 5.5], charcoal)
  box(ceilings, `ARCH_CeilingTrim_${z}`, [13.2, 0.12, 0.3], [0, 7.72, z + 5.2], brass)
}

const columns = group('ARCH_Columns')
for (const z of [15, 8, 0, -8, -15, -23, -30, -38, -45, -53, -60, -68]) {
  column(columns, `ARCH_Column_L_${z}`, -7.7, z)
  column(columns, `ARCH_Column_R_${z}`, 7.7, z)
}

portal(scene, 'ARCH_Portal_Entrance', 3.1)
portal(scene, 'ARCH_Portal_Film', -11.8, true)
portal(scene, 'ARCH_Portal_Lab', -26.8)
portal(scene, 'ARCH_Portal_Experimental', -41.8, true)
portal(scene, 'ARCH_Portal_Contact', -56.8)

const roomOne = group('ARCH_Room01')
box(roomOne, 'ARCH_Room01_DisplayWall', [18, 7.7, 0.35], [0, 3.85, -11.1], plaster)
box(roomOne, 'ARCH_Room01_Plinth', [2.2, 0.72, 1.05], [0, 0.35, -2.5], darkStone)

const roomTwo = group('ARCH_Room02')
box(roomTwo, 'ARCH_Room02_DisplayWall', [18, 7.7, 0.35], [0, 3.85, -26.1], charcoal)
box(roomTwo, 'ARCH_Room02_LeftReveal', [3.1, 5.1, 0.18], [-6.8, 3.4, -25.86], darkStone)
box(roomTwo, 'ARCH_Room02_RightReveal', [3.1, 5.1, 0.18], [6.8, 3.4, -25.86], darkStone)

const lab = group('ARCH_Lab')
box(lab, 'ARCH_Lab_BackWall', [18, 7.7, 0.35], [0, 3.85, -41.1], plaster)
box(lab, 'ARCH_Lab_Glass', [7, 3.6, 0.08], [0, 3.8, -40.86], smokedGlass)
box(lab, 'ARCH_Lab_Counter', [12.7, 0.78, 1.15], [0, 0.39, -36.8], charcoal)
box(lab, 'ARCH_Lab_CounterTrim', [12.8, 0.08, 1.2], [0, 0.82, -36.8], brass)

const experimental = group('ARCH_Room04')
box(experimental, 'ARCH_Room04_DisplayWall', [18, 7.7, 0.35], [0, 3.85, -56.1], darkStone)
box(experimental, 'ARCH_Room04_Stage', [14.6, 0.22, 3.2], [0, 0.1, -51.6], charcoal)
box(experimental, 'ARCH_Room04_Trim', [14.8, 0.08, 0.12], [0, 0.24, -53.05], brass)

const contact = group('ARCH_Contact')
box(contact, 'ARCH_ContactMonument', [18, 7.7, 0.52], [0, 3.85, -68.4], charcoal)
box(contact, 'ARCH_ContactLightSlot', [9.4, 0.16, 0.08], [0, 5.8, -68.1], brass)
box(contact, 'ARCH_Stairs', [6.2, 0.24, 5.4], [0, 0.13, -62.4], darkStone)

anchor('Room01_WallA_01', [-5.7, 3.2, -10.78])
anchor('Room01_WallA_02', [-1.9, 3.25, -10.78])
anchor('Room01_WallA_03', [2.0, 3.2, -10.78])
anchor('Room01_WallA_04', [5.75, 3.15, -10.78])
anchor('Room02_Screen_01', [-5.8, 3.25, -25.78])
anchor('Room02_Screen_02', [0, 3.25, -25.78])
anchor('Room02_Screen_03', [5.8, 3.25, -25.78])
anchor('Lab_Terminal_01', [-5.2, 4.0, -40.78])
anchor('Lab_Terminal_02', [5.2, 4.0, -40.78])
anchor('Lab_Terminal_03', [-5.2, 1.75, -40.78])
anchor('Lab_Terminal_04', [5.2, 1.75, -40.78])
anchor('Room04_WallA_01', [-5.1, 3.2, -55.78])
anchor('Room04_WallA_02', [0, 3.35, -55.78])
anchor('Room04_WallA_03', [5.1, 3.2, -55.78])

scene.updateMatrixWorld(true)
const exporter = new GLTFExporter()
const result = await new Promise((resolve, reject) => {
  exporter.parse(scene, resolve, reject, { binary: true, onlyVisible: true })
})

await mkdir(path.dirname(output), { recursive: true })
await writeFile(output, new Uint8Array(result))
console.log(`Generated ${path.relative(root, output)}`)
