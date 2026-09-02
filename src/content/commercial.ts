import type { CommercialContentItem } from './types'

// Original synthetic food studies for the Commercial Content System. The records
// intentionally distinguish a finished image campaign from a future motion master.
export const commercialContent: CommercialContentItem[] = [
  {
    id: 'ember-burger', slug: 'ember-burger', title: 'EMBER BURGER', category: 'food', demo: true, featured: true,
    shortDescription: 'A night-service burger campaign built around heat, texture and a single hero bite.',
    hero: { src: 'portfolio/commercial/food/ember-burger/hero.webp', alt: 'Synthetic commercial still of a smash burger lit by ember-red light.' },
    prompt: 'Premium food advertising still for a fictional late-night smash burger. Double patty, molten cheese, crisp lettuce and a glossy bun on dark stone; ember-red edge light, charcoal negative space, subtle steam, cinematic studio photography, no logos, no readable packaging text.',
    motion: { duration: '00:06', model: 'Seedance 2.5', demo: true },
    studyId: 'ember-burger-study', tags: ['Food', 'Launch campaign', 'Hero visual'],
  },
  {
    id: 'noche-tacos', slug: 'noche-tacos', title: 'NOCHE TACOS', category: 'food', demo: true, featured: true,
    shortDescription: 'A nocturnal taco concept balancing street-food energy with editorial still-life control.',
    hero: { src: 'portfolio/commercial/food/noche-tacos/hero.webp', alt: 'Synthetic commercial still of tacos in cobalt and amber night lighting.' },
    prompt: 'Premium food advertising still for a fictional late-night taco concept. Three elevated street tacos with grilled fillings, warm corn tortillas, lime and herbs; cobalt blue shadows, amber practical light, subtle smoke, cinematic editorial food photography, no logos or readable text.',
    motion: { duration: '00:06', model: 'Seedance 2.5', demo: true },
    studyId: 'noche-tacos-study', tags: ['Food', 'Nightlife', 'Social cutdowns'],
  },
  {
    id: 'forno-pizza', slug: 'forno-pizza', title: 'FORNO PIZZA', category: 'food', demo: true,
    shortDescription: 'A fire-and-flour pizza system designed for launch films, menus and social adaptations.',
    hero: { src: 'portfolio/commercial/food/forno-pizza/hero.webp', alt: 'Synthetic commercial still of a pizza under warm oven light.' },
    prompt: 'Premium advertising still for a fictional artisan pizza launch. Charred crust, molten mozzarella, basil and tomato on a dark ceramic surface; warm oven glow, restrained smoke, tactile flour detail, cinematic food photography, no logos or readable text.',
    motion: { duration: '00:06', model: 'Seedance 2.5', demo: true },
    tags: ['Food', 'Restaurant launch', 'Menu visual'],
  },
  {
    id: 'midnight-ramen', slug: 'midnight-ramen', title: 'MIDNIGHT RAMEN', category: 'food', demo: true,
    shortDescription: 'A quiet midnight bowl with material detail, steam choreography and tactile appetite appeal.',
    hero: { src: 'portfolio/commercial/food/midnight-ramen/hero.webp', alt: 'Synthetic commercial still of ramen with dramatic late-night lighting.' },
    prompt: 'Premium advertising still for a fictional midnight ramen concept. Dark ceramic bowl, glossy broth, noodles, egg and aromatic steam; deep navy shadows, warm copper highlights, cinematic tabletop lighting, no logos or readable text.',
    motion: { duration: '00:06', model: 'Seedance 2.5', demo: true },
    tags: ['Food', 'Editorial', 'Atmosphere'],
  },
  {
    id: 'fire-cut', slug: 'fire-cut', title: 'FIRE CUT', category: 'food', demo: true,
    shortDescription: 'A restrained steak campaign study where heat, surface and ritual carry the story.',
    hero: { src: 'portfolio/commercial/food/fire-cut/hero.webp', alt: 'Synthetic commercial still of a seared steak with warm firelight.' },
    prompt: 'Premium advertising still for a fictional steakhouse campaign. A seared steak resting on black stone with grill marks, herbs and a small pool of butter; firelight, deep shadow, elegant smoke, cinematic luxury food photography, no logos or readable text.',
    motion: { duration: '00:06', model: 'Seedance 2.5', demo: true },
    tags: ['Food', 'Hospitality', 'Cinematic still life'],
  },
  {
    id: 'noir-chocolate', slug: 'noir-chocolate', title: 'NOIR CHOCOLATE', category: 'food', demo: true, featured: true,
    shortDescription: 'A dark confectionery system using sculptural forms, cocoa atmosphere and quiet luxury.',
    hero: { src: 'portfolio/commercial/food/noir-chocolate/hero.webp', alt: 'Synthetic commercial still of dark chocolate and dessert with copper light.' },
    prompt: 'Premium advertising still for a fictional dark chocolate campaign. Sculptural chocolate bar and elegant dessert on black stone with drifting cocoa; espresso backdrop, restrained copper highlight, editorial luxury confectionery photography, no logos or readable text.',
    motion: { duration: '00:06', model: 'Seedance 2.5', demo: true },
    studyId: 'noir-chocolate-study', tags: ['Food', 'Confectionery', 'Luxury retail'],
  },
]

export const commercialContentById = (id: string) => commercialContent.find((item) => item.id === id)
