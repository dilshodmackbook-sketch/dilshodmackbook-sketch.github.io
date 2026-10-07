import type { SkillGroup } from '../types'

export const skillGroups: SkillGroup[] = [
  { key: 'languages', items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SASS / SCSS', 'SQL'] },
  { key: 'frameworks', items: ['React', 'Vue 2 / Vue 3', 'Nuxt 3', 'React Native', 'Ionic'] },
  { key: 'state', items: ['React Query', 'Redux Toolkit', 'Vuex', 'Pinia', 'REST APIs'] },
  { key: 'backend', items: ['Node.js', 'PHP', 'Python', 'Java', 'MySQL', 'PostgreSQL', 'Docker', 'AI engineering'] },
  { key: 'ui', items: ['Tailwind CSS', 'Radix UI', 'Bootstrap-Vue', 'Responsive design', 'Accessibility'] },
  { key: 'architecture', items: ['Component-driven design', 'Design systems', 'SOLID', 'Git / GitLab', 'Vite', 'Webpack', 'CI/CD', 'AI-assisted development'] },
  { key: 'domains', items: ['ELD & telematics', 'CRM', 'WMS / TMS', 'Admin dashboards', 'E-commerce'] },
]

export const heroStack = [
  'React', 'TypeScript', 'Vue', 'Nuxt', 'Node.js', 'PHP', 'PostgreSQL', 'React Query',
  'Tailwind CSS', 'Radix UI', 'Pinia', 'Docker', 'Vite', 'REST APIs',
]
