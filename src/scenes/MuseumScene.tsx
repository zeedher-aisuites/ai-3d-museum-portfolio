import { Float, RoundedBox, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { BufferGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Vector3 } from 'three'
import { experimental } from '../content/experimental'
import { images } from '../content/images'
import { site } from '../content/site'
import type { Artwork, Resource, Selection, Video } from '../content/types'
import { tutorials } from '../content/tutorials'
import { videos } from '../content/videos'
import type { Quality } from '../utils/quality'

type MuseumSceneProps = {
  roomIndex: number
  pointer: [number, number]
  reducedMotion: boolean
  quality: Quality
  onSelect: (selection: Selection) => void
}

type CameraWaypoint = { position: [number, number, number]; target: [number, number, number] }

const cameraWaypoints: CameraWaypoint[] = [
  { position: [0, 2.25, 17.5], target: [0, 2.15, 8] },
  { position: [0, 2.25, 3.5], target: [0, 2.05, -4] },
  { position: [0, 2.25, -13.2], target: [0, 2.1, -19.4] },
  { position: [0, 2.25, -28.2], target: [0, 2.05, -34.4] },
  { position: [0, 2.25, -43.2], target: [0, 2.1, -49.4] },
  { position: [0, 2.2, -58], target: [0, 2.05, -63] },
]

function CameraRig({ roomIndex, pointer, reducedMotion }: Pick<MuseumSceneProps, 'roomIndex' | 'pointer' | 'reducedMotion'>) {
  const destination = cameraWaypoints[roomIndex]
  const target = useMemo(() => new Vector3(), [])
  const wantedPosition = useMemo(() => new Vector3(), [])

  useFrame(({ camera }, delta) => {
    wantedPosition.set(...destination.position)
    target.set(...destination.target)
    const drift = reducedMotion ? 0 : 0.42
    wantedPosition.x += pointer[0] * drift
    wantedPosition.y += pointer[1] * drift * 0.35
    target.x += pointer[0] * drift * 0.65
    target.y += pointer[1] * drift * 0.22
    const damping = reducedMotion ? 10 : 3.4
    camera.position.lerp(wantedPosition, 1 - Math.exp(-damping * delta))
    camera.lookAt(target)
  })
  return null
}

function RoomShell({ center, name, dark = false }: { center: number; name: string; dark?: boolean }) {
  const wall = dark ? '#171717' : '#272522'
  const floor = dark ? '#10100f' : '#191817'
  return (
    <group>
      <mesh position={[0, -0.08, center]} receiveShadow>
        <boxGeometry args={[14, 0.16, 13.2]} />
        <meshStandardMaterial color={floor} roughness={0.88} metalness={0.08} />
      </mesh>
      <mesh position={[-7, 3, center]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 6, 13.2]} />
        <meshStandardMaterial color={wall} roughness={0.92} />
      </mesh>
      <mesh position={[7, 3, center]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 6, 13.2]} />
        <meshStandardMaterial color={wall} roughness={0.92} />
      </mesh>
      <mesh position={[0, 6, center]}>
        <boxGeometry args={[14, 0.12, 13.2]} />
        <meshStandardMaterial color="#161513" roughness={1} />
      </mesh>
      <Text position={[-6.45, 1.2, center + 5.7]} rotation={[0, Math.PI / 2, 0]} fontSize={0.13} color="#8f887d" anchorX="center" letterSpacing={0.12}>
        {name.toUpperCase()}
      </Text>
    </group>
  )
}

function Column({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <cylinderGeometry args={[0.22, 0.26, 6, 16]} />
      <meshStandardMaterial color="#3c3934" roughness={0.62} metalness={0.38} />
    </mesh>
  )
}

