import { experimental } from '../content/experimental'
import { images } from '../content/images'
import { site } from '../content/site'
import type { Selection } from '../content/types'
import { tutorials } from '../content/tutorials'
import { videos } from '../content/videos'

export function FallbackCollection({ onSelect }: { onSelect: (selection: Selection) => void }) {
  return (
    <main className="fallback-collection">
      <header className="fallback-hero">
        <p className="eyebrow">{site.descriptor} / 2026</p>
        <h1>{site.name}</h1>
        <p>{site.intro}</p>
        <p className="fallback-note">This device is showing the accessible collection view.</p>
      </header>
      <Collection title="Image Gallery" items={images} onSelect={(item) => onSelect({ type: 'artwork', item })} />
      <Collection title="Moving Room" items={videos} onSelect={(item) => onSelect({ type: 'video', item })} />
      <Collection title="Creative AI Lab" items={tutorials} onSelect={(item) => onSelect({ type: 'resource', item })} />
      <Collection title="Experimental Gallery" items={experimental} onSelect={(item) => onSelect({ type: 'artwork', item })} />
      <footer className="fallback-contact">
        <p className="eyebrow">CONTACT</p>
        <h2>{site.contact.headline}</h2>
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </footer>
    </main>
  )
}

type Selectable = typeof images[number] | typeof videos[number] | typeof tutorials[number]

function Collection<T extends Selectable>({ title, items, onSelect }: { title: string; items: T[]; onSelect: (item: T) => void }) {
  return (
    <section className="fallback-section">
      <p className="eyebrow">COLLECTION</p>
      <h2>{title}</h2>
      <div className="fallback-grid">
        {items.map((item) => (
          <button key={item.id} className="fallback-card" onClick={() => onSelect(item)}>
            <span>{item.category}</span>
            <strong>{item.title}</strong>
            <small>{'project' in item ? item.project : item.description}</small>
          </button>
        ))}
      </div>
    </section>
  )
}
