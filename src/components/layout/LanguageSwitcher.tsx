import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface Lang {
  code: string
  label: string
  short: string
  flag: string
}

const LANGS: Lang[] = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
  { code: 'ru', label: 'Русский', short: 'RU', flag: '🇷🇺' },
  { code: 'uz', label: "O'zbekcha", short: 'UZ', flag: '🇺🇿' },
]

interface LanguageSwitcherProps {
  compact?: boolean
}

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = LANGS.find((l) => l.code === i18n.language) || LANGS[0]

  const change = (code: string) => {
    i18n.changeLanguage(code)
    document.documentElement.lang = code
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full border border-border bg-bg-card/60 backdrop-blur-md
                    transition-all hover:border-accent-violet hover:bg-bg-elevated
                    ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'}`}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        <span className="font-mono font-medium">{current.short}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 rounded-2xl glass-strong shadow-card p-1.5 z-50"
          >
            {LANGS.map((lang) => {
              const active = lang.code === current.code
              return (
                <button
                  key={lang.code}
                  onClick={() => change(lang.code)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-sm
                              transition-colors ${
                                active
                                  ? 'bg-accent-violet/15 text-text-primary'
                                  : 'text-text-secondary hover:bg-bg-card hover:text-text-primary'
                              }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {active && <Check className="w-4 h-4 text-accent-violet" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
