import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
  as?: 'div' | 'section' | 'li' | 'p' | 'span'
}

const ease = [0.16, 1, 0.3, 1] as const

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease, delay },
  }),
}

export default function Reveal({ children, delay = 0, y = 28, className, once = true, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
    >
      {children}
    </Tag>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}

export function Stagger({ children, className, stagger = 0.06, delay = 0 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export function LineReveal({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      transition={{ duration: 1.2, ease, delay }}
      className={`h-px w-full origin-left bg-line/15 ${className}`}
    />
  )
}
