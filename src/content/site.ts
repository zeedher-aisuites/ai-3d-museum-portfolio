import type { RoomId } from './types'

export const site = {
  name: 'ATELIER',
  descriptor: 'AI MUSEUM',
  intro: 'A curated collection of artificial imagination, visual systems, and moving stories.',
  contact: {
    headline: 'Let’s make the next impossible thing.',
    email: 'hello@yourstudio.com',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
}

export type Room = {
  id: RoomId
  eyebrow: string
  title: string
  subtitle: string
}

export const rooms: Room[] = [
  { id: 'lobby', eyebrow: '00 / ARRIVAL', title: 'ATELIER', subtitle: 'A digital museum for artificial imagination.' },
  { id: 'gallery', eyebrow: '01 / IMAGE GALLERY', title: 'The Image Room', subtitle: 'Campaign worlds, fashion, and cinematic stills.' },
  { id: 'films', eyebrow: '02 / MOTION', title: 'The Moving Room', subtitle: 'Commercials, reels, and narrative experiments.' },
  { id: 'lab', eyebrow: '03 / AI LAB', title: 'Creative AI Laboratory', subtitle: 'Processes, tools, and ideas made visible.' },
  { id: 'experiments', eyebrow: '04 / EXPERIMENTS', title: 'The Afterimage', subtitle: 'Editorial systems and visual provocations.' },
  { id: 'contact', eyebrow: '05 / CONTACT', title: 'Open for collaboration', subtitle: 'A final room for the next conversation.' },
]
