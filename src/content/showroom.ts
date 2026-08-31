import type { ShowroomCollection, ShowroomProject } from './types'

// Add a collection here, then add its projects below. The room, modal and
// accessible fallback consume this data; no scene or player changes are needed.
export const showroomCollections: ShowroomCollection[] = [
  {
    id: 'hospitality',
    label: 'Hospitality',
    subtitle: 'Three creative directions. One production system.',
  },
]

// These are speculative ATELIER demonstrations, never client commissions.
// YouTube hosts the streams; the repository only contains optimized posters.
export const showroom: ShowroomProject[] = [
  {
    id: 'hospitality-001',
    collection: 'hospitality',
    collectionLabel: 'Hospitality',
    index: '001',
    title: 'Brand Experience',
    conceptLine: 'One Group. Many Worlds.',
    sector: 'Hospitality',
    status: 'ATELIER POC',
    hero: {
      type: 'video',
      thumbnail: 'portfolio/showroom/hospitality/concept-001/thumbnail.webp',
      youtubeId: '9pNYF_Eyk1Y',
    },
    watchUrl: 'https://youtu.be/9pNYF_Eyk1Y',
    description: 'A speculative hospitality campaign exploring how one creative language can move across restaurant, bar and nightlife environments.',
    extendedDescription: 'Built as a screen-first brand film, the concept focuses on atmosphere, product, architecture, texture and human experience — creating a unified visual standard across multiple venues.',
    territories: ['Restaurant', 'Bar', 'Nightlife', 'Hospitality Groups', 'Digital Signage'],
    capabilities: ['Cinematic advertising', 'Food and beverage direction', 'Architectural atmosphere', 'Premium lighting', 'Brand consistency', 'Multi-venue creative systems'],
    applications: ['Digital signage', 'Venue screens', 'Commercial', 'Event display', 'Web', 'Social cutdown'],
    featured: true,
    accent: '#d0a46e',
  },
  {
    id: 'hospitality-002',
    collection: 'hospitality',
    collectionLabel: 'Hospitality',
    index: '002',
    title: 'The Night Moves',
    conceptLine: 'Youth. Status. Motion. Scale.',
    sector: 'Hospitality',
    status: 'ATELIER POC',
    hero: {
      type: 'video',
      thumbnail: 'portfolio/showroom/hospitality/concept-002/thumbnail.webp',
      youtubeId: 'wNpkoSjUNOk',
    },
    watchUrl: 'https://youtu.be/wNpkoSjUNOk',
    description: 'A speculative entertainment and hospitality campaign built around movement, youth culture and escalating scale.',
    extendedDescription: 'From casino dining to young elite nightlife and massive live events, The Night Moves explores a kinetic advertising language driven by human energy, camera movement, rhythm and spectacle.',
    territories: ['Casino Hospitality', 'Young Elite Clubs', 'Nightlife', 'Massive Events', 'Entertainment Groups'],
    capabilities: ['Human blocking', 'Crowd direction', 'Kinetic cinematography', 'Youth-oriented advertising', 'Event-scale spectacle', 'High-energy editing'],
    applications: ['Venue screens', 'Commercial', 'Event display', 'Web', 'Social cutdown'],
    featured: true,
    accent: '#bc7892',
  },
  {
    id: 'hospitality-003',
    collection: 'hospitality',
    collectionLabel: 'Hospitality',
    index: '003',
    title: 'Inside the Invitation',
    conceptLine: 'Private reality becomes impossible.',
    sector: 'Hospitality',
    status: 'ATELIER POC',
    hero: {
      type: 'video',
      thumbnail: 'portfolio/showroom/hospitality/concept-003/thumbnail.webp',
      youtubeId: 'cZgG3cKVMCI',
    },
    watchUrl: 'https://youtu.be/cZgG3cKVMCI',
    description: 'A private pool party becomes something impossible.',
    extendedDescription: 'Inside the Invitation combines cinematic FPV movement, premium mixology, DJ-driven energy, young private-rave culture and fantasy world-building to demonstrate an experiential approach to hospitality advertising.',
    territories: ['Private Parties', 'Pool Experiences', 'Private Clubs', 'Mixology', 'Electronic Music', 'Experiential Hospitality'],
    capabilities: ['Cinematic FPV', 'Fantasy world-building', 'AI-assisted VFX', 'Mixology macro direction', 'DJ / music synchronization', 'Water and creature effects', 'Experiential advertising'],
    applications: ['Digital signage', 'Venue screens', 'Commercial', 'Event display', 'Web', 'Social cutdown'],
    featured: true,
    accent: '#7797c4',
  },
]

export const projectsForShowroomCollection = (collectionId: string) => showroom
  .filter((project) => project.collection === collectionId)
  .sort((a, b) => a.index.localeCompare(b.index))
