import { Float, RoundedBox, Text, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Component, useMemo, useRef, useState, type ReactNode } from 'react'
import type { BufferGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Color, SRGBColorSpace, Vector3 } from 'three'
import { images } from '../content/images'
import { showroom, showroomCollections } from '../content/showroom'
import { site } from '../content/site'
import { assetUrl, type Artwork, type Resource, type Selection, type ShowroomProject, type Video } from '../content/types'
import { tutorials } from '../content/tutorials'
import { videos } from '../content/videos'
import type { Quality } from '../utils/quality'
import { anchorPosition, type AnchorName } from './anchors'
import { MuseumEnvironment, ProceduralArchitecture } from './MuseumEnvironment'

type MuseumSceneProps = {
  roomIndex: number
  pointer: [number, number]
  reducedMotion: boolean
  quality: Quality
  environment: 'glb' | 'procedural'
  onSelect: (selection: Selection) => void
}

type CameraWaypoint = { position: [number, number, number]; target: [number, number, number] }

const cameraWaypoints: CameraWaypoint[] = [
  { position: [0, 1.72, 17.1], target: [0, 2.65, 8.1] },
  { position: [0, 1.7, 3.75], target: [0, 2.55, -4.65] },
  { position: [0, 1.7, -12.95], target: [0, 2.65, -19.4] },
  { position: [0, 1.7, -28.0], target: [0, 2.45, -34.45] },
  { position: [0, 1.7, -43.05], target: [0, 2.6, -49.5] },
  { position: [0, 1.68, -58.35], target: [0, 2.65, -64.2] },
]

const imageAnchors: AnchorName[] = ['Room01_WallA_01', 'Room01_WallA_02', 'Room01_WallA_03', 'Room01_WallA_04']
const videoAnchors: AnchorName[] = ['Room02_Screen_01', 'Room02_Screen_02', 'Room02_Screen_03']
const labAnchors: AnchorName[] = ['Lab_Terminal_01', 'Lab_Terminal_02', 'Lab_Terminal_03', 'Lab_Terminal_04']
const showroomAnchors: AnchorName[] = ['Room04_WallA_01', 'Room04_WallA_02', 'Room04_WallA_03']
const galleryAmbient = new Color('#d9cfbf')

function CameraRig({ roomIndex, pointer, reducedMotion }: Pick<MuseumSceneProps, 'roomIndex' | 'pointer' | 'reducedMotion'>) {
  const destination = cameraWaypoints[roomIndex]
  const target = useMemo(() => new Vector3(), [])
  const wantedPosition = useMemo(() => new Vector3(), [])

  useFrame(({ camera }, delta) => {
    wantedPosition.set(...destination.position)
    target.set(...destination.target)
    const drift = reducedMotion ? 0 : 0.2
    wantedPosition.x += pointer[0] * drift
    wantedPosition.y += pointer[1] * drift * 0.22
    target.x += pointer[0] * drift * 0.75
    target.y += pointer[1] * drift * 0.38
    const damping = reducedMotion ? 8 : 2.35
    camera.position.lerp(wantedPosition, 1 - Math.exp(-damping * delta))
    camera.lookAt(target)
  })
  return null
}

class EnvironmentBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function RoomShell({ center, dark = false }: { center: number; dark?: boolean }) {
  const wall = dark ? '#171716' : '#d5cec3'
  const floor = dark ? '#121211' : '#4d4841'
  return (
    <group>
      <mesh position={[0, -0.08, center]} receiveShadow><boxGeometry args={[18.6, 0.16, 13.2]} /><meshStandardMaterial color={floor} roughness={0.82} metalness={0.1} /></mesh>
      <mesh position={[-9.3, 4, center]} receiveShadow><boxGeometry args={[0.2, 8, 13.2]} /><meshStandardMaterial color={wall} roughness={0.9} /></mesh>
      <mesh position={[9.3, 4, center]} receiveShadow><boxGeometry args={[0.2, 8, 13.2]} /><meshStandardMaterial color={wall} roughness={0.9} /></mesh>
      <mesh position={[0, 7.95, center]}><boxGeometry args={[18.6, 0.16, 13.2]} /><meshStandardMaterial color="#24221f" roughness={0.95} /></mesh>
    </group>
  )
}