function Frame({ item, position, onSelect, inset = 0 }: { item: Artwork; position: [number, number, number]; onSelect: () => void; inset?: number }) {
  const portrait = item.orientation === 'portrait'
  const square = item.orientation === 'square'
  const width = portrait ? 2.15 : square ? 2.65 : 3.65
  const height = portrait ? 3.35 : square ? 2.65 : 2.2
  const frame = 0.12
  return (
    <group position={position} onClick={(event) => { event.stopPropagation(); onSelect() }}>
      <RoundedBox args={[width + frame * 2, height + frame * 2, 0.15]} radius={0.05} smoothness={2} castShadow>
        <meshStandardMaterial color="#0c0c0b" roughness={0.4} metalness={0.58} />
      </RoundedBox>
      <mesh position={[0, 0, 0.09 + inset]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color={item.accent} />
      </mesh>
      <mesh position={[0, 0.08, 0.105 + inset]}>
        <circleGeometry args={[Math.min(width, height) * 0.255, 40]} />
        <meshBasicMaterial color="#171716" />
      </mesh>
      <mesh position={[0, -height * 0.23, 0.106 + inset]}>
        <planeGeometry args={[width * 0.62, 0.035]} />
        <meshBasicMaterial color="#f1e9dc" transparent opacity={0.75} />
      </mesh>
      <Text position={[0, -height / 2 - 0.28, 0.14]} maxWidth={width + 0.2} fontSize={0.16} color="#ede7dc" anchorX="center" anchorY="middle">
        {item.title.toUpperCase()}
      </Text>
      <Text position={[0, -height / 2 - 0.52, 0.14]} maxWidth={width + 0.2} fontSize={0.1} color="#a7a096" anchorX="center" anchorY="middle" letterSpacing={0.08}>
        {item.category.toUpperCase()}
      </Text>
    </group>
  )
}

function ArtworkRoom({ center, items, onSelect, dark }: { center: number; items: Artwork[]; onSelect: (item: Artwork) => void; dark?: boolean }) {
  const xPositions = items.length === 4 ? [-4.5, -1.5, 1.5, 4.5] : [-3.7, 0, 3.7]
  return (
    <group>
      <RoomShell center={center} name={dark ? 'Experimental Gallery' : 'Image Gallery'} dark={dark} />
      {items.map((item, index) => <Frame key={item.id} item={item} position={[xPositions[index], 3.05, center - 6.25]} inset={0.02} onSelect={() => onSelect(item)} />)}
      <Text position={[0, 5.3, center - 6.2]} fontSize={0.16} color="#c7bfb2" letterSpacing={0.17} anchorX="center">
        {dark ? 'VISUAL STUDIES / 2025—26' : 'SELECTED IMAGE WORK / 2025—26'}
      </Text>
    </group>
  )
}

function VideoScreen({ item, position, onSelect }: { item: Video; position: [number, number, number]; onSelect: () => void }) {
  return (
    <group position={position} onClick={(event) => { event.stopPropagation(); onSelect() }}>
      <RoundedBox args={[3.5, 2.35, 0.18]} radius={0.08} smoothness={3} castShadow>
        <meshStandardMaterial color="#101111" roughness={0.35} metalness={0.55} />
      </RoundedBox>
      <mesh position={[0, 0, 0.105]}>
        <planeGeometry args={[3.22, 1.82]} />
        <meshStandardMaterial color="#292e2e" emissive="#77a69c" emissiveIntensity={0.12} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.116]}>
        <circleGeometry args={[0.28, 32]} />
        <meshBasicMaterial color="#e6dac8" />
      </mesh>
      <Text position={[0.06, 0, 0.13]} fontSize={0.17} color="#111211" anchorX="center" anchorY="middle">▶</Text>
      <Text position={[0, -1.38, 0.13]} maxWidth={3.8} fontSize={0.16} color="#eee6db" anchorX="center">{item.title.toUpperCase()}</Text>
      <Text position={[0, -1.63, 0.13]} maxWidth={3.8} fontSize={0.1} color="#aaa49b" anchorX="center" letterSpacing={0.08}>{item.category.toUpperCase()}</Text>
    </group>
  )
}

