import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, type CSSProperties } from 'react'
import { assetUrl, type Selection } from '../content/types'

type CollectionModalProps = {
  selection: Selection | null
  onClose: () => void
}

const mediaUrl = (url: string) => /^(https?:)?\/\//.test(url) ? url : assetUrl(url)

export function CollectionModal({ selection, onClose }: CollectionModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

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
                  {selection.item.hero.youtubeId ? <iframe src={`https://www.youtube-nocookie.com/embed/${selection.item.hero.youtubeId}?rel=0`} title={selection.item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : selection.item.hero.videoUrl ? <video controls preload="metadata" poster={assetUrl(selection.item.hero.thumbnail)}><source src={mediaUrl(selection.item.hero.videoUrl)} /></video> : <img src={assetUrl(selection.item.hero.thumbnail)} alt={`${selection.item.sector} POC placeholder`} />}
                </div>
                <div className="modal-copy showroom-copy">
                  <p className="eyebrow">{selection.item.sector} / ATELIER {selection.item.status}{selection.item.hero.duration ? ` / ${selection.item.hero.duration}` : ''}</p>
                  <h2>{selection.item.title}</h2>
                  <p className="project-name">{selection.item.tagline}</p>
                  <p>{selection.item.description}</p>
                  <div className="showroom-detail"><span>Objective</span><p>{selection.item.objective}</p></div>
                  <div className="showroom-detail"><span>Applications</span><div className="tool-list">{selection.item.applications.map((item) => <i key={item}>{item}</i>)}</div></div>
                  <div className="showroom-detail"><span>Deliverables</span><ul>{selection.item.deliverables.map((item) => <li key={item.label}>{item.label}{item.format ? <em>{item.format}</em> : null}</li>)}</ul></div>
                  <div className="showroom-detail"><span>Scale</span><div className="tool-list">{selection.item.scalability.map((item) => <i key={item}>{item}</i>)}</div></div>
                </div>
              </>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