function LegacyProceduralMuseum() {
  return (
    <group name="LEGACY_PROCEDURAL_MUSEUM">
      <ProceduralArchitecture />
      <RoomShell center={10.8} />
      <RoomShell center={-5} />
      <RoomShell center={-20} dark />
      <RoomShell center={-35} />
      <RoomShell center={-50} dark />
      <RoomShell center={-62} dark />
      {[-5, -20, -35, -50, -62].flatMap((z) => [
        <Column key={`${z}-left`} position={[-7.72, 3.8, z + 5.5]} />,
        <Column key={`${z}-right`} position={[7.72, 3.8, z + 5.5]} />,
      ])}
    </group>
  )
}

function Column({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow><cylinderGeometry args={[0.3, 0.38, 7.2, 20]} /><meshStandardMaterial color="#c5b9a6" roughness={0.72} /></mesh>
      <mesh position={[0, -3.53, 0]}><cylinderGeometry args={[0.5, 0.56, 0.18, 20]} /><meshStandardMaterial color="#211f1b" roughness={0.56} metalness={0.25} /></mesh>
      <mesh position={[0, 3.57, 0]}><boxGeometry args={[1.06, 0.16, 1.06]} /><meshStandardMaterial color="#c5b9a6" roughness={0.72} /></mesh>
    </group>
  )
}

