import type { ExperienceItem } from '../types'

export const experience: ExperienceItem[] = [
  {
    key: 'longhorn',
    company: 'Longhorn Logistics Group',
    short: 'Longhorn',
    color: '#7c3aed',
    isCurrent: true,
    techs: ['React', 'React Query', 'Tailwind', 'Vite', 'Radix UI', 'TypeScript'],
    url: 'https://longhornlogisticsgroup.com',
  },
  {
    key: 'expensify',
    company: 'Expensify',
    short: 'Expensify',
    color: '#10b981',
    isCurrent: true,
    techs: ['React Native', 'TypeScript', 'Onyx', 'Open Source'],
    url: 'https://github.com/Expensify/App',
  },
  {
    key: 'zamonaviy',
    company: 'Zamonaviy Kommunikatsiyalar',
    short: 'ZK LLC',
    color: '#06b6d4',
    isCurrent: false,
    techs: ['Vue 2', 'Vue 3', 'Pinia', 'Vuex', 'Bootstrap-Vue', 'Nuxt 3'],
  },
  {
    key: 'prom',
    company: 'Prom.uz',
    short: 'Prom',
    color: '#ec4899',
    isCurrent: false,
    techs: ['Nuxt 3', 'Vue 3', 'Tailwind Premium', 'SSR'],
  },
  {
    key: 'datasite',
    company: 'DataSite Technology',
    short: 'DataSite',
    color: '#f59e0b',
    isCurrent: false,
    techs: ['React', 'WordPress', 'HTML/CSS', 'Bootstrap', 'Sass'],
  },
]
