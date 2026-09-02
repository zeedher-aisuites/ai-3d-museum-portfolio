import { useState } from 'react'
import { capabilityIndex, productionPipeline } from '../content/capabilities'
import { latestHighlights } from '../content/latest'
import { images } from '../content/images'
import { videos } from '../content/videos'
import type { RoomId, Selection } from '../content/types'
import { CommercialContentWall } from './CommercialContentWall'
import { DemoLab } from './DemoLab'
import { TalentRoster } from './TalentRoster'

type Navigate = (room: RoomId, collection?: string) => void

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
          {latestHighlights.map((item) => <button key={item.id} onClick={() => { onNavigate(item.room, item.selection.type === 'showroom' ? item.selection.item.collection : undefined); onSelect(item.selection) }}><span>{item.label}</span><b>{item.selection.type === 'talent' ? item.selection.item.name : item.selection.item.title}</b></button>)}
        </div>
      </section>
    </aside>
  )
}

function LayerTabs<T extends string>({ active, items, onChange }: { active: T; items: { id: T; label: string }[]; onChange: (id: T) => void }) {
  return <nav className="studio-layer-tabs" aria-label="Content view">{items.map((item) => <button key={item.id} className={active === item.id ? 'active' : ''} aria-pressed={active === item.id} onClick={() => onChange(item.id)}>{item.label}</button>)}</nav>
}

function MinimalProjectList({ items, onSelect, label }: { items: typeof images | typeof videos; onSelect: (selection: Selection) => void; label: string }) {
  return <div className="minimal-project-list" aria-label={label}>{items.map((item) => <button key={item.id} onClick={() => onSelect('image' in item ? { type: 'artwork', item } : { type: 'video', item })}><span>{item.category}</span><b>{item.title}</b></button>)}</div>
}

export function ImageLayer({ reducedMotion, onSelect }: { reducedMotion: boolean; onSelect: (selection: Selection) => void }) {
  const [view, setView] = useState<'selected' | 'talent' | 'systems'>('selected')
  return <aside className="studio-layer room-program-layer" aria-label="Image room programmes">
    <LayerTabs active={view} onChange={setView} items={[{ id: 'selected', label: 'Selected Work' }, { id: 'talent', label: 'AI Talent' }, { id: 'systems', label: 'Content Systems' }]} />
    {view === 'selected' && <MinimalProjectList items={images} label="Selected image work" onSelect={onSelect} />}
    {view === 'talent' && <TalentRoster onSelect={(item) => onSelect({ type: 'talent', item })} />}
    {view === 'systems' && <CommercialContentWall mode="static" reducedMotion={reducedMotion} onSelect={(item) => onSelect({ type: 'commercial', item })} />}
  </aside>
}

export function MotionLayer({ reducedMotion, onSelect }: { reducedMotion: boolean; onSelect: (selection: Selection) => void }) {
  const [view, setView] = useState<'selected' | 'systems'>('selected')
  return <aside className="studio-layer room-program-layer" aria-label="Motion room programmes">
    <LayerTabs active={view} onChange={setView} items={[{ id: 'selected', label: 'Selected Motion' }, { id: 'systems', label: 'Content Systems' }]} />
    {view === 'selected' && <MinimalProjectList items={videos} label="Selected motion work" onSelect={onSelect} />}
    {view === 'systems' && <CommercialContentWall mode="motion" reducedMotion={reducedMotion} onSelect={(item) => onSelect({ type: 'commercial', item })} />}
  </aside>
}

export function LabLayer() {
  const [view, setView] = useState<'demo' | 'pipeline'>('demo')
  return <aside className="studio-layer lab-program-layer" aria-label="AI lab programmes">
    <LayerTabs active={view} onChange={setView} items={[{ id: 'demo', label: 'AI Demo Lab' }, { id: 'pipeline', label: 'Production Pipeline' }]} />
    {view === 'demo' ? <DemoLab /> : <section className="pipeline-panel"><p className="eyebrow">Capabilities / Production pipeline</p><h2>From idea to production system.</h2><ol>{productionPipeline.map((step) => <li key={step}>{step}</li>)}</ol></section>}
  </aside>
}
