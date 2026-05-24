import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { motion } from 'framer-motion'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import SectionHeader from '../components/sections/SectionHeader'
import { blogPosts } from '../data/blog'
import type { BlogAccent, BlogPost } from '../types'

export default function BlogList() {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="section pt-32"
    >
      <div className="container-custom">
        <SectionHeader
          eyebrow={t('blog.eyebrow')}
          title={t('blog.title')}
          subtitle={t('blog.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {blogPosts.map((post, idx) => (
            <BlogCard key={post.slug} post={post} index={idx} t={t} />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <p className="text-center text-text-muted py-20">{t('blog.noPosts')}</p>
        )}
      </div>
    </motion.div>
  )
}

interface BlogCardProps {
  post: BlogPost
  index: number
  t: TFunction
}

function BlogCard({ post, index, t }: BlogCardProps) {
  const accentMap: Record<BlogAccent, string> = {
    violet: 'from-violet-500 to-fuchsia-500',
    cyan: 'from-cyan-500 to-blue-500',
    pink: 'from-pink-500 to-rose-500',
    green: 'from-emerald-500 to-teal-500',
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block card card-hover overflow-hidden h-full"
      >
        {/* Top accent bar */}
        <div
          className={`-mx-6 -mt-6 mb-5 h-1.5 bg-gradient-to-r ${accentMap[post.accent]}`}
        />

        {/* Date + reading time */}
        <div className="flex items-center gap-3 text-xs text-text-muted font-mono mb-3">
          <span>{t(`blog.posts.${post.key}.date`)}</span>
          <span className="w-1 h-1 rounded-full bg-text-muted" />
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {t('blog.readingTime', { minutes: post.readingTime })}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-text-primary mb-3 group-hover:gradient-text transition-colors text-balance">
          {t(`blog.posts.${post.key}.title`)}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-text-secondary leading-relaxed mb-5 text-pretty">
          {t(`blog.posts.${post.key}.excerpt`)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-text-muted"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* Read more */}
        <div className="inline-flex items-center gap-1.5 text-sm font-semibold gradient-text">
          {t('blog.readMore')}
          <ArrowRight className="w-4 h-4 text-accent-cyan group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.article>
  )
}
