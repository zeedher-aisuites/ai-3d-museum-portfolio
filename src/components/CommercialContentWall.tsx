import { useMemo, useState } from 'react'
import { commercialContent } from '../content/commercial'
import { assetUrl, type CommercialContentCategory, type CommercialContentItem } from '../content/types'

type CommercialContentWallProps = {
  reducedMotion: boolean
  onSelect: (item: CommercialContentItem) => void
  onOpenStudy: (studyId: string) => void
}

// Only the categories that actually have content. Drink, product and UGC
// have no items yet, so they are not offered as filters.
const filters: { id: 'all' | CommercialContentCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
]

export function CommercialContentWall({ reducedMotion, onSelect, onOpenStudy }: CommercialContentWallProps) {
  const [filter, setFilter] = useState<'all' | CommercialContentCategory>('all')
  const visibleItems = useMemo(() => commercialContent.filter((item) => filter === 'all' || item.category === filter), [filter])

  return (
    <section className={`commercial-content-system${reducedMotion ? ' reduced' : ''}`} aria-label="Commercial content">
      <header className="commercial-system-header"><p className="eyebrow">Commercial Content Systems / final visuals</p><p>Client-facing campaign results. Each image can lead to a prompt and review trail.</p></header>
      <nav className="commercial-filter-tabs" aria-label="Filter commercial content">
        {filters.map((item) => <button key={item.id} className={filter === item.id ? 'active' : ''} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id}>{item.label}</button>)}
      </nav>
      <div className="commercial-wall">
        {visibleItems.map((item) => <article key={item.id} className="commercial-card">
          <button className="commercial-card-media" onClick={() => onSelect(item)} aria-label={`View project: ${item.title}`}>
            <img src={assetUrl(item.hero.src)} alt={item.hero.alt} loading="lazy" />
            <span className="commercial-demo-badge">Synthetic demo</span>
          </button>
          <div className="commercial-card-copy"><p>{item.category} / final visual</p><h3>{item.title}</h3><span>{item.shortDescription}</span><small>Prompt and process available</small>
            <div className="commercial-card-actions"><button onClick={() => onSelect(item)}>View project</button>{item.studyId && <button onClick={() => { if (item.studyId) onOpenStudy(item.studyId) }}>Open process</button>}</div>
          </div>
        </article>)}
      </div>
    </section>
  )
}
