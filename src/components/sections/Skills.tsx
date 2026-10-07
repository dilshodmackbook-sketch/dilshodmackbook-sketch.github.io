import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionShell from './SectionShell'
import { Stagger, itemVariants } from '../utils/Reveal'
import { skillGroups } from '../../data/skills'

export default function Skills() {
  const { t } = useTranslation()

  return (
    <SectionShell id="skills" index="04" titleKey="skills.title" subtitle={t('skills.subtitle')}>
      <Stagger
        className="grid gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 sm:grid-cols-2"
        stagger={0.07}
      >
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.key}
            variants={itemVariants}
            className={`bg-ink p-5 transition-colors duration-500 hover:bg-surface md:p-6 ${
              gi === skillGroups.length - 1 && skillGroups.length % 2 === 1 ? 'sm:col-span-2' : ''
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[15px] font-semibold tracking-tight">{t(`skills.groups.${group.key}`)}</h3>
              <span className="font-mono text-[10px] tracking-[0.25em] text-faint">
                0{gi + 1}
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </Stagger>
    </SectionShell>
  )
}
