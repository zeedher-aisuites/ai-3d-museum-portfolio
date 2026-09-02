export type RoomId = 'lobby' | 'gallery' | 'films' | 'lab' | 'showroom' | 'contact'

export type ProjectStatus = 'portfolio' | 'concept' | 'client'
export type LatestType = 'film' | 'story' | 'experiment'

export type ProjectBreakdown = {
  challenge?: string
  approach?: string
  process?: string[]
  result?: string
  referenceImages?: string[]
  behindTheScenes?: string[]
  tools?: string[]
}

export type Artwork = {
  id: string
  title: string
  subtitle?: string
  project: string
  description: string
  category: string
  sector?: string
  client?: string
  status?: ProjectStatus
  tools: string[]
  year: string
  image: string
  thumbnail?: string
  featured?: boolean
  latest?: boolean
  latestType?: LatestType
  breakdown?: ProjectBreakdown
  accent: string
  orientation: 'landscape' | 'portrait' | 'square'
}

export type Video = {
  id: string
  title: string
  subtitle?: string
  description: string
  category: string
  sector?: string
  client?: string
  status?: ProjectStatus
  year: string
  thumbnail: string
  youtubeId?: string
  videoUrl?: string
  duration?: string
  tools?: string[]
  featured?: boolean
  latest?: boolean
  latestType?: LatestType
  breakdown?: ProjectBreakdown
}

export type Resource = {
  id: string
  title: string
  category: string
  summary: string
  type: 'workflow' | 'breakdown' | 'tutorial' | 'tool' | 'system'
  url?: string
  status: 'public' | 'coming-soon'
  featured?: boolean
  latest?: boolean
  latestType?: LatestType
}

export type ShowroomProject = {
  id: string
  collection: string
  collectionLabel: string
  format?: 'series-teaser' | 'episode' | 'character-test' | 'environment-study' | 'action-test' | 'dialogue-test'
  index: string
  title: string
  conceptLine: string
  sector: string
  status: 'ATELIER POC' | 'CONCEPT' | 'DEMO'
  hero: {
    type: 'video' | 'image' | 'interactive'
    thumbnail: string
    youtubeId?: string
    videoUrl?: string
    duration?: string
  }
  watchUrl?: string
  description: string
  extendedDescription?: string
  territories: string[]
  capabilities: string[]
  applications: string[]
  featured?: boolean
  latest?: boolean
  latestType?: LatestType
  breakdown?: ProjectBreakdown
  accent: string
}

export type ShowroomCollection = {
  id: string
  label: string
  subtitle: string
  emptyState?: {
    heading: string
    description: string
  }
}

export type DigitalTalent = {
  id: string
  name: string
  hero: string
  archetype?: string
  shortDescription?: string
  tags: string[]
  capabilities: string[]
  status?: 'available' | 'in-development'
  additionalImages?: string[]
  videoUrl?: string
  youtubeId?: string
  voiceAvailable?: boolean
  personality?: string
  featured?: boolean
}

export type CommercialContentCategory = 'food' | 'drink' | 'product' | 'ugc'

export type CommercialMotion = {
  duration?: string
  model?: string
  poster?: string
  videoUrl?: string
  youtubeId?: string
  demo?: boolean
}

export type CommercialContentItem = {
  id: string
  slug: string
  title: string
  category: CommercialContentCategory
  shortDescription: string
  hero: {
    src: string
    alt: string
  }
  prompt: string
  motion?: CommercialMotion
  studyId?: string
  tags?: string[]
  featured?: boolean
  latest?: boolean
  latestType?: LatestType
  demo: boolean
}

export type GenerationQuality = 'standard' | 'high' | 'ultra'

export type GenerationVariant = {
  id: string
  model: string
  modelLabel: string
  quality: GenerationQuality
  image: string
  costCredits: number
  evaluation: string
  demo: true
}

export type GenerationStudy = {
  id: string
  campaignId: string
  title: string
  category: CommercialContentCategory
  prompt: string
  selectedVariantId: string
  summary: string
  variants: GenerationVariant[]
  demo: true
}

export type Selection =
  | { type: 'artwork'; item: Artwork }
  | { type: 'video'; item: Video }
  | { type: 'resource'; item: Resource }
  | { type: 'showroom'; item: ShowroomProject }
  | { type: 'talent'; item: DigitalTalent }
  | { type: 'commercial'; item: CommercialContentItem }

export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
