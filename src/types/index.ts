export type Theme = 'light' | 'dark'

export type ProjectStatus = 'production' | 'open-source' | 'delivered' | 'internal' | 'live'

export interface ExperienceItem {
  key: string
  company: string
  period: string
  isCurrent: boolean
  techs: string[]
  url?: string
}

export interface SkillGroup {
  key: string
  items: string[]
}

export interface ProjectItem {
  key: string
  index: string
  year: string
  techs: string[]
  link: string | null
  repo: string | null
  status: ProjectStatus
}

export interface LanguageItem {
  key: string
  level: string
  percent: number
}

export interface BlogSection {
  heading: string
  body: string[]
}

export type BlogAccent = 'violet' | 'cyan' | 'pink' | 'green'

export interface BlogPost {
  slug: string
  key: string
  readingTime: number
  tags: string[]
  accent: BlogAccent
  sections: BlogSection[]
}

export type SocialPlatform = 'github' | 'linkedin' | 'telegram' | 'email' | 'phone'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  href: string
  handle: string
}
