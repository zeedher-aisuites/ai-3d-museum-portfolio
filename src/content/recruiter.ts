import type { DigitalTalent, ProjectBreakdown } from './types'

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

export type RecruiterProjectType = 'personal-project' | 'spec-concept' | 'technical-poc' | 'client-work'

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

// The recruiter roster deliberately reuses the existing approved talent shape,
// while keeping future recruiter data isolated from the ATELIER museum roster.
export type RecruiterTalent = DigitalTalent

export type RecruiterPortfolioContent = {
  profile: RecruiterProfile
  caseStudies: RecruiterCaseStudy[]
  talent: RecruiterTalent[]
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
}
