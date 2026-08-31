import type { Artwork } from './types'

export const images: Artwork[] = [
  {
    id: 'midnight-grand-tourer',
    title: 'Midnight Grand Tourer',
    project: 'Nocturne / Automotive',
    description: 'An AI-native film still imagining a silent luxury launch on the edge of a volcanic coastline.',
    category: 'AI Commercial',
    tools: ['Midjourney', 'ComfyUI', 'DaVinci Resolve'],
    year: '2026', image: 'portfolio/images/midnight-grand-tourer-v2.png', accent: '#d4a36d', orientation: 'landscape',
  },
  {
    id: 'soft-power',
    title: 'Soft Power',
    project: 'Aperture / Beauty',
    description: 'Editorial beauty direction with deliberately tactile grain, sculptural light, and minimal color.',
    category: 'Campaign Visual',
    tools: ['Flux', 'Photoshop', 'Topaz'],
    year: '2026', image: 'portfolio/images/soft-power.svg', accent: '#d6af9d', orientation: 'portrait',
  },
  {
    id: 'sunday-orbit',
    title: 'Sunday Orbit',
    project: 'Orbit / Fashion',
    description: 'A visual identity study that treats a quiet morning as an editorial universe.',
    category: 'Fashion Editorial',
    tools: ['Midjourney', 'Figma', 'Photoshop'],
    year: '2025', image: 'portfolio/images/sunday-orbit.svg', accent: '#b8b7a5', orientation: 'square',
  },
  {
    id: 'tide-after-tide',
    title: 'Tide After Tide',
    project: 'Abyss / Travel',
    description: 'A contemplative destination concept where deep blue architecture becomes the protagonist.',
    category: 'Art Direction',
    tools: ['FLUX', 'ComfyUI', 'After Effects'],
    year: '2026', image: 'portfolio/images/tide-after-tide.svg', accent: '#6e9fb1', orientation: 'landscape',
  },
]
