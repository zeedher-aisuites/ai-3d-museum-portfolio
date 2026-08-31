import type { ShowroomProject } from './types'

// Showroom holds sales demonstrations, not completed client campaigns. Add a
// videoUrl or youtubeId to hero when a 16:9 master film is ready; components
// intentionally need no changes.
export const showroom: ShowroomProject[] = [
  {
    id: 'hospitality-brand-experience',
    title: 'Brand Experience / Hospitality',
    sector: 'Hospitality',
    status: 'POC',
    tagline: 'An atmosphere designed to move from venue screen to memory.',
    hero: { type: 'video', thumbnail: 'portfolio/showroom/hospitality-poc.svg', duration: '00:20' },
    objective: 'Demonstrate how a restaurant, bar, gym or event venue can turn its atmosphere into a screen-first brand film.',
    applications: ['Digital signage', 'Event screens', 'Commercial', 'Social cutdown'],
    deliverables: [{ label: 'Hero film', format: '20s / 16:9' }, { label: 'Ambient loop', format: '6s' }, { label: 'Key visual' }, { label: 'Vertical cut', format: '9:16' }],
    scalability: ['Multi-venue', 'Seasonal programming', 'Location adaptation'],
    description: 'An ATELIER POC for experiential brands that need an editorial visual system across physical and digital surfaces.',
    featured: true,
    accent: '#c78d61',
  },
  {
    id: 'property-brand-experience',
    title: 'Brand Experience / Property',
    sector: 'Real Estate / Luxury Retail',
    status: 'POC',
    tagline: 'A spatial campaign language for property, retail and objects of value.',
    hero: { type: 'video', thumbnail: 'portfolio/showroom/property-poc.svg', duration: '00:20' },
    objective: 'Show how property, luxury retail and product spaces can be presented as a composed visual experience before a visitor arrives.',
    applications: ['Sales presentations', 'Showroom displays', 'Launch film', 'Web landing page'],
    deliverables: [{ label: 'Hero film', format: '20s / 16:9' }, { label: 'Display loop', format: '6s' }, { label: 'Key visual' }, { label: 'Vertical cut', format: '9:16' }],
    scalability: ['Multi-property', 'Market localization', 'Account personalization'],
    description: 'An ATELIER POC for spaces and objects where atmosphere is as commercial as the product itself.',
    featured: true,
    accent: '#d3b27d',
  },
  {
    id: 'technology-brand-experience',
    title: 'Brand Experience / Technology',
    sector: 'Enterprise Technology',
    status: 'POC',
    tagline: 'Complex technology made legible through moving image and systems.',
    hero: { type: 'video', thumbnail: 'portfolio/showroom/technology-poc.svg', duration: '00:20' },
    objective: 'Demonstrate a visual language for enterprise technology, conference moments, B2B sales and high-stakes product communication.',
    applications: ['Conference screens', 'Booth displays', 'Sales presentations', 'Commercial cutdown'],
    deliverables: [{ label: 'Hero film', format: '20s / 16:9' }, { label: 'Loop system', format: '6s' }, { label: 'Key visual' }, { label: 'Presentation cut' }],
    scalability: ['Global event toolkit', 'Account personalization', 'Multi-screen deployment'],
    description: 'An ATELIER POC for technology teams that need commercial clarity without reducing their work to generic interface language.',
    featured: true,
    accent: '#73a69c',
  },
]
