import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Reveal, { Stagger, itemVariants } from '../components/utils/Reveal'
import { blogPosts } from '../data/blog'

export default function BlogList() {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="container-site pb-24 pt-32 md:pt-40"
    >
      <Reveal>
        <p className="eyebrow">
          <span className="text-accent">{t('blog.eyebrow')}</span>
        </p>
        <h1 className="section-title mt-4">{t('blog.title')}</h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">{t('blog.subtitle')}</p>
      </Reveal>

      <Stagger className="mt-14 flex flex-col border-t border-line/10" stagger={0.08}>
        {blogPosts.map((post, i) => (
          <motion.article key={post.slug} variants={itemVariants} className="border-b border-line/10">
            <Link
              to={`/blog/${post.slug}`}
              className="group grid gap-3 py-7 transition-colors md:grid-cols-[minmax(0,9rem)_minmax(0,1fr)_auto] md:items-baseline md:gap-10"
            >
              <span className="font-mono text-[11px] tracking-[0.15em] text-faint">
                0{i + 1} · {t(`blog.posts.${post.key}.date`).toUpperCase()}
              </span>
              <span className="min-w-0">
                <span className="block text-xl font-bold tracking-tighter transition-colors group-hover:text-accent md:text-2xl">
                  {t(`blog.posts.${post.key}.title`)}
                </span>
                <span className="mt-2 block max-w-2xl text-[14px] leading-relaxed text-muted">
                  {t(`blog.posts.${post.key}.excerpt`)}
                </span>
                <span className="mt-3 flex flex-wrap gap-x-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                  <span>· {t('blog.readingTime', { minutes: post.readingTime })}</span>
                </span>
              </span>
              <ArrowUpRight className="hidden h-5 w-5 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block" />
            </Link>
          </motion.article>
        ))}
      </Stagger>

      {blogPosts.length === 0 && <p className="py-20 text-center text-muted">{t('blog.noPosts')}</p>}
    </motion.div>
  )
}
