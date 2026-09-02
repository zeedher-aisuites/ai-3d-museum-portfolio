import type { GenerationQuality, GenerationStudy, GenerationVariant } from './types'

const qualities: { id: GenerationQuality; label: string; costCredits: number }[] = [
  { id: 'standard', label: 'Standard', costCredits: 1 },
  { id: 'high', label: 'High', costCredits: 2 },
  { id: 'ultra', label: 'Ultra', costCredits: 4 },
]

const models = [
  { id: 'model-a', label: 'Model A', note: 'Balanced composition test.' },
  { id: 'model-b', label: 'Model B', note: 'Material and atmosphere test.' },
  { id: 'model-c', label: 'Model C', note: 'Hero-detail and contrast test.' },
]

function buildVariants(slug: string, studyId: string): GenerationVariant[] {
  return models.flatMap((model) => qualities.map((quality) => ({
    id: `${studyId}-${model.id}-${quality.id}`,
    model: model.id,
    modelLabel: model.label,
    quality: quality.id,
    image: `portfolio/commercial/food/${slug}/studies/${model.id}-${quality.id}.webp`,
    costCredits: quality.costCredits,
    evaluation: `${model.note} ${quality.label} quality benchmark.`,
    demo: true,
  })))
}

export const generationStudies: GenerationStudy[] = [
  {
    id: 'ember-burger-study', campaignId: 'ember-burger', title: 'EMBER BURGER / GENERATION STUDY', category: 'food', demo: true,
    prompt: 'Premium food advertising still for a fictional late-night smash burger. Double patty, molten cheese, crisp lettuce and a glossy bun on dark stone; ember-red edge light, charcoal negative space, subtle steam, cinematic studio photography, no logos, no readable packaging text.',
    selectedVariantId: 'ember-burger-study-model-c-ultra',
    summary: 'A controlled benchmark of hero framing, food texture and heat-led atmosphere for a campaign-ready burger visual.',
    variants: buildVariants('ember-burger', 'ember-burger-study'),
  },
  {
    id: 'noche-tacos-study', campaignId: 'noche-tacos', title: 'NOCHE TACOS / GENERATION STUDY', category: 'food', demo: true,
    prompt: 'Premium food advertising still for a fictional late-night taco concept. Three elevated street tacos with grilled fillings, warm corn tortillas, lime and herbs; cobalt blue shadows, amber practical light, subtle smoke, cinematic editorial food photography, no logos or readable text.',
    selectedVariantId: 'noche-tacos-study-model-c-ultra',
    summary: 'A benchmark for food density, practical-light mood and consistent late-night restaurant art direction.',
    variants: buildVariants('noche-tacos', 'noche-tacos-study'),
  },
  {
    id: 'noir-chocolate-study', campaignId: 'noir-chocolate', title: 'NOIR CHOCOLATE / GENERATION STUDY', category: 'food', demo: true,
    prompt: 'Premium advertising still for a fictional dark chocolate campaign. Sculptural chocolate bar and elegant dessert on black stone with drifting cocoa; espresso backdrop, restrained copper highlight, editorial luxury confectionery photography, no logos or readable text.',
    selectedVariantId: 'noir-chocolate-study-model-c-ultra',
    summary: 'A benchmark for controlled reflection, cocoa atmosphere and a luxury confectionery visual hierarchy.',
    variants: buildVariants('noir-chocolate', 'noir-chocolate-study'),
  },
]

export const generationStudyById = (id: string) => generationStudies.find((study) => study.id === id)
