import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionShell from './SectionShell'
import { Stagger, itemVariants } from '../utils/Reveal'
import { experience } from '../../data/experience'

export default function Experience() {
  const { t } = useTranslation()

  return (
    <SectionShell id="experience" index="02" titleKey="experience.title" subtitle={t('experience.subtitle')}>
      <Stagger className="flex flex-col" stagger={0.1}>
        {experience.map((job) => {
          const highlights = t(`experience.jobs.${job.key}.highlights`, { returnObjects: true }) as string[]
          return (
            <motion.article
              key={job.key}
              variants={itemVariants}
              className="group grid gap-6 border-t border-line/10 py-10 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-12"
            >
              <div className="md:sticky md:top-28 md:self-start">
                <p className="font-mono text-[11px] tracking-[0.15em] text-faint uppercase">{job.period}</p>
                {job.isCurrent && (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 px-2.5 py-0.5 text-[10px] tracking-tight text-emerald-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {t('experience.current')}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-2xl font-bold tracking-tighter md:text-3xl">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-baseline gap-1.5 transition-colors hover:text-accent"
                      >
                        {job.company}
                        <ArrowUpRight className="h-4 w-4 translate-y-0.5 text-faint transition-all duration-300 group-hover:text-accent" />
                      </a>
                    ) : (
                      job.company
                    )}
                  </h3>
                  <p className="text-[13px] text-muted">
                    {t(`experience.jobs.${job.key}.role`)} · {t(`experience.jobs.${job.key}.location`)}
                  </p>
                </div>

                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted text-pretty">
                  {t(`experience.jobs.${job.key}.summary`)}
                </p>

                <ul className="mt-6 space-y-3 border-t border-line/10 pt-6">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-fg/90">
                      <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="text-pretty">{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.techs.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          )
        })}
      </Stagger>
    </SectionShell>
  )
}
