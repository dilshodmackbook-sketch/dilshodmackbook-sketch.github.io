import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, Check } from 'lucide-react'
import Reveal from '../components/utils/Reveal'
import { blogPosts } from '../data/blog'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const post = blogPosts.find((p) => p.slug === slug)
  const [copied, setCopied] = useState(false)

  if (!post) return <Navigate to="/blog" replace />

  const onShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: t(`blog.posts.${post.key}.title`), url })
      } catch {
        // dismissed
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="container-site pb-24 pt-32 md:pt-40"
    >
      <div className="mx-auto max-w-3xl">
        <Link
          to="/blog"
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          {t('blog.backToBlog')}
        </Link>

        <Reveal className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.15em] text-faint">
            {t(`blog.posts.${post.key}.date`).toUpperCase()} · {t('blog.readingTime', { minutes: post.readingTime }).toUpperCase()}
          </p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-tighter text-balance">
            {t(`blog.posts.${post.key}.title`)}
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-muted text-pretty">{t(`blog.posts.${post.key}.excerpt`)}</p>
        </Reveal>

        <div className="mt-8 flex items-center justify-between gap-4 border-y border-line/10 py-4">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="chip px-2.5 py-0.5 text-[11px]">
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-fg"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Share'}
          </button>
        </div>

        <div className="mt-12 space-y-12">
          {post.sections.map((section, idx) => (
            <Reveal key={idx} as="section">
              <h2 className="flex items-baseline gap-3 text-2xl font-bold tracking-tighter">
                <span className="font-mono text-[11px] text-accent">0{idx + 1}</span>
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-muted text-pretty">
                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-3 border-t border-line/10 pt-10">
          <Link to="/blog" className="btn-ghost">
            {t('blog.backToBlog')}
          </Link>
          <Link to="/#contact" className="btn-solid">
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
