export type RoomId = 'lobby' | 'gallery' | 'films' | 'lab' | 'experiments' | 'contact'

export type Artwork = {
  id: string
  title: string
  project: string
  description: string
  category: string
  tools: string[]
  year: string
  image: string
  accent: string
  orientation: 'landscape' | 'portrait' | 'square'
}

export type Video = {
  id: string
  title: string
  description: string
  category: string
  year: string
  poster: string
  youtubeId?: string
  externalUrl?: string
}

export type Resource = {
  id: string
  title: string
  description: string
  category: string
  url: string
  cta: string
}

export type Selection =
  | { type: 'artwork'; item: Artwork }
  | { type: 'video'; item: Video }
  | { type: 'resource'; item: Resource }

export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
