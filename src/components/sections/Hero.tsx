import { lazy, Suspense, useEffect, useRef, useState, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, ArrowDown, MapPin } from 'lucide-react'
import Marquee from '../utils/Marquee'
import { heroStack } from '../../data/skills'
import { scrollToTarget } from '../../lib/scroll'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const HeroField = lazy(() => import('./HeroField'))

const ease = [0.16, 1, 0.3, 1] as const

function Line({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const nameOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [showField, setShowField] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!reduce) setShowField(true)
  }, [])

  // Marquee skews with scroll velocity, then settles back
  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return
    const skew = gsap.quickTo(el, 'skewX', { duration: 0.5, ease: 'power3.out' })
    let settle: gsap.core.Tween | undefined
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        skew(gsap.utils.clamp(-14, 14, self.getVelocity() / -220))
        settle?.kill()
        settle = gsap.delayedCall(0.12, () => skew(0))
      },
    })
    return () => {
      st.kill()
      settle?.kill()
    }
  }, [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  const meta = [
    { label: t('hero.meta.roleLabel'), value: t('hero.role') },
    { label: t('hero.meta.basedLabel'), value: t('hero.location') },
    { label: t('hero.meta.focusLabel'), value: t('hero.meta.focus') },
    { label: t('hero.meta.experienceLabel'), value: t('hero.meta.experience') },
  ]

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16 md:pt-[4.5rem]"
    >
      {/* Background: three.js dot field + grid + mouse spotlight */}
      <motion.div style={{ opacity: fieldOpacity }} aria-hidden className="pointer-events-none absolute inset-0 mask-fade-y">
        {showField && (
          <Suspense fallback={null}>
            <HeroField />
          </Suspense>
        )}
      </motion.div>
      <motion.div
        style={{ y: gridY }}
        aria-hidden
        className="bg-grid mask-fade-y pointer-events-none absolute inset-0 opacity-60 [--grid-cell:48px] md:[--grid-cell:72px]"
      />
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 -ml-[20rem] -mt-[20rem] h-[40rem] w-[40rem] rounded-full bg-glow/[0.14] blur-[120px] dark:bg-glow/[0.16]"
      />

      <div className="container-site relative flex flex-1 flex-col justify-center py-12 md:py-20">
        {/* Status row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line/[0.12] py-1.5 pl-2.5 pr-3.5 text-[11px] tracking-tight text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t('hero.status')}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] tracking-tight text-faint">
            <MapPin className="h-3 w-3" />
            {t('hero.role')} · {t('hero.location')}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          style={{ y: nameY, opacity: nameOpacity }}
          className="mt-8 font-extrabold uppercase leading-[0.86] tracking-tightest md:mt-10"
        >
          <span className="sr-only">Dilshod Bunyodov — {t('hero.role')}</span>
          <Line delay={0.35} className="text-[clamp(3.2rem,13.5vw,10.5rem)]">
            <span aria-hidden>{t('hero.firstName')}</span>
          </Line>
          <Line delay={0.5} className="text-[clamp(3.2rem,13.5vw,10.5rem)]">
            <span aria-hidden className="text-outline">
              {t('hero.lastName')}
            </span>
          </Line>
        </motion.h1>

        {/* Intro + meta */}
        <div className="mt-10 grid gap-10 border-t border-line/10 pt-8 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] md:gap-16 md:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
          >
            <p className="max-w-2xl text-[17px] leading-relaxed text-muted text-pretty md:text-[20px]">
              {t('hero.intro')}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTarget('#projects', -72)
                }}
                className="btn-solid group"
              >
                {t('hero.ctaPrimary')}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTarget('#contact', -72)
                }}
                className="btn-ghost"
              >
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.85 }}
            className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-1"
          >
            {meta.map((m) => (
              <div key={m.label} className="border-l border-line/15 pl-4">
                <dt className="eyebrow">{m.label}</dt>
                <dd className="mt-1 text-[14px] font-medium tracking-tight">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Marquee + scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="container-site relative pb-8"
      >
        <div ref={marqueeRef} className="border-y border-line/10 py-4 will-change-transform">
          <Marquee items={heroStack} />
        </div>
        <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          <span className="relative h-8 w-px overflow-hidden bg-line/10">
            <span className="absolute inset-0 animate-scroll-hint bg-accent" />
          </span>
          {t('hero.scrollHint')}
          <ArrowDown className="h-3 w-3" />
        </div>
      </motion.div>
    </section>
  )
}
