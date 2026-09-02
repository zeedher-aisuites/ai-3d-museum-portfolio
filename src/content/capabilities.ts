import type { RoomId } from './types'

export type CapabilityIndexItem = {
  id: string
  label: string
  room: RoomId
  collection?: string
}

export const capabilityIndex: CapabilityIndexItem[] = [
  { id: 'ai-commercials', label: 'AI Commercials', room: 'films' },
  { id: 'micro-stories', label: 'Micro Stories', room: 'showroom', collection: 'micro-stories' },
  { id: 'ai-talent', label: 'AI Talent', room: 'gallery' },
  { id: 'real-estate', label: 'Real Estate', room: 'showroom', collection: 'real-estate' },
  { id: 'hospitality', label: 'Hospitality', room: 'showroom', collection: 'hospitality' },
  { id: 'original-animation', label: 'Original Animation', room: 'showroom', collection: 'original-worlds' },
  { id: 'creative-automation', label: 'Creative Automation', room: 'lab' },
]

export const productionPipeline = [
  'Strategy',
  'Concept',
  'Image',
  'Characters',
  'Video',
  'Voice / Sound',
  'Motion',
  'Web / Delivery',
  'Automation',
]
