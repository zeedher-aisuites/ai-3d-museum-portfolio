import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { assetUrl, type GenerationStudy } from '../content/types'
import { PromptViewer } from './PromptViewer'

type GenerationStudyModalProps = {
  study: GenerationStudy | null
  onClose: () => void
  onViewFinal: (campaignId: string) => void
}

const qualityOrder = ['standard', 'high', 'ultra'] as const

export function GenerationStudyModal({ study, onClose, onViewFinal }: GenerationStudyModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const models = useMemo(() => {
    if (!study) return []
    return [...new Map(study.variants.map((variant) => [variant.model, variant.modelLabel])).entries()]
  }, [study])

  useEffect(() => {
    if (study) window.requestAnimationFrame(() => closeRef.current?.focus())
  }, [study])

  return (
    <AnimatePresence>
      {study && (
        <motion.div className="modal-backdrop generation-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose} role="presentation">
          <motion.section className="generation-study-modal" initial={{ opacity: 0, y: 26, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.985 }} onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={study.title}>
            <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close generation study">×</button>
            <header className="generation-study-header">
              <p className="eyebrow">Generation Lab / synthetic benchmark</p>
              <h2>{study.title}</h2>
              <p>{study.summary}</p>
              <div className="generation-study-actions"><button type="button" onClick={() => onViewFinal(study.campaignId)}>View final campaign</button><span>Demo data · not a live model comparison</span></div>
            </header>
            <PromptViewer prompt={study.prompt} />
            <section className="generation-matrix" aria-label="Generated benchmark variants">
              {models.map(([model, modelLabel]) => {
                const variants = study.variants.filter((variant) => variant.model === model).sort((a, b) => qualityOrder.indexOf(a.quality) - qualityOrder.indexOf(b.quality))
                return <section key={model} className="generation-model-group"><header><p className="eyebrow">Demo model</p><h3>{modelLabel}</h3></header><div>{variants.map((variant) => <article key={variant.id} className={`generation-variant${variant.id === study.selectedVariantId ? ' selected' : ''}`}>
                  <img src={assetUrl(variant.image)} alt={`${study.title}, ${variant.modelLabel}, ${variant.quality} quality synthetic variant`} loading="lazy" />
                  <div><p>{variant.quality} / {variant.costCredits} demo credit{variant.costCredits > 1 ? 's' : ''}</p><strong>{variant.id === study.selectedVariantId ? 'Selected output' : variant.modelLabel}</strong><span>{variant.evaluation}</span></div>
                </article>)}</div></section>
              })}
            </section>
            <section className="generation-evaluation"><p className="eyebrow">Evaluation / framing · material response · atmosphere · campaign fit</p><p>These locally hosted synthetic outputs make the interface, review pattern and prompt hand-off tangible. They are intentionally marked as demo material and are not presented as an external model benchmark or production claim.</p></section>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
