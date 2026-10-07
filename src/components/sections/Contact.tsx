import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import SectionShell from './SectionShell'
import Reveal, { Stagger, itemVariants } from '../utils/Reveal'
import { socials } from '../../data/socials'

export default function Contact() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const email = socials.find((s) => s.platform === 'email')!
  const others = socials.filter((s) => s.platform !== 'email')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email.handle)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <SectionShell id="contact" index="06" titleKey="contact.title" subtitle={t('contact.subtitle')}>
      <Reveal>
        <p className="eyebrow">{t('contact.emailLabel')}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={email.href}
            className="link-underline break-all text-[clamp(1.35rem,3.6vw,2.75rem)] font-bold tracking-tighter"
          >
            {email.handle}
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full border border-line/[0.12] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? t('contact.copied') : t('contact.copy')}
          </button>
        </div>
      </Reveal>

      <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 sm:grid-cols-2" stagger={0.07}>
        {others.map((s) => (
          <motion.a
            key={s.platform}
            variants={itemVariants}
            href={s.href}
            target={s.platform === 'phone' ? undefined : '_blank'}
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 bg-ink p-5 transition-colors duration-500 hover:bg-surface"
          >
            <span>
              <span className="eyebrow block">{s.label}</span>
              <span className="mt-1.5 block text-[15px] font-medium tracking-tight">{s.handle}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </motion.a>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-lg text-[14px] leading-relaxed text-muted text-pretty">{t('contact.closing')}</p>
      </Reveal>
    </SectionShell>
  )
}
