import type { RoomId } from './types'

export const site = {
  name: 'ATELIER',
  descriptor: 'AI-FIRST CREATIVE STUDIO',
  intro: 'We direct, produce at scale, and build the technology around production.',
  contact: {
    headline: 'WORK WITH US',
    email: 'studio@example.com',
    instagram: '',
    linkedin: '',
    isPlaceholder: true,
    routes: [
      { label: 'I need a campaign', subject: 'I need a campaign', description: 'Commercials, hospitality, real estate, launches and branded storytelling.' },
      { label: 'I need ongoing content', subject: 'I need ongoing content', description: 'Social media, UGC, AI talent, food and beverage, and recurring creative production.' },
      { label: 'I need an AI system', subject: 'I need an AI system', description: 'Creative automation, custom workflows, internal tools and POC infrastructure.' },
    ],
  },
}

export type Room = {
  id: RoomId
  eyebrow: string
  title: string
  subtitle: string
}

export const rooms: Room[] = [
  { id: 'lobby', eyebrow: '00 / ARRIVAL', title: 'ATELIER', subtitle: 'A creative studio, AI production system and narrative lab.' },
  { id: 'gallery', eyebrow: '01 / IMAGE', title: 'The Image Room', subtitle: 'Selected work, AI talent and commercial content systems.' },
  { id: 'films', eyebrow: '02 / MOTION', title: 'The Moving Room', subtitle: 'Selected motion and campaign-ready content systems.' },
  { id: 'lab', eyebrow: '03 / AI LAB', title: 'Creative AI Laboratory', subtitle: 'AI demos, production pipelines and creative infrastructure.' },
  { id: 'showroom', eyebrow: '04 / SHOWROOM', title: 'The Afterimage', subtitle: 'Concepts, prototypes and possibilities.' },
  { id: 'contact', eyebrow: '05 / CONTACT', title: 'Work with us', subtitle: 'Campaigns, ongoing content and AI production systems.' },
]
