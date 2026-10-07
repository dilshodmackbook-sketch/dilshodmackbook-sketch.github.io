import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const LANGS = ['en', 'uz', 'ru'] as const
type Lang = (typeof LANGS)[number]

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { i18n } = useTranslation()
  const current = (i18n.resolvedLanguage || 'en').slice(0, 2) as Lang

  const change = (lng: Lang) => {
    i18n.changeLanguage(lng)
    document.documentElement.lang = lng
    try {
      localStorage.setItem('lang', lng)
    } catch {
      // storage unavailable
    }
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center gap-0.5 rounded-full border border-line/[0.12] p-0.5 ${className}`}
    >
      {LANGS.map((lng) => {
        const active = current === lng
        return (
          <button
            key={lng}
            type="button"
            onClick={() => change(lng)}
            aria-pressed={active}
            className={`relative rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
              active ? 'text-ink' : 'text-faint hover:text-fg'
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-fg"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{lng}</span>
          </button>
        )
      })}
    </div>
  )
}
