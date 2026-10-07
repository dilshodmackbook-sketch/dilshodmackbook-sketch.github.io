import { useTranslation } from 'react-i18next'
import { ArrowDownToLine } from 'lucide-react'
import SectionShell from './SectionShell'
import Reveal, { Stagger, itemVariants } from '../utils/Reveal'
import { motion } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import { CV_FILENAME, CV_PATH } from '../../data/socials'

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const [n, ref] = useCountUp(value, { duration: 1400 })
  return (
    <motion.div ref={ref} variants={itemVariants} className="border-t border-line/10 pt-4">
      <span className="block text-4xl font-bold tracking-tighter tabular md:text-5xl">
        {n}
        {suffix}
      </span>
      <span className="mt-2 block text-[12px] text-muted">{label}</span>
    </motion.div>
  )
}

export default function About() {
  const { t } = useTranslation()

  const facts = [
    { label: t('about.facts.locationLabel'), value: t('about.facts.location') },
    { label: t('about.facts.statusLabel'), value: t('about.facts.status') },
    { label: t('about.facts.languagesLabel'), value: t('about.facts.languages') },
    { label: t('about.facts.openSourceLabel'), value: t('about.facts.openSource') },
  ]

  return (
    <SectionShell id="about" index="01" titleKey="about.title">
      <div className="space-y-6 text-[16px] leading-relaxed text-muted text-pretty md:text-[18px]">
        <Reveal>
          <p className="text-fg">{t('about.p1')}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p>{t('about.p2')}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p>{t('about.p3')}</p>
        </Reveal>
      </div>

      <Stagger className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4" stagger={0.08}>
        <Stat value={5} suffix="+" label={t('about.stats.years')} />
        <Stat value={5} label={t('about.stats.companies')} />
        <Stat value={30} suffix="+" label={t('about.stats.products')} />
        <Stat value={3} label={t('about.stats.stacks')} />
      </Stagger>

      <Reveal delay={0.1} className="mt-12 grid gap-6 rounded-2xl border border-line/10 p-6 sm:grid-cols-2 md:p-8">
        <dl className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-1.5 text-[14px] font-medium tracking-tight">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="sm:col-span-2">
          <a href={CV_PATH} download={CV_FILENAME} className="btn-ghost group">
            {t('about.downloadCV')}
            <ArrowDownToLine className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </Reveal>
    </SectionShell>
  )
}