function FilmRoom({ onSelect }: { onSelect: (item: Video) => void }) {
  return (
    <group>
      <RoomShell center={-20} name="Moving Image" dark />
      {videos.map((item, index) => <VideoScreen key={item.id} item={item} position={[-4.25 + index * 4.25, 3.1, -26.15]} onSelect={() => onSelect(item)} />)}
      <Text position={[0, 5.25, -26.12]} fontSize={0.16} color="#d7c7aa" letterSpacing={0.17} anchorX="center">MOTION / SELECTED WORK</Text>
    </group>
  )
}

function Terminal({ item, position, onSelect }: { item: Resource; position: [number, number, number]; onSelect: () => void }) {
  return (
    <group position={position} onClick={(event) => { event.stopPropagation(); onSelect() }}>
      <RoundedBox args={[2.65, 1.76, 0.12]} radius={0.05} smoothness={2} castShadow>
        <meshStandardMaterial color="#191c1b" roughness={0.38} metalness={0.52} />
      </RoundedBox>
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[2.35, 1.47]} />
        <meshStandardMaterial color="#26312d" emissive="#89c4a8" emissiveIntensity={0.14} />
      </mesh>
      <Text position={[-0.95, 0.48, 0.09]} maxWidth={2} fontSize={0.1} color="#9dceaf" anchorX="left" letterSpacing={0.08}>AI LAB / {item.category.toUpperCase()}</Text>
      <Text position={[-0.95, 0.1, 0.09]} maxWidth={1.9} fontSize={0.19} color="#ece6dc" anchorX="left">{item.title}</Text>
      <Text position={[-0.95, -0.48, 0.09]} maxWidth={2} fontSize={0.1} color="#b0b7ae" anchorX="left">OPEN RESOURCE →</Text>
      <mesh position={[0, -1.02, -0.22]} castShadow>
        <boxGeometry args={[2.3, 0.18, 1.15]} />
        <meshStandardMaterial color="#33342f" roughness={0.85} />
      </mesh>
    </group>
  )
}

function LabRoom({ onSelect }: { onSelect: (item: Resource) => void }) {
  return (
    <group>
      <RoomShell center={-35} name="Creative AI Laboratory" />
      {tutorials.map((item, index) => <Terminal key={item.id} item={item} position={[-3.4 + (index % 2) * 6.8, index < 2 ? 3.75 : 1.45, -41.15]} onSelect={() => onSelect(item)} />)}
      <Text position={[0, 5.22, -41.12]} fontSize={0.16} color="#c9cdbc" letterSpacing={0.17} anchorX="center">CREATIVE AI LAB / OPEN TERMINALS</Text>
    </group>
  )
}

function Lobby() {
  return (
    <group>
      <RoomShell center={10.8} name="Arrival" />
      <Text position={[0, 3.45, 4.23]} fontSize={1.02} color="#f1ebdf" anchorX="center" letterSpacing={0.08}>{site.name}</Text>
      <Text position={[0, 2.35, 4.23]} fontSize={0.2} color="#c9a77d" anchorX="center" letterSpacing={0.38}>AI MUSEUM / 2026</Text>
      <Text position={[0, 1.55, 4.23]} maxWidth={5.6} textAlign="center" fontSize={0.18} lineHeight={1.45} color="#b8b0a3" anchorX="center">{site.intro}</Text>
      <Text position={[0, 0.64, 4.23]} fontSize={0.12} color="#e5d7c6" anchorX="center" letterSpacing={0.18}>SCROLL TO BEGIN</Text>
      <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.16}>
        <mesh position={[0, 2.75, 7]} rotation={[0.15, 0.4, 0]} castShadow>
          <icosahedronGeometry args={[0.95, 2]} />
          <meshStandardMaterial color="#b99465" roughness={0.25} metalness={0.82} />
        </mesh>
      </Float>
    </group>
  )
}

