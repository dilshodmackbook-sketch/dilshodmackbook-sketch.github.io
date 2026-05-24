import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Download,
  MapPin,
  Globe2,
  CircleCheck,
  Briefcase,
  Code2,
  type LucideProps,
} from 'lucide-react'
import SectionHeader from './SectionHeader'

interface MetaItem {
  icon: ComponentType<LucideProps>
  label: string
  value: string
}

export default function About() {
  const { t } = useTranslation()

  const meta: MetaItem[] = [
    {
      icon: MapPin,
      label: t('about.locationLabel'),
      value: t('about.location'),
    },
    {
      icon: CircleCheck,
      label: t('about.availabilityLabel'),
      value: t('about.availability'),
    },
    {
      icon: Globe2,
      label: t('about.languagesLabel'),
      value: t('about.languages'),
    },
  ]

  return (
    <section id="about" className="section">
      <div className="container-custom">
        <SectionHeader
          eyebrow={t('about.eyebrow')}
          title={t('about.title')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Visual / Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Decorative blur */}
              <div className="absolute -inset-4 bg-gradient-violet-cyan opacity-20 blur-2xl rounded-3xl" />

              <div className="relative glass-strong rounded-3xl p-6 sm:p-8 overflow-hidden">
                {/* Top corner accent */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-violet/20 blur-3xl rounded-full" />

                {/* Initials block */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-violet-cyan flex items-center justify-center text-2xl font-bold font-mono text-white shadow-glow-violet">
                    DB
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-lg">
                      Dilshod Bunyodov
                    </h3>
                    <p className="text-sm text-text-secondary font-mono">
                      Senior Frontend Engineer
                    </p>
                  </div>
                </div>

                {/* Meta info */}
                <div className="space-y-4 mb-6">
                  {meta.map((m) => {
                    const Icon = m.icon
                    return (
                      <div key={m.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-bg-card border border-border flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-accent-cyan" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-text-muted font-mono mb-0.5">
                            {m.label}
                          </p>
                          <p className="text-sm text-text-primary truncate">{m.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Current roles */}
                <div className="border-t border-border pt-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-accent-violet" />
                    <div>
                      <span className="text-xs text-text-muted">
                        {t('about.currentlyAt')}{' '}
                      </span>
                      <span className="text-sm font-medium text-text-primary">
                        Longhorn Logistics
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-accent-cyan" />
                    <div>
                      <span className="text-xs text-text-muted">
                        {t('about.alsoAt')}{' '}
                      </span>
                      <span className="text-sm font-medium text-text-primary">
                        Expensify (Open Source)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-5"
          >
            <p className="text-lg text-text-primary leading-relaxed text-pretty">
              {t('about.p1')}
            </p>
            <p className="text-text-secondary leading-relaxed text-pretty">
              {t('about.p2')}
            </p>
            <p className="text-text-secondary leading-relaxed text-pretty">
              {t('about.p3')}
            </p>

            <div className="pt-4">
              <a
                href="/cv-dilshod-bunyodov.pdf"
                download="Dilshod-Bunyodov-CV.pdf"
                className="btn-secondary"
              >
                <Download className="w-4 h-4" />
                {t('about.downloadCV')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
