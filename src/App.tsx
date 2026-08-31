import { lazy, Suspense, useEffect, useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import { CollectionModal } from './components/CollectionModal'
import { FallbackCollection } from './components/FallbackCollection'
import { LoadingScreen } from './components/LoadingScreen'
import { rooms, site } from './content/site'
import type { Selection } from './content/types'
import { detectQuality, type Quality } from './utils/quality'

const MuseumExperience = lazy(() => import('./scenes/MuseumExperience').then((module) => ({ default: module.MuseumExperience })))

const clampRoom = (value: number) => Math.min(Math.max(value, 0), rooms.length - 1)

const webglSupported = () => {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function App() {
  const [roomIndex, setRoomIndex] = useState(0)
  const [selection, setSelection] = useState<Selection | null>(null)
  const [quality, setQuality] = useState<Quality>(() => detectQuality())
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(12)
  const [pointer, setPointer] = useState<[number, number]>([0, 0])
  const [webgl] = useState(webglSupported)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const touchStart = useRef<number | null>(null)
  const wheelLock = useRef(0)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const debug = new URLSearchParams(window.location.search).get('debug') === 'true'
  const room = rooms[roomIndex]

  useEffect(() => {
    const first = window.setTimeout(() => setProgress(68), 280)
    const second = window.setTimeout(() => setProgress(100), 640)
    const finish = window.setTimeout(() => setLoading(false), 930)
    return () => { window.clearTimeout(first); window.clearTimeout(second); window.clearTimeout(finish) }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selection) {
        if (event.key === 'Escape') setSelection(null)
        return
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'PageDown') setRoomIndex((index) => clampRoom(index + 1))
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'PageUp') setRoomIndex((index) => clampRoom(index - 1))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selection])

  const changeRoom = (direction: number) => setRoomIndex((index) => clampRoom(index + direction))

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (selection || Math.abs(event.deltaY) < 18 || Date.now() - wheelLock.current < 750) return
    wheelLock.current = Date.now()
    changeRoom(event.deltaY > 0 ? 1 : -1)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    setPointer([event.clientX / window.innerWidth * 2 - 1, -(event.clientY / window.innerHeight * 2 - 1)])
  }

  if (!webgl) {
    return <><FallbackCollection onSelect={setSelection} /><CollectionModal selection={selection} onClose={() => setSelection(null)} /></>
  }

  return (
    <main
      className="museum-app"
      onWheel={onWheel}
      onPointerMove={onPointerMove}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientY ?? null }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return
        const distance = touchStart.current - (event.changedTouches[0]?.clientY ?? touchStart.current)
        if (Math.abs(distance) > 36 && !selection) changeRoom(distance > 0 ? 1 : -1)
        touchStart.current = null
      }}
    >
      <Suspense fallback={null}>
        <MuseumExperience roomIndex={roomIndex} pointer={pointer} quality={quality} reducedMotion={reducedMotion} onSelect={setSelection} />
      </Suspense>
      <header className="museum-header">
        <button className="brand" onClick={() => setRoomIndex(0)} aria-label="Return to museum lobby">
          <span>{site.name}</span><small>{site.descriptor}</small>
        </button>
        <div className="room-copy" aria-live="polite">
          <p className="eyebrow">{room.eyebrow}</p>
          <h1>{room.title}</h1>
          <p>{room.subtitle}</p>
        </div>
      </header>
      <nav className="room-nav" aria-label="Museum rooms">
        {rooms.map((item, index) => (
          <button key={item.id} className={index === roomIndex ? 'active' : ''} onClick={() => setRoomIndex(index)} aria-label={`Go to ${item.title}`} aria-current={index === roomIndex ? 'step' : undefined}>
            <span>{String(index).padStart(2, '0')}</span><i />
          </button>
        ))}
      </nav>
      <div className="museum-actions">
        <button onClick={() => setSoundEnabled((value) => !value)} aria-pressed={soundEnabled}>{soundEnabled ? 'Sound on' : 'Enable sound'}</button>
        <label>Quality
          <select value={quality} onChange={(event) => setQuality(event.target.value as Quality)} aria-label="Rendering quality">
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
        </label>
      </div>
      <div className="museum-hint"><span>Scroll</span><span>or use ← →</span></div>
      {debug && <aside className="debug-panel">DEBUG<br />WAYPOINT: {room.id}<br />QUALITY: {quality}<br />ROOM: {roomIndex + 1}/{rooms.length}</aside>}
      <CollectionModal selection={selection} onClose={() => setSelection(null)} />
      <LoadingScreen progress={progress} visible={loading} />
    </main>
  )
}

export default App
