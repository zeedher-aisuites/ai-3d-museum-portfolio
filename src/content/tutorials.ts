import type { Resource } from './types'

export const tutorials: Resource[] = [
  { id: 'campaign-image-system', title: 'Campaign image system', summary: 'Reference, art direction, generation and finishing arranged as one repeatable image pipeline.', category: 'Image Pipeline', type: 'system', status: 'coming-soon', featured: true, latest: true, latestType: 'experiment' },
  { id: 'moving-image-pipeline', title: 'Moving image pipeline', summary: 'A screen-first approach to concepts, shot design, image-to-video and final edit.', category: 'Motion Pipeline', type: 'workflow', status: 'coming-soon', featured: true },
  { id: 'character-continuity', title: 'Character continuity', summary: 'A system for visual identity, reference control and consistent talent across a campaign world.', category: 'Production System', type: 'system', status: 'coming-soon' },
  { id: 'creative-automation', title: 'Creative automation', summary: 'Reusable production logic for variations, account adaptation and controlled content scale.', category: 'Automation', type: 'system', status: 'coming-soon' },
]
