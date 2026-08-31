import type { Artwork } from './types'

export const experimental: Artwork[] = [
  {
    id: 'electric-bloom', title: 'Electric Bloom', project: 'Re:Form / Poster Series',
    description: 'A poster study about artificial flora and the tension between a perfect image and an imperfect future.',
    category: 'Experimental Poster', tools: ['Stable Diffusion', 'Illustrator', 'ComfyUI'], year: '2026', image: 'portfolio/images/electric-bloom.svg', accent: '#cb6d8f', orientation: 'portrait',
  },
  {
    id: 'a-quiet-velocity', title: 'A Quiet Velocity', project: 'Aperture / Typography',
    description: 'Experimental art direction that allows typography, reflection, and product design to share the frame.',
    category: 'Visual System', tools: ['Midjourney', 'Figma', 'Photoshop'], year: '2025', image: 'portfolio/images/a-quiet-velocity.svg', accent: '#c9b87e', orientation: 'landscape',
  },
  {
    id: 'the-new-sun', title: 'The New Sun', project: 'Sol / Digital Print',
    description: 'A limited-edition visual world built from warm geometry, human silhouette, and synthetic sunlight.',
    category: 'Concept Art', tools: ['Flux', 'Blender', 'Photoshop'], year: '2026', image: 'portfolio/images/the-new-sun.svg', accent: '#e98246', orientation: 'square',
  },
]
