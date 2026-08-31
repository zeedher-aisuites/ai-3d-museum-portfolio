import { useGLTF } from '@react-three/drei'
import { useLayoutEffect, useMemo } from 'react'
import type { Mesh } from 'three'
import { MeshStandardMaterial } from 'three'
import { assetUrl } from '../content/types'
import type { Quality } from '../utils/quality'

const museumModelUrl = assetUrl('models/museum.glb')

type MuseumEnvironmentProps = {
  quality: Quality
}

export function MuseumEnvironment({ quality }: MuseumEnvironmentProps) {
  const { scene } = useGLTF(museumModelUrl)
  const environment = useMemo(() => scene.clone(true), [scene])

  useLayoutEffect(() => {
    environment.traverse((node) => {
      const mesh = node as Mesh
      if (!mesh.isMesh) return
      mesh.castShadow = quality === 'high'
      mesh.receiveShadow = quality !== 'low'
      const material = mesh.material
      if (material instanceof MeshStandardMaterial) {
        material.envMapIntensity = quality === 'high' ? 0.75 : 0.42
        material.needsUpdate = true
      }
    })
  }, [environment, quality])

  return <primitive object={environment} />
}

export function ProceduralArchitecture() {
  return (
    <group name="PROCEDURAL_FALLBACK">
      <mesh position={[0, -0.15, -25]} receiveShadow>
        <boxGeometry args={[19, 0.3, 90]} />
        <meshStandardMaterial color="#36302a" roughness={0.7} metalness={0.12} />
      </mesh>
      {[-5, -20, -35, -50, -65].flatMap((z) => [
        <mesh key={`${z}-left`} position={[-8.8, 4.2, z]} receiveShadow>
          <boxGeometry args={[0.35, 8.4, 13]} />
          <meshStandardMaterial color="#d8d0c4" roughness={0.88} />
        </mesh>,
        <mesh key={`${z}-right`} position={[8.8, 4.2, z]} receiveShadow>
          <boxGeometry args={[0.35, 8.4, 13]} />
          <meshStandardMaterial color="#d8d0c4" roughness={0.88} />
        </mesh>,
      ])}
    </group>
  )
}
