export type RoomId = 'lobby' | 'gallery' | 'films' | 'lab' | 'showroom' | 'contact'

export type ProjectStatus = 'portfolio' | 'concept' | 'client'

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
}

export type ShowroomProject = {
  id: string
  title: string
  sector: string
  status: 'POC' | 'CONCEPT' | 'DEMO'
  tagline: string
  hero: {
    type: 'video' | 'image' | 'interactive'
    thumbnail: string
    youtubeId?: string
    videoUrl?: string
    duration?: string
  }
  objective: string
  applications: string[]
  deliverables: { label: string; format?: string }[]
  scalability: string[]
  description: string
  featured?: boolean
  accent: string
}

export type Selection =
  | { type: 'artwork'; item: Artwork }
  | { type: 'video'; item: Video }
  | { type: 'resource'; item: Resource }
  | { type: 'showroom'; item: ShowroomProject }

export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
