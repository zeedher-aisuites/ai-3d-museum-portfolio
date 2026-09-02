import { useState } from 'react'
import { commercialContent } from '../content/commercial'
import { assetUrl, type CommercialContentItem } from '../content/types'

type CommercialContentWallProps = {
  mode: 'static' | 'motion'
  reducedMotion: boolean
  onSelect: (item: CommercialContentItem) => void
}

export function CommercialContentWall({ mode, reducedMotion, onSelect }: CommercialContentWallProps) {
  const [previewId, setPreviewId] = useState<string | null>(null)
  const hasItems = commercialContent.length > 0

  if (!hasItems) {
    return (
      <div className="content-empty-state">
        <p className="eyebrow">Commercial content systems / {mode}</p>
        <strong>{mode === 'static' ? 'Campaign poster system ready.' : 'Motion pairing ready.'}</strong>
        <p>Approved food, drink, UGC and item concepts will be added as a single static → motion record, never as unrelated duplicate projects.</p>
      </div>
    )
  }

  return (
    <div className="commercial-wall" aria-label={`Commercial content ${mode}`}>
      {commercialContent.map((item) => {
        const previewable = mode === 'motion' && Boolean(item.videoUrl) && previewId === item.id && !reducedMotion
        return (
          <button
            key={item.id}
            className="commercial-card"
            onPointerEnter={() => { if (!reducedMotion) setPreviewId(item.id) }}
            onPointerLeave={() => setPreviewId(null)}
            onFocus={() => { if (!reducedMotion) setPreviewId(item.id) }}
            onBlur={() => setPreviewId(null)}
            onClick={() => onSelect(item)}
            aria-label={`Open ${item.title || `${item.category} commercial concept`}`}
          >
            {previewable ? <video src={assetUrl(item.videoUrl!)} muted playsInline loop autoPlay preload="none" poster={assetUrl(item.poster)} /> : <img src={assetUrl(item.poster)} alt={item.title || `${item.category} commercial concept`} loading="lazy" />}
            <span>{item.category} / {mode === 'static' ? 'static' : item.videoUrl ? 'motion preview' : 'motion ready'}</span>
          </button>
        )
      })}
    </div>
  )
}
