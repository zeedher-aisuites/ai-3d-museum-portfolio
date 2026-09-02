import { lazy, Suspense, useEffect, useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import { CollectionModal } from './components/CollectionModal'
import { FallbackCollection } from './components/FallbackCollection'
import { LoadingScreen } from './components/LoadingScreen'
import { ArrivalLayer, ImageLayer, LabLayer, MotionLayer } from './components/StudioLayers'
import { projectsForShowroomCollection, showroomCollections } from './content/showroom'
import { rooms, site } from './content/site'
import type { RoomId, Selection } from './content/types'
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
  const [showroomCollectionId, setShowroomCollectionId] = useState(showroomCollections[0]?.id ?? '')
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
  const activeShowroomCollection = showroomCollections.find((collection) => collection.id === showroomCollectionId) ?? showroomCollections[0]
  const activeShowroomProjects = activeShowroomCollection ? projectsForShowroomCollection(activeShowroomCollection.id) : []

  useEffect(() => {
    const first = window.setTimeout(() => setProgress(52), 260)
    const second = window.setTimeout(() => setProgress(78), 650)
    return () => { window.clearTimeout(first); window.clearTimeout(second) }
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

  const navigateToRoom = (roomId: RoomId, collectionId?: string) => {
    const nextIndex = rooms.findIndex((item) => item.id === roomId)
    if (nextIndex >= 0) setRoomIndex(nextIndex)
    if (collectionId) setShowroomCollectionId(collectionId)
    setSelection(null)
  }

  const selectShowroomCollection = (collectionId: string) => {
    setSelection(null)
    setShowroomCollectionId(collectionId)
  }

  const selectShowroomProject = (project: Extract<Selection, { type: 'showroom' }>['item']) => {
    setShowroomCollectionId(project.collection)
    setSelection({ type: 'showroom', item: project })
  }

  const selectMuseumItem = (nextSelection: Selection) => {
    if (nextSelection.type === 'showroom') setShowroomCollectionId(nextSelection.item.collection)
    setSelection(nextSelection)
  }

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
        <MuseumExperience roomIndex={roomIndex} pointer={pointer} quality={quality} reducedMotion={reducedMotion} onSelect={selectMuseumItem} onEnvironmentReady={() => {
          setProgress(100)
          window.setTimeout(() => setLoading(false), 260)
        }} />
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
      {room.id === 'contact' && (
        <aside className="contact-actions" aria-label="Collaboration routes">
          {site.contact.routes.map((route) => (
            <a key={route.label} href={`mailto:${site.contact.email}?subject=${encodeURIComponent(route.subject)}`}><b>{route.label}</b><span>{route.description}</span></a>
          ))}
          {site.contact.isPlaceholder && <small>Replace contact details in src/content/site.ts</small>}
        </aside>
      )}
      {room.id === 'showroom' && (
        <aside className="showroom-collection-panel" aria-label="Showroom collections">
          <p className="eyebrow">Showroom / Collections</p>
          <nav className="showroom-collection-tabs" aria-label="Choose a showroom collection">
            {showroomCollections.map((collection) => (
              <button key={collection.id} className={collection.id === activeShowroomCollection?.id ? 'active' : ''} onClick={() => selectShowroomCollection(collection.id)} aria-pressed={collection.id === activeShowroomCollection?.id}>
                {collection.label}
              </button>
            ))}
          </nav>
          {activeShowroomCollection && <p className="showroom-collection-subtitle">{activeShowroomCollection.subtitle}</p>}
          {activeShowroomProjects.length > 0 ? <div className="showroom-collection-projects">
            {activeShowroomProjects.map((project) => (
              <button key={project.id} onClick={() => selectShowroomProject(project)} aria-label={`Open ${project.collectionLabel} concept ${project.index}: ${project.title}`}>
                <b>{project.index}</b><span>{project.title}</span>
              </button>
            ))}
          </div> : activeShowroomCollection?.emptyState && <div className="showroom-empty-state"><b>{activeShowroomCollection.emptyState.heading}</b><span>{activeShowroomCollection.emptyState.description}</span></div>}
        </aside>
      )}
      {room.id === 'lobby' && <ArrivalLayer onNavigate={navigateToRoom} onSelect={selectMuseumItem} />}
      {room.id === 'gallery' && <ImageLayer reducedMotion={reducedMotion} onSelect={selectMuseumItem} />}
      {room.id === 'films' && <MotionLayer reducedMotion={reducedMotion} onSelect={selectMuseumItem} />}
      {room.id === 'lab' && <LabLayer />}
      {debug && <aside className="debug-panel">DEBUG<br />WAYPOINT: {room.id}<br />QUALITY: {quality}<br />ROOM: {roomIndex + 1}/{rooms.length}</aside>}
      <CollectionModal selection={selection} onClose={() => setSelection(null)} onNavigateShowroom={selectShowroomProject} />
      <LoadingScreen progress={progress} visible={loading} />
    </main>
  )
}

export default App
