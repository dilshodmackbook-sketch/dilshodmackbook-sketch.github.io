import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from 'lucide-react'
import { useState } from 'react'
import { blogPosts } from '../data/blog'
import type { BlogAccent } from '../types'

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
        await navigator.share({
          title: t(`blog.posts.${post.key}.title`),
          url,
        })
      } catch {
        // user dismissed
      }
    } else {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const accentMap: Record<BlogAccent, string> = {
    violet: 'from-violet-500 to-fuchsia-500',
    cyan: 'from-cyan-500 to-blue-500',
    pink: 'from-pink-500 to-rose-500',
    green: 'from-emerald-500 to-teal-500',
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="section pt-32"
    >
      <div className="container-custom max-w-3xl">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          {t('blog.backToBlog')}
        </Link>

        {/* Accent bar */}
        <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${accentMap[post.accent]} mb-6`} />

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted font-mono mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {t(`blog.posts.${post.key}.date`)}
          </span>
          <span className="w-1 h-1 rounded-full bg-text-muted" />
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {t('blog.readingTime', { minutes: post.readingTime })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">
          <span className="gradient-text">{t(`blog.posts.${post.key}.title`)}</span>
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-text-secondary leading-relaxed mb-6 text-pretty">
          {t(`blog.posts.${post.key}.excerpt`)}
        </p>

        {/* Tags + share */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-8 border-b border-border">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 chip text-[10px]"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>

        {/* Sections */}
        <div className="prose-content space-y-10">
          {post.sections.map((section, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <h2 className="text-2xl font-bold text-text-primary mb-4 text-balance">
                <span className="text-accent-violet font-mono mr-2">#</span>
                {section.heading}
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed text-pretty">
                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-10 border-t border-border text-center">
          <p className="text-text-secondary mb-4">Enjoyed this?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/blog" className="btn-secondary">
              {t('blog.backToBlog')}
            </Link>
            <Link to="/#contact" className="btn-primary">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
