import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, type CSSProperties } from 'react'
import { projectsForShowroomCollection } from '../content/showroom'
import { assetUrl, type Selection, type ShowroomProject } from '../content/types'

type CollectionModalProps = {
  selection: Selection | null
  onClose: () => void
  onNavigateShowroom?: (project: ShowroomProject) => void
}

const mediaUrl = (url: string) => /^(https?:)?\/\//.test(url) ? url : assetUrl(url)

export function CollectionModal({ selection, onClose, onNavigateShowroom }: CollectionModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const activeShowroom = selection?.type === 'showroom' ? selection.item : null
  const showroomSeries = activeShowroom ? projectsForShowroomCollection(activeShowroom.collection) : []
  const activeShowroomIndex = activeShowroom ? showroomSeries.findIndex((project) => project.id === activeShowroom.id) : -1

  const navigateShowroom = (direction: number) => {
    if (!activeShowroom || !onNavigateShowroom || showroomSeries.length < 2) return
    const nextIndex = (activeShowroomIndex + direction + showroomSeries.length) % showroomSeries.length
    onNavigateShowroom(showroomSeries[nextIndex])
  }

  useEffect(() => {
    if (selection) window.requestAnimationFrame(() => closeRef.current?.focus())
  }, [selection])

  return (
    <AnimatePresence>
      {selection && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose} role="presentation">
          <motion.section
            className="collection-modal"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.2, 0.75, 0.25, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selection.item.title}
          >
            <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close detail view">×</button>
            {selection.type === 'artwork' && (
              <>
                <div className="modal-visual artwork-visual" style={{ '--accent': selection.item.accent } as CSSProperties}>
                  <img src={assetUrl(selection.item.image)} alt={selection.item.title} />
                </div>
                <div className="modal-copy">
                  <p className="eyebrow">{selection.item.category} / {selection.item.year}</p>
                  <h2>{selection.item.title}</h2>
                  {selection.item.subtitle && <p className="project-name">{selection.item.subtitle}</p>}
                  <p className="project-name">{selection.item.project}</p>
                  <p>{selection.item.description}</p>
                  <div className="tool-list">{selection.item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                </div>
              </>
            )}
            {selection.type === 'video' && (
              <>
                <div className="modal-visual video-visual">
                  {selection.item.youtubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selection.item.youtubeId}?rel=0`}
                      title={selection.item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : selection.item.videoUrl ? <video controls preload="metadata" poster={assetUrl(selection.item.thumbnail)}><source src={mediaUrl(selection.item.videoUrl)} /></video> : <img src={assetUrl(selection.item.thumbnail)} alt={`${selection.item.title} placeholder`} />}
                </div>
                <div className="modal-copy">
                  <p className="eyebrow">{selection.item.category} / {selection.item.year}{selection.item.duration ? ` / ${selection.item.duration}` : ''}</p>
                  <h2>{selection.item.title}</h2>
                  {selection.item.subtitle && <p className="project-name">{selection.item.subtitle}</p>}
                  <p>{selection.item.description}</p>
                  {!selection.item.youtubeId && !selection.item.videoUrl && <p className="modal-note">Moving-image master coming soon.</p>}
                </div>
              </>
            )}
            {selection.type === 'resource' && (
              <div className="modal-copy resource-copy">
                <p className="eyebrow">AI LAB / {selection.item.type} / {selection.item.status.replace('-', ' ')}</p>
                <h2>{selection.item.title}</h2>
                <p>{selection.item.summary}</p>
                {selection.item.url ? <a className="resource-button" href={selection.item.url} target="_blank" rel="noreferrer">Open resource ↗</a> : <p className="modal-note">This system is being prepared for a public breakdown.</p>}
              </div>
            )}
            {selection.type === 'showroom' && (
              <>
                <div className="modal-visual showroom-visual">
                  {selection.item.hero.youtubeId ? <iframe key={selection.item.id} src={`https://www.youtube-nocookie.com/embed/${selection.item.hero.youtubeId}?playsinline=1&rel=0`} title={selection.item.title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : selection.item.hero.videoUrl ? <video key={selection.item.id} controls playsInline preload="metadata" poster={assetUrl(selection.item.hero.thumbnail)}><source src={mediaUrl(selection.item.hero.videoUrl)} /></video> : <img src={assetUrl(selection.item.hero.thumbnail)} alt={`${selection.item.sector} POC placeholder`} />}
                </div>
                <div className="modal-copy showroom-copy">
                  <p className="eyebrow">{selection.item.index} / {String(showroomSeries.length).padStart(3, '0')} / {selection.item.collectionLabel} / {selection.item.status}{selection.item.hero.duration ? ` / ${selection.item.hero.duration}` : ''}</p>
                  <h2>{selection.item.title}</h2>
                  <p className="project-name">{selection.item.conceptLine}</p>
                  <p>{selection.item.description}</p>
                  {selection.item.extendedDescription && <p className="showroom-extended">{selection.item.extendedDescription}</p>}
                  <div className="showroom-detail"><span>Creative territory</span><div className="tool-list">{selection.item.territories.map((item) => <i key={item}>{item}</i>)}</div></div>
                  <div className="showroom-detail"><span>Capabilities</span><div className="tool-list">{selection.item.capabilities.map((item) => <i key={item}>{item}</i>)}</div></div>
                  <div className="showroom-detail"><span>Applications</span><div className="tool-list">{selection.item.applications.map((item) => <i key={item}>{item}</i>)}</div></div>
                  <div className="showroom-modal-actions">
                    {selection.item.watchUrl && <a className="text-link" href={selection.item.watchUrl} target="_blank" rel="noreferrer">Watch film on YouTube ↗</a>}
                    {showroomSeries.length > 1 && <nav className="showroom-series-nav" aria-label={`${selection.item.collectionLabel} collection navigation`}>
                      <button onClick={() => navigateShowroom(-1)} aria-label={`Previous ${selection.item.collectionLabel} concept`}>← Previous</button>
                      <button onClick={() => navigateShowroom(1)} aria-label={`Next ${selection.item.collectionLabel} concept`}>Next →</button>
                    </nav>}
                  </div>
                </div>
              </>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
