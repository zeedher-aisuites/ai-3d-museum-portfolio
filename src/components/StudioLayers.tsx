import { useState } from 'react'
import { capabilityIndex, productionPipeline } from '../content/capabilities'
import { latestHighlights } from '../content/latest'
import { images } from '../content/images'
import { showroom } from '../content/showroom'
import { videos } from '../content/videos'
import { assetUrl, type RoomId, type Selection } from '../content/types'
import { CommercialContentWall } from './CommercialContentWall'
import { GenerationLab } from './GenerationLab'

type Navigate = (room: RoomId, collection?: string) => void

function latestImage(selection: Selection): string | null {
  switch (selection.type) {
    case 'showroom': return selection.item.hero.thumbnail
    case 'video': return selection.item.thumbnail
    case 'artwork': return selection.item.image
    case 'commercial': return selection.item.hero.src
    default: return null
  }
}

export function ArrivalLayer({ onNavigate, onSelect }: { onNavigate: Navigate; onSelect: (selection: Selection) => void }) {
  return (
    <aside className="studio-layer arrival-layer" aria-label="What ATELIER builds now">
      <section>
        <p className="eyebrow">What we build</p>
        <nav className="capability-index" aria-label="ATELIER capabilities">
          {capabilityIndex.map((item) => <button key={item.id} onClick={() => onNavigate(item.room, item.collection)}>{item.label}</button>)}
        </nav>
      </section>
      <section className="latest-panel">
        <p className="eyebrow">Now shipping</p>
        <div>
          {latestHighlights.map((item) => {
            const image = latestImage(item.selection)
            return <button key={item.id} onClick={() => { onNavigate(item.room, item.selection.type === 'showroom' ? item.selection.item.collection : undefined); onSelect(item.selection) }}>
              {image && <img className="latest-thumb" src={assetUrl(image)} alt="" loading="lazy" />}
              <span className="latest-copy"><span>{item.label}</span><b>{item.selection.type === 'talent' ? item.selection.item.name : item.selection.item.title}</b></span>
            </button>
          })}
        </div>
      </section>
    </aside>
  )
}

function LayerTabs<T extends string>({ active, items, onChange }: { active: T; items: { id: T; label: string }[]; onChange: (id: T) => void }) {
  return <nav className="studio-layer-tabs" aria-label="Content view">{items.map((item) => <button key={item.id} className={active === item.id ? 'active' : ''} aria-pressed={active === item.id} onClick={() => onChange(item.id)}>{item.label}</button>)}</nav>
}

function MinimalProjectList({ items, onSelect, label }: { items: typeof images | typeof videos; onSelect: (selection: Selection) => void; label: string }) {
  return <div className="minimal-project-list" aria-label={label}>{items.map((item) => {
    const thumb = 'image' in item ? item.image : item.thumbnail
    return <button key={item.id} onClick={() => onSelect('image' in item ? { type: 'artwork', item } : { type: 'video', item })}>
      <img className="minimal-project-thumb" src={assetUrl(thumb)} alt="" loading="lazy" />
      <span className="minimal-project-copy"><span>{item.category}</span><b>{item.title}</b>{item.subtitle && <small>{item.subtitle}</small>}</span>
    </button>
  })}</div>
}

export function ImageLayer({ reducedMotion, onSelect, onOpenStudy }: { reducedMotion: boolean; onSelect: (selection: Selection) => void; onOpenStudy: (studyId: string) => void }) {
  const [view, setView] = useState<'selected' | 'systems'>('selected')
  return <aside className="studio-layer room-program-layer" aria-label="Image room programmes">
    <LayerTabs active={view} onChange={setView} items={[{ id: 'selected', label: 'Selected Work' }, { id: 'systems', label: 'Content Systems' }]} />
    {view === 'selected' && <MinimalProjectList items={images} label="Selected image work" onSelect={onSelect} />}
    {view === 'systems' && <CommercialContentWall reducedMotion={reducedMotion} onSelect={(item) => onSelect({ type: 'commercial', item })} onOpenStudy={onOpenStudy} />}
  </aside>
}

function ShowroomFilmList({ onSelect }: { onSelect: (selection: Selection) => void }) {
  return <div className="minimal-project-list" aria-label="Showroom films">{showroom.map((item) => (
    <button key={item.id} onClick={() => onSelect({ type: 'showroom', item })}>
      <img className="minimal-project-thumb" src={assetUrl(item.hero.thumbnail)} alt="" loading="lazy" />
      <span className="minimal-project-copy"><span>{item.collectionLabel}</span><b>{item.title}</b>{item.conceptLine && <small>{item.conceptLine}</small>}</span>
    </button>
  ))}</div>
}

export function MotionLayer({ onSelect }: { onSelect: (selection: Selection) => void }) {
  return <aside className="studio-layer room-program-layer" aria-label="Motion room programmes">
    <MinimalProjectList items={videos} label="Selected motion work" onSelect={onSelect} />
    <ShowroomFilmList onSelect={onSelect} />
  </aside>
}

export function LabLayer({ onOpenStudy }: { onOpenStudy: (studyId: string) => void }) {
  const [view, setView] = useState<'pipeline' | 'generation'>('generation')
  return <aside className="studio-layer lab-program-layer" aria-label="AI lab programmes">
    <LayerTabs active={view} onChange={setView} items={[{ id: 'pipeline', label: 'How We Build' }, { id: 'generation', label: 'Generation Lab' }]} />
    {view === 'generation' ? <GenerationLab onOpenStudy={onOpenStudy} /> : <section className="pipeline-panel"><p className="eyebrow">Capabilities / Production pipeline</p><h2>From idea to production system.</h2><ol>{productionPipeline.map((step) => <li key={step}>{step}</li>)}</ol></section>}
  </aside>
}
