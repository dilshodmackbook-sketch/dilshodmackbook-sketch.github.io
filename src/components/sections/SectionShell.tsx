import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal, { LineReveal } from '../utils/Reveal'

interface SectionShellProps {
  id: string
  index: string
  titleKey: string
  subtitle?: string
  children: ReactNode
  className?: string
}

/**
 * Two-column section: a sticky numbered label on the left (desktop),
 * content on the right. Separated from the previous section by a drawn hairline.
 */
export default function SectionShell({ id, index, titleKey, subtitle, children, className = '' }: SectionShellProps) {
  const { t } = useTranslation()

  return (
    <section id={id} className={`relative scroll-mt-20 ${className}`}>
      <div className="container-site">
        <LineReveal />
        <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-20 lg:py-32">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-accent">{index}</span>
                <span className="h-px w-6 bg-line/20" />
                {t(`sections.${id}`)}
              </p>
              <h2 className="section-title mt-4">{t(titleKey)}</h2>
              {subtitle && (
                <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted text-pretty">{subtitle}</p>
              )}
            </Reveal>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  )
}