function ContactRoom() {
  return (
    <group>
      <RoomShell center={-62} name="Contact" dark />
      <mesh position={[0, 2.7, -67.95]} castShadow>
        <boxGeometry args={[10.7, 4, 0.2]} />
        <meshStandardMaterial color="#24201c" roughness={0.77} />
      </mesh>
      <Text position={[0, 4.1, -67.82]} fontSize={0.13} color="#c4a275" anchorX="center" letterSpacing={0.25}>FIN / BEGINNING</Text>
      <Text position={[0, 3.05, -67.82]} maxWidth={9.4} textAlign="center" fontSize={0.58} color="#f1ebe1" anchorX="center">{site.contact.headline}</Text>
      <Text position={[0, 1.9, -67.82]} fontSize={0.2} color="#c3b6a7" anchorX="center">{site.contact.email}</Text>
      <Text position={[0, 1.37, -67.82]} fontSize={0.13} color="#b7ab9d" anchorX="center" letterSpacing={0.13}>INSTAGRAM  /  LINKEDIN</Text>
    </group>
  )
}

function Corridor() {
  const lines = Array.from({ length: 11 }, (_, index) => 3 - index * 7.35)
  return (
    <group>
      <mesh position={[0, -0.16, -25.5]} receiveShadow>
        <boxGeometry args={[5.8, 0.12, 88]} />
        <meshStandardMaterial color="#141311" roughness={0.92} />
      </mesh>
      {lines.map((z) => (
        <mesh key={z} position={[0, 0.02, z]}>
          <boxGeometry args={[0.06, 0.025, 3.5]} />
          <meshBasicMaterial color="#9d805d" transparent opacity={0.42} />
        </mesh>
      ))}
    </group>
  )
}

function AnimatedLight({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<Mesh<BufferGeometry, MeshBasicMaterial>>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = 0.28 + Math.sin(clock.elapsedTime * 1.2 + position[2]) * 0.05
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

export function MuseumScene({ roomIndex, pointer, reducedMotion, quality, onSelect }: MuseumSceneProps) {
  const useShadows = quality !== 'low'
  return (
    <>
      <color attach="background" args={['#0b0b0a']} />
      <fog attach="fog" args={['#0b0b0a', 15, 55]} />
      <ambientLight intensity={0.52} color="#d8c3a7" />
      <hemisphereLight args={['#d9d1c4', '#151412', 0.6]} />
      <directionalLight position={[4, 8, 12]} intensity={1.25} color="#ffe6c2" castShadow={useShadows} shadow-mapSize={[1024, 1024]} />
      <spotLight position={[0, 5.5, 5]} intensity={18} angle={0.56} penumbra={0.9} distance={13} color="#f5d2a4" />
      <spotLight position={[0, 5.5, -9]} intensity={12} angle={0.6} penumbra={1} distance={13} color="#ecd9bc" />
      <spotLight position={[0, 5.5, -24]} intensity={11} angle={0.6} penumbra={1} distance={13} color="#caeadc" />
      <spotLight position={[0, 5.5, -40]} intensity={12} angle={0.6} penumbra={1} distance={13} color="#f2d4b1" />
      <CameraRig roomIndex={roomIndex} pointer={pointer} reducedMotion={reducedMotion} />
      <Corridor />
      <Lobby />
      <ArtworkRoom center={-5} items={images} onSelect={(item) => onSelect({ type: 'artwork', item })} />
      <FilmRoom onSelect={(item) => onSelect({ type: 'video', item })} />
      <LabRoom onSelect={(item) => onSelect({ type: 'resource', item })} />
      <ArtworkRoom center={-50} items={experimental} onSelect={(item) => onSelect({ type: 'artwork', item })} dark />
      <ContactRoom />
      {[-5, -20, -35, -50, -62].flatMap((z) => [
        <Column key={`${z}-left`} position={[-6.55, 3, z + 5.5]} />,
        <Column key={`${z}-right`} position={[6.55, 3, z + 5.5]} />,
      ])}
      <AnimatedLight position={[-2.6, 4.85, -5.5]} color="#f0bf8d" />
      <AnimatedLight position={[2.6, 4.85, -20.5]} color="#a5d2bd" />
      <AnimatedLight position={[0, 4.85, -50.5]} color="#cf7095" />
    </>
  )
}
