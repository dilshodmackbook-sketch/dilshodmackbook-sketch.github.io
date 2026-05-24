import { motion } from 'framer-motion'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`mb-10 md:mb-16 max-w-3xl ${alignment}`}
    >
      {eyebrow && (
        <p className="text-xs font-mono uppercase tracking-widest text-accent-violet mb-3">
          <span className="text-text-muted mr-2">/</span>
          {eyebrow}
        </p>
      )}
      <h2 className="section-title">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  )
}
