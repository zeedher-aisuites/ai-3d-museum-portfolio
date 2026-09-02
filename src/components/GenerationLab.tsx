import { generationStudies } from '../content/generationStudies'
import { assetUrl } from '../content/types'

export function GenerationLab({ onOpenStudy }: { onOpenStudy: (studyId: string) => void }) {
  return (
    <section className="generation-lab" aria-label="Generation Lab studies">
      <header><p className="eyebrow">Generation Lab</p><h2>Choose a final visual. Then inspect the decision trail.</h2><p>Model, quality and cost variants are synthetic interface data for review design — never a hidden claim about a live provider.</p></header>
      <div className="generation-study-list">
        {generationStudies.map((study) => {
          const selected = study.variants.find((variant) => variant.id === study.selectedVariantId) ?? study.variants[0]
          return <button key={study.id} className="generation-study-card" onClick={() => onOpenStudy(study.id)} aria-label={`Open ${study.title}`}>
            <img src={assetUrl(selected.image)} alt="" loading="lazy" />
            <span>Food / 3 models / 9 variants</span><b>{study.title.replace(' / GENERATION STUDY', '')}</b><small>Open generation study →</small>
          </button>
        })}
      </div>
    </section>
  )
}
