import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import type { Selection } from '../content/types'
import type { Quality } from '../utils/quality'
import { qualityDpr } from '../utils/quality'
import { MuseumScene } from './MuseumScene'

type MuseumExperienceProps = {
  roomIndex: number
  pointer: [number, number]
  quality: Quality
  reducedMotion: boolean
  onSelect: (selection: Selection) => void
}

export function MuseumExperience({ roomIndex, pointer, quality, reducedMotion, onSelect }: MuseumExperienceProps) {
  return (
    <Canvas
      className="museum-canvas"
      dpr={qualityDpr[quality]}
      shadows={quality !== 'low'}
      camera={{ position: [0, 2.25, 17.5], fov: 51, near: 0.1, far: 120 }}
      gl={{ antialias: quality !== 'low', powerPreference: 'high-performance', toneMappingExposure: 1.05 }}
    >
      <Suspense fallback={null}>
        <MuseumScene roomIndex={roomIndex} pointer={pointer} quality={quality} reducedMotion={reducedMotion} onSelect={onSelect} />
      </Suspense>
    </Canvas>
  )
}
