import { capabilityIndex, productionPipeline } from '../content/capabilities'
import { CommercialContentWall } from './CommercialContentWall'
import { DemoLab } from './DemoLab'
import { GenerationLab } from './GenerationLab'
import { TalentRoster } from './TalentRoster'
import { images } from '../content/images'
import { projectsForShowroomCollection, showroom, showroomCollections } from '../content/showroom'
import { site } from '../content/site'
import type { Selection } from '../content/types'
import { tutorials } from '../content/tutorials'
import { videos } from '../content/videos'

export function FallbackCollection({ onSelect, onOpenStudy }: { onSelect: (selection: Selection) => void; onOpenStudy: (studyId: string) => void }) {
  return (
    <main className="fallback-collection">
      <header className="fallback-hero">
        <p className="eyebrow">{site.descriptor} / 2026</p>
        <h1>{site.name}</h1>
        <p>{site.intro}</p>
        <p className="fallback-note">This device is showing the accessible collection view.</p>
        <div className="fallback-capability-index" aria-label="What ATELIER builds">{capabilityIndex.map((item) => <span key={item.id}>{item.label}</span>)}</div>
      </header>
      <Collection title="Image Gallery" items={images} onSelect={(item) => onSelect({ type: 'artwork', item })} />
      <section className="fallback-section"><p className="eyebrow">AI Talent</p><h2>Digital casting roster</h2><TalentRoster onSelect={(item) => onSelect({ type: 'talent', item })} /></section>
      <section className="fallback-section"><p className="eyebrow">Commercial Content Systems / Static</p><h2>Static → Motion → Campaign-ready</h2><CommercialContentWall mode="static" reducedMotion onSelect={(item) => onSelect({ type: 'commercial', item })} onOpenStudy={onOpenStudy} /></section>
      <Collection title="Moving Room" items={videos} onSelect={(item) => onSelect({ type: 'video', item })} />
      <section className="fallback-section"><p className="eyebrow">Commercial Content Systems / Motion</p><h2>Motion pairing</h2><CommercialContentWall mode="motion" reducedMotion onSelect={(item) => onSelect({ type: 'commercial', item })} onOpenStudy={onOpenStudy} /></section>
      <Collection title="Creative AI Lab" items={tutorials} onSelect={(item) => onSelect({ type: 'resource', item })} />
      <section className="fallback-section"><GenerationLab onOpenStudy={onOpenStudy} /></section>
      <section className="fallback-section fallback-demo"><DemoLab /></section>
      <section className="fallback-section"><p className="eyebrow">Capabilities / Production Pipeline</p><h2>From idea to production system.</h2><ol className="fallback-pipeline">{productionPipeline.map((step) => <li key={step}>{step}</li>)}</ol></section>
      {showroomCollections.map((collection) => (
        <Collection key={collection.id} title={`${collection.label} / Showroom`} subtitle={collection.subtitle} items={projectsForShowroomCollection(collection.id)} onSelect={(item) => onSelect({ type: 'showroom', item })} />
      ))}
      <footer className="fallback-contact">
        <p className="eyebrow">CONTACT</p>
        <h2>{site.contact.headline}</h2>
        <div className="fallback-contact-routes">{site.contact.routes.map((route) => <a key={route.label} href={`mailto:${site.contact.email}?subject=${encodeURIComponent(route.subject)}`}><b>{route.label}</b><span>{route.description}</span></a>)}</div>
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </footer>
    </main>
  )
}

type Selectable = typeof images[number] | typeof videos[number] | typeof tutorials[number] | typeof showroom[number]

function Collection<T extends Selectable>({ title, subtitle, items, onSelect }: { title: string; subtitle?: string; items: T[]; onSelect: (item: T) => void }) {
  return (
    <section className="fallback-section">
      <p className="eyebrow">COLLECTION</p>
      <h2>{title}</h2>
      {subtitle && <p className="fallback-collection-subtitle">{subtitle}</p>}
      <div className="fallback-grid">
        {items.map((item) => (
          <button key={item.id} className="fallback-card" onClick={() => onSelect(item)}>
            <span>{'category' in item ? item.category : `${item.index} / ${item.collectionLabel} / ${item.status}`}</span>
            <strong>{item.title}</strong>
            <small>{'project' in item ? item.project : 'summary' in item ? item.summary : item.description}</small>
          </button>
        ))}
      </div>
    </section>
  )
}
