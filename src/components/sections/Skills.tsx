import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Boxes,
  Code2,
  Palette,
  Database,
  Wrench,
  Server,
  type LucideProps,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import { skillGroups } from '../../data/skills'
import type { SkillItem } from '../../types'

const ICONS: Record<string, ComponentType<LucideProps>> = {
  Boxes,
  Code2,
  Palette,
  Database,
  Wrench,
  Server,
}

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="section">
      <div className="container-custom">
        <SectionHeader
          eyebrow={t('skills.eyebrow')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, idx) => {
            const Icon = ICONS[group.icon] || Boxes
            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="card card-hover group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center group-hover:border-accent-violet transition-colors">
                    <Icon className="w-5 h-5 text-accent-violet" />
                  </div>
                  <h3 className="font-semibold text-text-primary">
                    {t(`skills.categories.${group.key}`)}
                  </h3>
                </div>

                <div className="space-y-3">
                  {group.items.map((item) => (
                    <SkillBar key={item.name} {...item} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SkillBar({ name, level, years }: SkillItem) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-text-primary">{name}</span>
        <span className="text-text-muted text-xs font-mono">{years}y</span>
      </div>
      <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-violet-cyan"
        />
      </div>
    </div>
  )
}
