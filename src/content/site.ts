import type { RoomId } from './types'

export const site = {
  name: 'ATELIER',
  descriptor: 'AI-FIRST CREATIVE STUDIO',
  intro: 'Creative systems, moving image and visual experiences for modern brands.',
  contact: {
    headline: 'Open for collaboration.',
    email: 'studio@example.com',
    instagram: '',
    linkedin: '',
    isPlaceholder: true,
    routes: [
      { label: 'Create a campaign', subject: 'Create a campaign' },
      { label: 'Build a content system', subject: 'Build a content system' },
      { label: 'Explore a POC', subject: 'Explore a POC' },
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
  { id: 'lobby', eyebrow: '00 / ARRIVAL', title: 'ATELIER', subtitle: 'Creative systems, moving image and visual experiences for modern brands.' },
  { id: 'gallery', eyebrow: '01 / IMAGE', title: 'The Image Room', subtitle: 'Finished visual work for campaigns, products and spaces.' },
  { id: 'films', eyebrow: '02 / MOTION', title: 'The Moving Room', subtitle: 'Finished moving image for commercial and cultural contexts.' },
  { id: 'lab', eyebrow: '03 / AI LAB', title: 'Creative AI Laboratory', subtitle: 'Production systems, workflows and creative infrastructure.' },
  { id: 'showroom', eyebrow: '04 / SHOWROOM', title: 'The Afterimage', subtitle: 'Concepts, prototypes and possibilities.' },
  { id: 'contact', eyebrow: '05 / CONTACT', title: 'Open for collaboration', subtitle: 'Start a conversation about what we could build together.' },
]
