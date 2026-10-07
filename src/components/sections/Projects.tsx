import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Github } from 'lucide-react'
import Reveal, { LineReveal } from '../utils/Reveal'
import { projects } from '../../data/projects'
import type { ProjectItem } from '../../types'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const statusTone: Record<string, string> = {
  production: 'text-emerald-500 border-emerald-500/30',
  'open-source': 'text-accent border-accent/40',
  delivered: 'text-sky-500 border-sky-500/30',
  internal: 'text-muted border-line/15',
  live: 'text-emerald-500 border-emerald-500/30',
}

function ProjectCard({ p }: { p: ProjectItem }) {
  const { t } = useTranslation()
  return (
    <article
      data-card
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/10 bg-ink transition-colors duration-500 hover:border-line/30 lg:w-[26rem] lg:shrink-0"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line/10 bg-surface">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 [--grid-cell:28px] opacity-60 transition-transform duration-700 ease-out-expo group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute -bottom-10 -right-6 h-40 w-40 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        />
        <span className="absolute left-5 top-4 font-mono text-[11px] tracking-[0.2em] text-faint">{p.year.toUpperCase()}</span>
        <span className={`absolute right-4 top-4 rounded-full border px-2.5 py-0.5 text-[10px] tracking-tight ${statusTone[p.status]}`}>
          {t(`projects.status.${p.status}`)}
        </span>
        <span
          data-index
          className="absolute bottom-3 left-5 select-none text-[6rem] font-extrabold leading-none tracking-tightest text-fg/[0.08] transition-colors duration-700 group-hover:text-fg/[0.14] md:text-[7rem]"
        >
          {p.index}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-xl font-bold tracking-tighter">{t(`projects.items.${p.key}.title`)}</h3>
        <p className="mt-1 text-[13px] text-muted">{t(`projects.items.${p.key}.tagline`)}</p>
        <p className="mt-4 text-[14px] leading-relaxed text-muted text-pretty">{t(`projects.items.${p.key}.description`)}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.techs.map((tech) => (
            <span key={tech} className="chip px-2.5 py-0.5 text-[11px]">
              {tech}
            </span>
          ))}
        </div>

        {(p.link || p.repo) && (
          <div className="mt-6 flex items-center gap-4 border-t border-line/10 pt-4 text-[12px] font-semibold tracking-tight">
            {p.link && p.link !== '/' && (
              <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-accent">
                {t('projects.visit')}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
                <Github className="h-3.5 w-3.5" />
                {t('projects.code')}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

/**
 * Selected work. On large screens the section pins and the cards scroll horizontally
 * (GSAP ScrollTrigger); on smaller screens it falls back to a vertical grid.
 */
export default function Projects() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => {
        const left = track.getBoundingClientRect().left + window.scrollX
        return Math.max(0, left + track.scrollWidth - window.innerWidth + 48)
      }
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
            if (counterRef.current) {
              const n = Math.min(projects.length, Math.max(1, Math.round(self.progress * (projects.length - 1)) + 1))
              counterRef.current.textContent = String(n).padStart(2, '0')
            }
          },
        },
      })
      // Big index numbers drift as the cards travel
      gsap.utils.toArray<HTMLElement>('[data-card]', track).forEach((card) => {
        const idx = card.querySelector<HTMLElement>('[data-index]')
        if (!idx) return
        gsap.fromTo(
          idx,
          { xPercent: 18 },
          {
            xPercent: -18,
            ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          },
        )
      })
    })

    mm.add('(max-width: 1023px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-card]', track).forEach((card) => {
        const idx = card.querySelector<HTMLElement>('[data-index]')
        if (!idx) return
        gsap.fromTo(
          idx,
          { yPercent: 12 },
          { yPercent: -12, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    })

    ScrollTrigger.refresh()
    return () => mm.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden bg-ink lg:flex lg:h-screen lg:flex-col lg:justify-center">
      <div className="container-site">
        <LineReveal className="lg:hidden" />
        <div className="grid gap-8 py-16 md:py-24 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:items-end lg:gap-20 lg:py-0 lg:pb-10">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">03</span>
              <span className="h-px w-6 bg-line/20" />
              {t('sections.projects')}
            </p>
            <h2 className="section-title mt-4">{t('projects.title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-[15px] leading-relaxed text-muted text-pretty">{t('projects.subtitle')}</p>
            <div className="mt-6 hidden items-center gap-4 lg:flex">
              <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
                <span ref={counterRef}>01</span> / {String(projects.length).padStart(2, '0')}
              </span>
              <div className="h-px flex-1 bg-line/10">
                <div ref={barRef} className="h-px origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container-site pb-16 md:pb-24 lg:pb-0">
        <div ref={trackRef} className="relative grid gap-4 will-change-transform sm:grid-cols-2 lg:flex lg:gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.key} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
