import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, type CSSProperties } from 'react'
import { projectsForShowroomCollection } from '../content/showroom'
import { assetUrl, type ProjectBreakdown, type Selection, type ShowroomProject } from '../content/types'

type CollectionModalProps = {
  selection: Selection | null
  onClose: () => void
  onNavigateShowroom?: (project: ShowroomProject) => void
}

const mediaUrl = (url: string) => /^(https?:)?\/\//.test(url) ? url : assetUrl(url)

function Breakdown({ item }: { item: ProjectBreakdown }) {
  return <div className="showroom-breakdown">
    {item.challenge && <div><span>Brief</span><p>{item.challenge}</p></div>}
    {item.approach && <div><span>Direction</span><p>{item.approach}</p></div>}
    {item.process && <div><span>Process</span><ol>{item.process.map((step) => <li key={step}>{step}</li>)}</ol></div>}
    {item.result && <div><span>Final</span><p>{item.result}</p></div>}
    {item.tools && <div><span>Tools</span><div className="tool-list">{item.tools.map((tool) => <i key={tool}>{tool}</i>)}</div></div>}
    {item.referenceImages && <div><span>Visual development</span><div className="breakdown-image-grid">{item.referenceImages.map((image) => <img key={image} src={assetUrl(image)} alt="Project visual development" loading="lazy" />)}</div></div>}
    {item.behindTheScenes && <div><span>Behind the scenes</span><div className="breakdown-image-grid">{item.behindTheScenes.map((image) => <img key={image} src={assetUrl(image)} alt="Project behind the scenes" loading="lazy" />)}</div></div>}
  </div>
}

export function CollectionModal({ selection, onClose, onNavigateShowroom }: CollectionModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const selectionTitle = selection?.type === 'talent' ? selection.item.name : selection?.item.title
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
            aria-label={selectionTitle}
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
                  {selection.item.breakdown && <Breakdown item={selection.item.breakdown} />}
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
                  {selection.item.breakdown && <Breakdown item={selection.item.breakdown} />}
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
            {selection.type === 'talent' && (
              <>
                <div className="modal-visual talent-visual"><img src={assetUrl(selection.item.hero)} alt={selection.item.name} /></div>
                <div className="modal-copy">
                  <p className="eyebrow">AI Talent / {selection.item.status || 'casting roster'}</p>
                  <h2>{selection.item.name}</h2>
                  {selection.item.archetype && <p className="project-name">{selection.item.archetype}</p>}
                  {selection.item.shortDescription && <p>{selection.item.shortDescription}</p>}
                  <div className="showroom-detail"><span>Capabilities</span><div className="tool-list">{selection.item.capabilities.map((item) => <i key={item}>{item}</i>)}</div></div>
                  {selection.item.voiceAvailable !== undefined && <p className="modal-note">Voice {selection.item.voiceAvailable ? 'available for development.' : 'not configured yet.'}</p>}
                  {selection.item.personality && <p className="showroom-extended">{selection.item.personality}</p>}
                  {selection.item.additionalImages && <div className="breakdown-image-grid">{selection.item.additionalImages.map((image) => <img key={image} src={assetUrl(image)} alt={`${selection.item.name} detail`} loading="lazy" />)}</div>}
                  {selection.item.youtubeId ? <iframe className="talent-media" src={`https://www.youtube-nocookie.com/embed/${selection.item.youtubeId}?playsinline=1&rel=0`} title={`${selection.item.name} motion`} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : selection.item.videoUrl ? <video className="talent-media" controls playsInline preload="metadata"><source src={mediaUrl(selection.item.videoUrl)} /></video> : null}
                </div>
              </>
            )}
            {selection.type === 'commercial' && (
              <>
                <div className="modal-visual video-visual">
                  {selection.item.youtubeId ? <iframe src={`https://www.youtube-nocookie.com/embed/${selection.item.youtubeId}?playsinline=1&rel=0`} title={selection.item.title || 'Commercial content concept'} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : selection.item.videoUrl ? <video controls playsInline preload="metadata" poster={assetUrl(selection.item.poster)}><source src={mediaUrl(selection.item.videoUrl)} /></video> : <img src={assetUrl(selection.item.poster)} alt={selection.item.title || `${selection.item.category} commercial concept`} />}
                </div>
                <div className="modal-copy">
                  <p className="eyebrow">Commercial content system / {selection.item.category}{selection.item.duration ? ` / ${selection.item.duration}` : ''}</p>
                  <h2>{selection.item.title || 'Campaign-ready content concept'}</h2>
                  <p>One paired production record for static, motion and campaign-ready delivery.</p>
                  <div className="tool-list">{selection.item.tags.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              </>
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
                  {selection.item.breakdown && <Breakdown item={selection.item.breakdown} />}
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
