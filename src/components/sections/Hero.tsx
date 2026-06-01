import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { useTypewriter } from '../../hooks/useTypewriter'
import StatsBar from './StatsBar'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const { t } = useTranslation()
  const titles = t('hero.titles', { returnObjects: true }) as string[]
  const typed = useTypewriter(titles, { typingSpeed: 90, deletingSpeed: 45, pause: 1800 })

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 md:pt-24 pb-16"
    >
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left column — copy */}
          <div className="lg:col-span-7 order-1 lg:order-1">
            {/* Availability pill */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-accent-green/30 text-xs font-medium text-text-secondary mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
              </span>
              {t('hero.availability')}
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-text-secondary font-mono mb-3 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-accent-violet" />
              {t('hero.greeting')}
            </motion.p>

            {/* Big title */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-display-1 font-extrabold text-balance mb-3 leading-[1.05]"
            >
              <span className="text-text-primary">Dilshod</span>{' '}
              <span className="gradient-text">Bunyodov</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-xl md:text-2xl text-text-secondary font-mono mb-6 min-h-[2.5rem]"
            >
              <span className="text-accent-cyan">{'<'}</span>
              <span className="terminal-text">{typed}</span>
              <span className="text-accent-cyan">{' />'}</span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="text-text-secondary text-base md:text-lg max-w-2xl text-pretty mb-8 leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <button onClick={() => scrollTo('#projects')} className="btn-primary group">
                {t('hero.ctaPrimary')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button onClick={() => scrollTo('#contact')} className="btn-secondary">
                {t('hero.ctaSecondary')}
              </button>
            </motion.div>

            {/* Location + socials */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
              className="flex flex-wrap items-center gap-5 text-sm text-text-muted"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Tashkent, Uzbekistan
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:bg-bg-card hover:text-text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg hover:bg-bg-card hover:text-text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:dilshodbunyodov2020@gmail.com"
                  className="p-2 rounded-lg hover:bg-bg-card hover:text-text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right column — visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 order-2 lg:order-2 flex justify-center"
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={8}
          className="mt-16 md:mt-20"
        >
          <StatsBar />
        </motion.div>

        {/* Scroll hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => scrollTo('#about')}
          className="hidden md:flex absolute left-1/2 bottom-2 -translate-x-1/2 flex-col items-center gap-2 text-text-muted hover:text-text-primary transition-colors group"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">
            {t('hero.scrollHint')}
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.button>
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md aspect-square">
      {/* Orbit rings */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-border/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full border border-border/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full border border-border/20" />
      </div>

      {/* Floating code card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-64 md:w-72 max-w-full"
      >
        <div className="code-card">
          <div className="code-card-header flex items-center gap-1.5 px-4 py-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-zinc-500 font-mono">developer.tsx</span>
          </div>
          <div className="p-3 font-mono text-xs leading-relaxed">
            <div className="text-zinc-500">
              <span className="text-accent-pink">const</span>{' '}
              <span className="text-accent-cyan">dev</span> = {'{'}
            </div>
            <div className="pl-4">
              <span className="text-accent-violet">name</span>:{' '}
              <span className="text-accent-green">'Dilshod'</span>,
            </div>
            <div className="pl-4">
              <span className="text-accent-violet">role</span>:{' '}
              <span className="text-accent-green">'Frontend'</span>,
            </div>
            <div className="pl-4">
              <span className="text-accent-violet">stack</span>: [
              <span className="text-accent-amber">'React'</span>,
              <span className="text-accent-amber">'Vue'</span>,
              <span className="text-accent-amber">'Angular'</span>],
            </div>
            <div className="pl-4">
              <span className="text-accent-violet">years</span>:{' '}
              <span className="text-accent-cyan">5</span>,
            </div>
            <div className="pl-4">
              <span className="text-accent-violet">remote</span>:{' '}
              <span className="text-accent-cyan">true</span>,
            </div>
            <div className="text-zinc-500">{'}'}</div>
          </div>
        </div>
      </motion.div>

      <FloatingChip className="top-4 right-8" delay={0}>React</FloatingChip>
      <FloatingChip className="bottom-8 left-4" delay={1}>Vue 3</FloatingChip>
      <FloatingChip className="bottom-16 right-2" delay={2}>Tailwind</FloatingChip>
      <FloatingChip className="top-20 -left-2" delay={3}>Vite</FloatingChip>
    </div>
  )
}

interface FloatingChipProps {
  children: ReactNode
  className?: string
  delay?: number
}

function FloatingChip({ children, className = '', delay = 0 }: FloatingChipProps) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
      className={`absolute glass px-3 py-1.5 rounded-full text-xs font-mono font-medium text-text-primary shadow-card ${className}`}
    >
      {children}
    </motion.div>
  )
}