function ArtworkTexture({ image, width, height }: { image: string; width: number; height: number }) {
  const texture = useTexture(assetUrl(image))
  texture.colorSpace = SRGBColorSpace
  return <mesh position={[0, 0, 0.115]}><planeGeometry args={[width, height]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
}

function Frame({ item, position, onSelect }: { item: Artwork; position: [number, number, number]; onSelect: () => void }) {
  const portrait = item.orientation === 'portrait'
  const square = item.orientation === 'square'
  const width = portrait ? 2.25 : square ? 2.85 : 3.78
  const height = portrait ? 3.55 : square ? 2.85 : 2.25
  const frame = portrait ? 0.14 : 0.13
  const usesImageTexture = item.image.endsWith('.png') || item.image.endsWith('.jpg') || item.image.endsWith('.webp')
  return (
    <group position={position} onClick={(event) => { event.stopPropagation(); onSelect() }}>
      <RoundedBox args={[width + frame * 2, height + frame * 2, 0.18]} radius={0.045} smoothness={2} castShadow><meshStandardMaterial color="#171614" roughness={0.32} metalness={0.68} /></RoundedBox>
      {usesImageTexture ? <ArtworkTexture image={item.image} width={width} height={height} /> : (
        <>
          <mesh position={[0, 0, 0.11]}><planeGeometry args={[width, height]} /><meshStandardMaterial color={item.accent} roughness={0.82} /></mesh>
          <mesh position={[0, 0.08, 0.115]}><circleGeometry args={[Math.min(width, height) * 0.25, 36]} /><meshBasicMaterial color="#151514" /></mesh>
          <mesh position={[0, -height * 0.23, 0.117]}><planeGeometry args={[width * 0.62, 0.035]} /><meshBasicMaterial color="#f1e9dc" transparent opacity={0.72} /></mesh>
        </>
      )}
      <mesh position={[0, 0, -0.08]}><boxGeometry args={[width + 0.05, height + 0.05, 0.08]} /><meshStandardMaterial color="#0d0c0b" roughness={0.92} /></mesh>
      <Text position={[0, -height / 2 - 0.32, 0.14]} maxWidth={width + 0.3} fontSize={0.15} color="#f2ece2" anchorX="center" anchorY="middle">{item.title.toUpperCase()}</Text>
      <Text position={[0, -height / 2 - 0.56, 0.14]} maxWidth={width + 0.3} fontSize={0.095} color="#a9a095" anchorX="center" anchorY="middle" letterSpacing={0.09}>{item.category.toUpperCase()}</Text>
    </group>
  )
}

function ArtworkRoom({ items, anchors, onSelect }: { items: Artwork[]; anchors: AnchorName[]; onSelect: (item: Artwork) => void }) {
  return (
    <group>
      {items.map((item, index) => <Frame key={item.id} item={item} position={anchorPosition(anchors[index])} onSelect={() => onSelect(item)} />)}
      <Text position={[0, 6.65, -10.75]} fontSize={0.13} color="#766d60" letterSpacing={0.18} anchorX="center">FINISHED VISUAL WORK / SELECTED IMAGE</Text>
    </group>
  )
}

function VideoScreen({ item, position, onSelect }: { item: Video; position: [number, number, number]; onSelect: () => void }) {
  return (
    <group position={position} onClick={(event) => { event.stopPropagation(); onSelect() }}>
      <RoundedBox args={[4.5, 2.78, 0.22]} radius={0.06} smoothness={2} castShadow><meshStandardMaterial color="#090a09" roughness={0.28} metalness={0.7} /></RoundedBox>
      <mesh position={[0, 0, 0.13]}><planeGeometry args={[4.18, 2.27]} /><meshStandardMaterial color="#253735" emissive="#507f74" emissiveIntensity={0.28} roughness={0.65} /></mesh>
      <mesh position={[0, 0, 0.145]}><circleGeometry args={[0.3, 32]} /><meshBasicMaterial color="#ebe1d2" /></mesh>
      <Text position={[0.06, 0, 0.15]} fontSize={0.18} color="#151613" anchorX="center" anchorY="middle">▶</Text>
      <Text position={[0, -1.64, 0.15]} maxWidth={4.8} fontSize={0.15} color="#f0e8dd" anchorX="center">{item.title.toUpperCase()}</Text>
      <Text position={[0, -1.88, 0.15]} maxWidth={4.8} fontSize={0.09} color="#aaa39a" anchorX="center" letterSpacing={0.08}>{item.category.toUpperCase()}</Text>
    </group>
  )
}

function FilmRoom({ onSelect }: { onSelect: (item: Video) => void }) {
  return <group>{videos.map((item, index) => <VideoScreen key={item.id} item={item} position={anchorPosition(videoAnchors[index])} onSelect={() => onSelect(item)} />)}<Text position={[0, 6.65, -25.75]} fontSize={0.13} color="#c9b082" letterSpacing={0.18} anchorX="center">FINISHED MOVING IMAGE / SELECTED WORK</Text></group>
}

function Terminal({ item, position, onSelect }: { item: Resource; position: [number, number, number]; onSelect: () => void }) {
  return (
    <group position={position} onClick={(event) => { event.stopPropagation(); onSelect() }}>
      <RoundedBox args={[3.25, 1.82, 0.14]} radius={0.045} smoothness={2} castShadow><meshStandardMaterial color="#1d211f" roughness={0.36} metalness={0.48} /></RoundedBox>
      <mesh position={[0, 0, 0.085]}><planeGeometry args={[2.96, 1.52]} /><meshStandardMaterial color="#263a35" emissive="#599178" emissiveIntensity={0.17} roughness={0.58} /></mesh>
      <Text position={[-1.2, 0.48, 0.1]} maxWidth={2.4} fontSize={0.09} color="#a7d3b8" anchorX="left" letterSpacing={0.07}>AI LAB / {item.type.toUpperCase()}</Text>
      <Text position={[-1.2, 0.1, 0.1]} maxWidth={2.32} fontSize={0.18} color="#efe9df" anchorX="left">{item.title}</Text>
      <Text position={[-1.2, -0.5, 0.1]} maxWidth={2.3} fontSize={0.09} color="#b9c3bb" anchorX="left">{item.status === 'public' ? 'OPEN SYSTEM →' : 'SYSTEM / COMING SOON'}</Text>
      <mesh position={[0, -1.03, -0.3]} castShadow><boxGeometry args={[2.85, 0.17, 1.3]} /><meshStandardMaterial color="#33342f" roughness={0.82} /></mesh>
    </group>
  )
}

function LabRoom({ onSelect }: { onSelect: (item: Resource) => void }) {
  return <group>{tutorials.map((item, index) => <Terminal key={item.id} item={item} position={anchorPosition(labAnchors[index])} onSelect={() => onSelect(item)} />)}<Text position={[0, 6.65, -40.75]} fontSize={0.13} color="#a8c8b4" letterSpacing={0.18} anchorX="center">CREATIVE AI LAB / PRODUCTION SYSTEMS</Text></group>
}

function Lobby() {
  return (
    <group>
      <Float speed={1.1} rotationIntensity={0.025} floatIntensity={0.08}><mesh position={[0, 2.75, 8.15]} rotation={[0.12, 0.32, 0]} castShadow><icosahedronGeometry args={[1.05, 3]} /><meshStandardMaterial color="#3c3025" roughness={0.28} metalness={0.84} /></mesh></Float>
      <Text position={[0, 5.45, 6.7]} fontSize={0.52} color="#f1ebe2" anchorX="center" letterSpacing={0.18}>{site.name}</Text>
      <Text position={[0, 4.78, 6.7]} fontSize={0.1} color="#c69d6d" anchorX="center" letterSpacing={0.22}>AI-FIRST CREATIVE STUDIO / 2026</Text>
      <Text position={[0, 4.3, 6.7]} maxWidth={6.6} textAlign="center" fontSize={0.11} color="#d9cec0" anchorX="center">Creative systems, moving image and visual experiences for modern brands.</Text>
      <Text position={[0, 1.08, 6.7]} fontSize={0.1} color="#e7d8c5" anchorX="center" letterSpacing={0.16}>SCROLL TO BEGIN</Text>
    </group>
  )
}

function ShowroomTexture({ image, width, height }: { image: string; width: number; height: number }) {
  const texture = useTexture(assetUrl(image))
  texture.colorSpace = SRGBColorSpace
  return <mesh position={[0, 0, 0.13]}><planeGeometry args={[width, height]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
}

function ShowroomInstallation({ item, position, index, onSelect }: { item: ShowroomProject; position: [number, number, number]; index: number; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false)
  const width = index === 1 ? 4.48 : 4.25
  const height = index === 1 ? 2.72 : 2.42
  const pedestalHeight = index === 0 ? 0.38 : index === 1 ? 0.18 : 0.58
  return (
    <group position={position} onClick={(event) => { event.stopPropagation(); onSelect() }} onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }} onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}>
      <RoundedBox args={[width + 0.28, height + 0.28, 0.24]} radius={0.055} smoothness={2} castShadow><meshStandardMaterial color="#10110f" emissive={item.accent} emissiveIntensity={hovered ? 0.16 : 0.025} roughness={0.27} metalness={0.74} /></RoundedBox>
      <ShowroomTexture image={item.hero.thumbnail} width={width} height={height} />
      <mesh position={[0, -height / 2 - pedestalHeight / 2 - 0.17, -0.08]} castShadow><boxGeometry args={[width * 0.92, pedestalHeight, 0.72]} /><meshStandardMaterial color="#151411" roughness={0.58} metalness={0.5} /></mesh>
      <mesh position={[0, -height / 2 - pedestalHeight - 0.17, -0.12]}><boxGeometry args={[width * 1.05, 0.06, 0.95]} /><meshStandardMaterial color="#33291f" roughness={0.75} /></mesh>
      <Text position={[-width / 2 + 0.22, height / 2 - 0.3, 0.16]} maxWidth={width - 0.4} fontSize={0.12} color="#fff5e9" anchorX="left" letterSpacing={0.12}>{item.index}</Text>
      <Text position={[-width / 2, -height / 2 - pedestalHeight - 0.48, 0.16]} maxWidth={width} fontSize={0.095} color={item.accent} anchorX="left" letterSpacing={0.12}>{item.sector.toUpperCase()}</Text>
      <Text position={[-width / 2, -height / 2 - pedestalHeight - 0.7, 0.16]} maxWidth={width} fontSize={0.15} color="#f0e8de" anchorX="left">{item.title.toUpperCase()}</Text>
      <Text position={[width / 2, -height / 2 - pedestalHeight - 0.49, 0.16]} maxWidth={width} fontSize={0.08} color="#cabaa8" anchorX="right" letterSpacing={0.09}>{item.status}</Text>
    </group>
  )
}

