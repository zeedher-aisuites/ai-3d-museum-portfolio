import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { ACESFilmicToneMapping } from 'three'
import type { Selection } from '../content/types'
import { assetUrl } from '../content/types'
import type { Quality } from '../utils/quality'
import { qualityDpr } from '../utils/quality'
import { MuseumScene } from './MuseumScene'

type MuseumExperienceProps = {
  roomIndex: number
  pointer: [number, number]
  quality: Quality
  reducedMotion: boolean
  onSelect: (selection: Selection) => void
  onEnvironmentReady?: (usingGlb: boolean) => void
}

export function MuseumExperience({ roomIndex, pointer, quality, reducedMotion, onSelect, onEnvironmentReady }: MuseumExperienceProps) {
  const [environment, setEnvironment] = useState<'checking' | 'glb' | 'procedural'>('checking')

  useEffect(() => {
    let disposed = false
    fetch(assetUrl('models/museum.glb'), { method: 'HEAD' })
      .then((response) => {
        if (!disposed) setEnvironment(response.ok ? 'glb' : 'procedural')
      })
      .catch(() => {
        if (!disposed) setEnvironment('procedural')
      })
    return () => { disposed = true }
  }, [])

  useEffect(() => {
    if (environment !== 'checking') onEnvironmentReady?.(environment === 'glb')
  }, [environment, onEnvironmentReady])

  return (
    <Canvas
      className="museum-canvas"
      dpr={qualityDpr[quality]}
      shadows={quality !== 'low'}
      camera={{ position: [0, 1.72, 17.1], fov: 47, near: 0.1, far: 120 }}
      gl={{ antialias: quality !== 'low', powerPreference: 'high-performance', toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.03 }}
    >
      <Suspense fallback={null}>
        <MuseumScene roomIndex={roomIndex} pointer={pointer} quality={quality} reducedMotion={reducedMotion} environment={environment === 'glb' ? 'glb' : 'procedural'} onSelect={onSelect} />
      </Suspense>
    </Canvas>
  )
}
