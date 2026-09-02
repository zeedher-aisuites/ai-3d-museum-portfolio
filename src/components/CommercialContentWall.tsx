import { useMemo, useState } from 'react'
import { commercialContent } from '../content/commercial'
import { assetUrl, type CommercialContentCategory, type CommercialContentItem } from '../content/types'

type CommercialContentWallProps = {
  mode: 'static' | 'motion'
  reducedMotion: boolean
  onSelect: (item: CommercialContentItem) => void
  onOpenStudy: (studyId: string) => void
}

const filters: { id: 'all' | CommercialContentCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'drink', label: 'Drink' },
  { id: 'product', label: 'Product' },
  { id: 'ugc', label: 'UGC' },
]

export function CommercialContentWall({ mode, reducedMotion, onSelect, onOpenStudy }: CommercialContentWallProps) {
  const [filter, setFilter] = useState<'all' | CommercialContentCategory>('all')
  const visibleItems = useMemo(() => commercialContent.filter((item) => filter === 'all' || item.category === filter), [filter])

  return (
    <section className={`commercial-content-system${reducedMotion ? ' reduced' : ''}`} aria-label={`Commercial content ${mode}`}>
      <header className="commercial-system-header"><p className="eyebrow">Commercial Content Systems / {mode === 'static' ? 'final visuals' : 'motion direction'}</p><p>{mode === 'static' ? 'Client-facing campaign results. Each image can lead to a prompt, motion brief and review trail.' : 'Motion is a planned extension of the selected final visual — never a fabricated video preview.'}</p></header>
      <nav className="commercial-filter-tabs" aria-label="Filter commercial content">
        {filters.map((item) => <button key={item.id} className={filter === item.id ? 'active' : ''} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id}>{item.label}</button>)}
      </nav>
      {visibleItems.length ? <div className="commercial-wall">
        {visibleItems.map((item) => <article key={item.id} className="commercial-card">
          <button className="commercial-card-media" onClick={() => onSelect(item)} aria-label={`View project: ${item.title}`}>
            <img src={assetUrl(item.hero.src)} alt={item.hero.alt} loading="lazy" />
            <span className="commercial-demo-badge">Synthetic demo</span>
          </button>
          <div className="commercial-card-copy"><p>{item.category} / final visual</p><h3>{item.title}</h3><span>{item.shortDescription}</span><small>{mode === 'motion' ? 'Motion coming with final asset' : 'Prompt and process available'}</small>
            <div className="commercial-card-actions"><button onClick={() => onSelect(item)}>View project</button>{item.studyId && <button onClick={() => { if (item.studyId) onOpenStudy(item.studyId) }}>Open process</button>}</div>
          </div>
        </article>)}
      </div> : <div className="content-empty-state"><p className="eyebrow">{filter} / library status</p><strong>Collection in development.</strong><p>This view is ready for approved work; the current public demo set is food.</p></div>}
    </section>
  )
}