function ShowroomRoom({ onSelect }: { onSelect: (item: ShowroomProject) => void }) {
  const installations = showroom.filter((item) => item.featured).slice(0, showroomAnchors.length)
  const collection = showroomCollections.find((item) => item.id === installations[0]?.collection)
  return (
    <group>
      {installations.map((item, index) => <ShowroomInstallation key={item.id} item={item} index={index} position={anchorPosition(showroomAnchors[index])} onSelect={() => onSelect(item)} />)}
      <Text position={[0, 6.65, -55.75]} fontSize={0.13} color="#d6b17d" letterSpacing={0.18} anchorX="center">{collection ? `${collection.label.toUpperCase()} / SERIES 001—003` : 'COMMERCIAL SHOWROOM'}</Text>
      {collection && <Text position={[0, 6.28, -55.75]} fontSize={0.1} color="#c8bbae" letterSpacing={0.08} anchorX="center">{collection.subtitle.toUpperCase()}</Text>}
    </group>
  )
}

function ContactRoom() {
  return <group><Text position={[0, 5.8, -68.04]} fontSize={0.12} color="#c3a172" anchorX="center" letterSpacing={0.26}>LET’S WORK</Text><Text position={[0, 4.25, -68.04]} maxWidth={12} textAlign="center" fontSize={0.7} color="#f3ece2" anchorX="center">{site.contact.headline}</Text><Text position={[0, 2.45, -68.04]} fontSize={0.19} color="#cabdae" anchorX="center">{site.contact.email}</Text><Text position={[0, 1.82, -68.04]} fontSize={0.1} color="#b9ac9d" anchorX="center" letterSpacing={0.12}>{site.contact.isPlaceholder ? 'CONFIGURE CONTACT IN src/content/site.ts' : 'CREATE A CAMPAIGN / BUILD A SYSTEM / EXPLORE A POC'}</Text></group>
}

