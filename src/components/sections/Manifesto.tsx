import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, ScrollTrigger } from '../../lib/gsap'

interface Token {
  text: string
  accent: boolean
}

/** Splits the sentence into words, flagging those that belong to an accent phrase. */
function tokenize(line: string, accents: string[]): Token[] {
  const marks = new Array<boolean>(line.length).fill(false)
  for (const phrase of accents) {
    let from = 0
    while (from < line.length) {
      const idx = line.indexOf(phrase, from)
      if (idx === -1) break
      for (let i = idx; i < idx + phrase.length; i++) marks[i] = true
      from = idx + phrase.length
    }
  }
  const tokens: Token[] = []
  const re = /\S+/g
  let m: RegExpExecArray | null
  while ((m = re.exec(line))) {
    tokens.push({ text: m[0], accent: marks[m.index] })
  }
  return tokens
}

/** Scroll-scrubbed statement: words light up one by one as the reader scrolls through. */
export default function Manifesto() {
  const { t, i18n } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const line = t('manifesto.line')
  const accents = t('manifesto.accents', { returnObjects: true }) as string[]
  const tokens = useMemo(() => tokenize(line, Array.isArray(accents) ? accents : []), [line, accents])

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-word]', root)
      gsap.set(words, { opacity: 0.12, y: 6 })
      gsap.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          end: 'bottom 42%',
          scrub: 0.6,
        },
      })
      gsap.fromTo(
        '[data-rule]',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 78%', end: 'bottom 42%', scrub: 0.6 } },
      )
    }, root)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [tokens, i18n.resolvedLanguage])

  return (
    <section aria-label="Statement" className="relative">
      <div className="container-site">
        <div ref={ref} className="py-20 md:py-32 lg:py-40">
          <div data-rule className="mb-10 h-px w-full origin-left bg-accent/60" />
          <p className="max-w-5xl text-[clamp(1.75rem,4.6vw,4rem)] font-bold leading-[1.08] tracking-tighter text-balance">
            {tokens.map((tok, i) => (
              <span
                key={`${tok.text}-${i}`}
                data-word
                className={`inline-block will-change-[opacity,transform] ${tok.accent ? 'text-accent' : ''}`}
              >
                {tok.text}
                {i < tokens.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
