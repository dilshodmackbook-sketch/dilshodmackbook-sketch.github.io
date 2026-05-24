import type { SkillGroup } from '../types'

export const skillGroups: SkillGroup[] = [
  {
    key: 'frameworks',
    icon: 'Boxes',
    items: [
      { name: 'React', level: 95, years: 4 },
      { name: 'Vue 3', level: 92, years: 3 },
      { name: 'Vue 2', level: 90, years: 3 },
      { name: 'Nuxt 3', level: 85, years: 2 },
      { name: 'React Native', level: 70, years: 1 },
      { name: 'Next.js', level: 75, years: 2 },
    ],
  },
  {
    key: 'languages',
    icon: 'Code2',
    items: [
      { name: 'JavaScript (ES6+)', level: 95, years: 5 },
      { name: 'TypeScript', level: 85, years: 3 },
      { name: 'HTML5', level: 98, years: 5 },
      { name: 'CSS3', level: 95, years: 5 },
      { name: 'SQL (basic)', level: 60, years: 2 },
    ],
  },
  {
    key: 'styling',
    icon: 'Palette',
    items: [
      { name: 'Tailwind CSS', level: 95, years: 4 },
      { name: 'Sass / SCSS', level: 90, years: 5 },
      { name: 'Radix UI', level: 85, years: 1 },
      { name: 'Bootstrap', level: 90, years: 4 },
      { name: 'Bootstrap-Vue', level: 90, years: 3 },
      { name: 'Framer Motion', level: 80, years: 2 },
    ],
  },
  {
    key: 'state',
    icon: 'Database',
    items: [
      { name: 'React Query', level: 90, years: 2 },
      { name: 'Pinia', level: 92, years: 3 },
      { name: 'Vuex', level: 90, years: 3 },
      { name: 'Zustand', level: 75, years: 1 },
      { name: 'REST APIs', level: 95, years: 5 },
      { name: 'GraphQL (basic)', level: 60, years: 1 },
    ],
  },
  {
    key: 'tooling',
    icon: 'Wrench',
    items: [
      { name: 'Vite', level: 95, years: 3 },
      { name: 'Webpack', level: 75, years: 4 },
      { name: 'ESLint / Prettier', level: 90, years: 5 },
      { name: 'Git / GitHub', level: 95, years: 5 },
      { name: 'npm / pnpm / yarn', level: 92, years: 5 },
    ],
  },
  {
    key: 'platforms',
    icon: 'Server',
    items: [
      { name: 'Vercel', level: 85, years: 3 },
      { name: 'Netlify', level: 85, years: 3 },
      { name: 'Linux server (Nginx)', level: 75, years: 2 },
      { name: 'Docker (basic)', level: 60, years: 1 },
      { name: 'WordPress', level: 80, years: 4 },
    ],
  },
]
