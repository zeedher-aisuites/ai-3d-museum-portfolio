import { AnimatePresence, motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { assetUrl, type Selection } from '../content/types'

type CollectionModalProps = {
  selection: Selection | null
  onClose: () => void
}

export function CollectionModal({ selection, onClose }: CollectionModalProps) {
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
            <button className="modal-close" onClick={onClose} aria-label="Close detail view">×</button>
            {selection.type === 'artwork' && (
              <>
                <div className="modal-visual artwork-visual" style={{ '--accent': selection.item.accent } as CSSProperties}>
                  <img src={assetUrl(selection.item.image)} alt={selection.item.title} />
                </div>
                <div className="modal-copy">
                  <p className="eyebrow">{selection.item.category} / {selection.item.year}</p>
                  <h2>{selection.item.title}</h2>
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
                  ) : <img src={assetUrl(selection.item.poster)} alt="Video poster" />}
                </div>
                <div className="modal-copy">
                  <p className="eyebrow">{selection.item.category} / {selection.item.year}</p>
                  <h2>{selection.item.title}</h2>
                  <p>{selection.item.description}</p>
                  {selection.item.externalUrl && <a className="text-link" href={selection.item.externalUrl} target="_blank" rel="noreferrer">Watch on external site ↗</a>}
                </div>
              </>
            )}
            {selection.type === 'resource' && (
              <div className="modal-copy resource-copy">
                <p className="eyebrow">AI LAB / {selection.item.category}</p>
                <h2>{selection.item.title}</h2>
                <p>{selection.item.description}</p>
                <a className="resource-button" href={selection.item.url} target="_blank" rel="noreferrer">{selection.item.cta} ↗</a>
              </div>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
