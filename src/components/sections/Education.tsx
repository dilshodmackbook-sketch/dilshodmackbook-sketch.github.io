import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionShell from './SectionShell'
import Reveal from '../utils/Reveal'
import { education, languages } from '../../data/education'

export default function Education() {
  const { t } = useTranslation()

  return (
    <SectionShell id="education" index="05" titleKey="education.title">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="flex items-start gap-4 border-t border-line/10 pt-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/[0.12] text-muted">
              <GraduationCap className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-xl font-bold tracking-tighter">{t('education.college')}</h3>
              <p className="mt-1 text-[14px] text-muted">{t('education.degree')}</p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-faint">{education.year}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-t border-line/10 pt-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-[15px] font-semibold tracking-tight">{t('education.languagesTitle')}</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">{t('education.cefr')}</span>
            </div>
            <ul className="mt-5 space-y-5">
              {languages.map((lang, i) => (
                <li key={lang.key}>
                  <div className="flex items-baseline justify-between text-[14px]">
                    <span className="font-medium tracking-tight">{t(`education.languages.${lang.key}`)}</span>
                    <span className="font-mono text-[11px] tracking-[0.15em] text-muted">
                      {lang.level === 'Native' ? t('education.native') : lang.level}
                    </span>
                  </div>
                  <div className="mt-2 h-px w-full bg-line/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.1 }}
                      className="h-px bg-accent"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