function AnimatedLight({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<Mesh<BufferGeometry, MeshBasicMaterial>>(null)
  useFrame(({ clock }) => { if (ref.current) ref.current.material.opacity = 0.25 + Math.sin(clock.elapsedTime * 0.8 + position[2]) * 0.04 })
  return <mesh ref={ref} position={position}><sphereGeometry args={[0.07, 12, 12]} /><meshBasicMaterial color={color} transparent opacity={0.28} /></mesh>
}

export function MuseumScene({ roomIndex, pointer, reducedMotion, quality, environment, onSelect }: MuseumSceneProps) {
  const useShadows = quality === 'high'
  const architecture = environment === 'glb' ? <EnvironmentBoundary fallback={<LegacyProceduralMuseum />}><MuseumEnvironment quality={quality} /></EnvironmentBoundary> : <LegacyProceduralMuseum />
  return (
    <>
      <color attach="background" args={['#11100e']} />
      <fog attach="fog" args={['#11100e', 11, quality === 'low' ? 34 : 52]} />
      <ambientLight intensity={0.28} color={galleryAmbient} />
      <hemisphereLight args={['#e2d6c4', '#1a1815', 0.55]} />
      <directionalLight position={[5, 12, 13]} intensity={0.8} color="#ffe6c4" castShadow={useShadows} shadow-mapSize={[1024, 1024]} />
      <spotLight position={[0, 7.6, 10]} intensity={13} angle={0.42} penumbra={0.95} distance={17} color="#f5d9b6" castShadow={useShadows} />
      <spotLight position={[-2, 7.3, -5]} intensity={10} angle={0.47} penumbra={1} distance={15} color="#f6dfc0" />
      <spotLight position={[0, 7.2, -20]} intensity={8} angle={0.5} penumbra={1} distance={15} color="#8ab7aa" />
      <spotLight position={[0, 7.2, -35]} intensity={8} angle={0.5} penumbra={1} distance={15} color="#ecd7b9" />
      <spotLight position={[0, 7.2, -50]} intensity={8} angle={0.5} penumbra={1} distance={15} color="#d09a83" />
      <CameraRig roomIndex={roomIndex} pointer={pointer} reducedMotion={reducedMotion} />
      {architecture}
      <Lobby />
      <ArtworkRoom items={images} anchors={imageAnchors} onSelect={(item) => onSelect({ type: 'artwork', item })} />
      <FilmRoom onSelect={(item) => onSelect({ type: 'video', item })} />
      <LabRoom onSelect={(item) => onSelect({ type: 'resource', item })} />
      <ShowroomRoom onSelect={(item) => onSelect({ type: 'showroom', item })} />
      <ContactRoom />
      <AnimatedLight position={[-4.3, 6.7, -10.2]} color="#efca9d" />
      <AnimatedLight position={[0, 6.7, -25.2]} color="#86c6ad" />
      <AnimatedLight position={[4.3, 6.7, -55.2]} color="#d09088" />
    </>
  )
}
