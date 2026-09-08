import { assetUrl, type DigitalTalent, type ProjectBreakdown } from './types'

export type RecruiterImage = {
  src: string
  alt: string
}

export type RecruiterMedia = RecruiterImage & {
  kind: 'image' | 'video'
  caption?: string
  poster?: string
}

export type RecruiterProfessionalLink = {
  label: string
  href: string
}

export type RecruiterProfile = {
  name: string
  headline: string
  supportingLine: string
  summary: string
  email: string
  linkedin: string
  github: string
  location: string
  availability: string
  museumEntryLabel: string
  museumEntryRoute: string
  portrait?: RecruiterImage
  logo?: RecruiterImage
  professionalLinks?: RecruiterProfessionalLink[]
}

export type RecruiterCaseStudyStatus = 'published' | 'private' | 'in-development'

export type RecruiterProjectType =
  | 'personal-project'
  | 'spec-concept'
  | 'technical-poc'
  | 'client-work'

export type RecruiterCaseStudy = {
  id: string
  slug: string
  title: string
  status: RecruiterCaseStudyStatus
  cover: RecruiterImage
  summary: string
  projectType?: RecruiterProjectType
  role?: string[]
  disciplines?: string[]
  tools?: string[]
  year?: string
  client?: string
  context?: string
  challenge?: string
  approach?: string
  contribution?: string[]
  outcome?: string
  workflow?: string[]
  capabilities?: string[]
  deliverables?: string[]
  media?: RecruiterMedia[]
  processMedia?: RecruiterMedia[]
  externalUrl?: string
  disclaimer?: string
  breakdown?: ProjectBreakdown
}

export type RecruiterProcessStep = {
  step: string
  title: string
  description: string
}

export type RecruiterTechnicalEdge = {
  title: string
  description: string
  items: string[]
}

export type RecruiterAbout = {
  eyebrow: string
  title: string
  body: string[]
}

// The recruiter roster deliberately reuses the existing approved talent shape,
// while keeping future recruiter data isolated from the ATELIER museum roster.
export type RecruiterTalent = DigitalTalent

export type RecruiterPortfolioContent = {
  profile: RecruiterProfile
  caseStudies: RecruiterCaseStudy[]
  talent: RecruiterTalent[]
  process: RecruiterProcessStep[]
  technicalEdge: RecruiterTechnicalEdge[]
  about: RecruiterAbout
}

export const recruiterProfile: RecruiterProfile = {
  name: 'José Eduardo Hernández',
  headline: 'Gen AI Creative Technologist',
  supportingLine: 'AI Video · Generative Media · Creative Automation',
  summary: 'I design AI-native visual stories and the workflows behind them.',
  email: 'zeedher.ai.suites@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jos%C3%A9-eduardo-hern%C3%A1ndez-26082380/',
  github: 'https://github.com/zeedher-aisuites',
  location: 'Mexico City, Mexico',
  availability: 'Open to full-time opportunities · Remote / Hybrid',
  museumEntryLabel: 'Explore the 3D Portfolio',
  museumEntryRoute: '#/atelier',
  logo: {
    src: assetUrl('recruiter/profile/albaos-logo.png'),
    alt: 'Portfolio identity mark',
  },
}

export const recruiterProcess: RecruiterProcessStep[] = [
  {
    step: '01',
    title: 'Creative intent',
    description:
      'Define what the piece should communicate, its tone, visual direction, and narrative objective.',
  },
  {
    step: '02',
    title: 'AI-assisted ideation',
    description:
      'Iterate with AI systems to explore concepts, challenge ideas, and develop the script or narrative structure.',
  },
  {
    step: '03',
    title: 'Storyboard & previs',
    description:
      'Build low-fidelity storyboards and visual grids to test the sequence and shot relationships before final generation.',
  },
  {
    step: '04',
    title: 'Context & keyframes',
    description:
      'Assemble the characters, environments, references, and keyframes needed to control each shot.',
  },
  {
    step: '05',
    title: 'Shot design',
    description:
      'Develop framing, camera behavior, lighting, action, and continuity around the intention of each scene.',
  },
  {
    step: '06',
    title: 'Generative video',
    description:
      'Produce motion primarily through Higgsfield and Seedance, using persistent-character tools when the project requires them.',
  },
  {
    step: '07',
    title: 'Iteration & QC',
    description:
      'Review continuity, performance, objects, text, and visual artifacts, then refine or regenerate until the sequence holds together.',
  },
]

export const recruiterTechnicalEdge: RecruiterTechnicalEdge[] = [
  {
    title: 'Generative production',
    description:
      'AI-native visual production built around references, controlled context, iteration, and repeatable creative decisions.',
    items: [
      'Higgsfield',
      'Seedance',
      'ComfyUI',
      'AI-assisted previsualization',
      'Reference-driven generation',
      'Persistent character workflows',
    ],
  },
  {
    title: 'Applied AI foundation',
    description:
      'Professional AI and ML experience gives the creative practice an engineering and systems layer beyond generation alone.',
    items: [
      'Python',
      'Prompt & Context Engineering',
      'LLM workflows',
      'RAG',
      'LangGraph',
      'Automation',
    ],
  },
]

export const recruiterAbout: RecruiterAbout = {
  eyebrow: 'Background',
  title: 'Creative production with an engineering backbone.',
  body: [
    'My background combines Physical Engineering, a Master’s degree in Artificial Intelligence, and professional experience as a Data Scientist / Machine Learning Engineer.',
    'Today my primary focus is AI-native creative production: generative video, persistent synthetic characters, visual storytelling, and the workflows used to turn an idea into a controlled sequence.',
  ],
}

// Future approved case-study themes may include hospitality, narrative,
// synthetic-talent, advertising, architectural-visualization, and persistent-
// character work. Do not add records until their evidence and publication state
// are approved.
export const recruiterCaseStudies: RecruiterCaseStudy[] = []

export const recruiterTalent: RecruiterTalent[] = []

export const recruiterPortfolio: RecruiterPortfolioContent = {
  profile: recruiterProfile,
  caseStudies: recruiterCaseStudies,
  talent: recruiterTalent,
  process: recruiterProcess,
  technicalEdge: recruiterTechnicalEdge,
  about: recruiterAbout,
}
