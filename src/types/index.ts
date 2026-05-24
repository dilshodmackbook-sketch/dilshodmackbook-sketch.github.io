export type Theme = 'light' | 'dark'

export type ProjectStatus =
  | 'production'
  | 'open-source'
  | 'delivered'
  | 'internal'
  | 'live'

export interface ExperienceItem {
  key: string
  company: string
  short: string
  color: string
  isCurrent: boolean
  techs: string[]
  url?: string
}

export interface SkillItem {
  name: string
  level: number
  years: number
}

export interface SkillGroup {
  key: string
  icon: string
  items: SkillItem[]
}

export interface ProjectItem {
  key: string
  featured: boolean
  techs: string[]
  gradient: string
  icon: string
  link: string | null
  repo: string | null
  status: ProjectStatus
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

export type SocialPlatform = 'github' | 'linkedin' | 'email'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  href: string
  handle: string
}
