import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { experience } from '../../data/experience'
import type { ExperienceItem } from '../../types'

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experience" className="section">
      <div className="container-custom">
        <SectionHeader
          eyebrow={t('experience.eyebrow')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-accent-violet/60 via-border to-transparent md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-16">
            {experience.map((job, idx) => (
              <TimelineItem
                key={job.key}
                job={job}
                index={idx}
                t={t}
                side={idx % 2 === 0 ? 'right' : 'left'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineItemProps {
  job: ExperienceItem
  index: number
  t: TFunction
  side: 'left' | 'right'
}

function TimelineItem({ job, index, t, side }: TimelineItemProps) {
  const sideClasses =
    side === 'right'
      ? 'md:pl-16 md:col-start-2'
      : 'md:pr-16 md:col-start-1 md:text-right md:items-end'

  const highlights = t(`experience.jobs.${job.key}.highlights`, {
    returnObjects: true,
  }) as string[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative grid grid-cols-1 md:grid-cols-2 items-start"
    >
      {/* Node */}
      <div
        className="absolute left-4 md:left-1/2 top-6 md:-translate-x-1/2 z-10"
        style={{ color: job.color }}
      >
        <div className="relative -translate-x-1/2 md:translate-x-0">
          <div
            className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-2"
            style={{
              backgroundColor: job.color,
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: `0 0 0 4px rgba(10,10,15,0.8), 0 0 20px ${job.color}`,
            }}
          />
          {job.isCurrent && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: job.color, opacity: 0.5 }}
            />
          )}
        </div>
      </div>

      <div className={`pl-10 md:pl-0 ${sideClasses} flex flex-col`}>
        <div
          className="glass rounded-2xl p-6 card-hover w-full"
          style={{ borderColor: `${job.color}33` }}
        >
          {/* Period */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] uppercase tracking-widest font-mono px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${job.color}1a`,
                color: job.color,
                border: `1px solid ${job.color}40`,
              }}
            >
              {t(`experience.jobs.${job.key}.period`)}
            </span>
            {job.isCurrent && (
              <span className="text-[10px] uppercase tracking-widest font-mono text-accent-green flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {t('experience.current')}
              </span>
            )}
          </div>

          {/* Role + company */}
          <h3 className="text-lg font-semibold text-text-primary">
            {t(`experience.jobs.${job.key}.role`)}
          </h3>
          <div className="flex items-center gap-2 text-text-secondary text-sm mt-1 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t(`experience.jobs.${job.key}.company`)}</span>
            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="text-text-muted hover:text-accent-cyan transition-colors"
                aria-label={`Visit ${job.company}`}
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted mb-4">
            <MapPin className="w-3 h-3" />
            {t(`experience.jobs.${job.key}.location`)}
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed mb-4 text-pretty">
            {t(`experience.jobs.${job.key}.description`)}
          </p>

          {/* Highlights */}
          {Array.isArray(highlights) && highlights.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {highlights.map((h, i) => (
                <li
                  key={i}
                  className={`flex gap-2 text-sm text-text-secondary ${
                    side === 'left' ? 'md:flex-row-reverse md:text-right' : ''
                  }`}
                >
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: job.color }}
                  />
                  <span className="flex-1">{h}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech chips */}
          <div className={`flex flex-wrap gap-1.5 ${side === 'left' ? 'md:justify-end' : ''}`}>
            {job.techs.map((tech) => (
              <span key={tech} className="chip text-[10px]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
