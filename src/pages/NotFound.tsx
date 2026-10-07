import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="container-site flex min-h-[80vh] flex-col justify-center pt-24"
    >
      <p className="eyebrow">
        <span className="text-accent">404</span> — {t('common.notFound')}
      </p>
      <h1 className="mt-4 text-[clamp(3rem,12vw,9rem)] font-extrabold uppercase leading-[0.86] tracking-tightest">
        <span className="block">Not</span>
        <span className="text-outline block">Found</span>
      </h1>
      <p className="mt-8 max-w-md text-[15px] text-muted">{t('common.notFoundDesc')}</p>
      <Link to="/" className="btn-solid mt-8 w-fit">
        <ArrowLeft className="h-4 w-4" />
        {t('common.goHome')}
      </Link>
    </motion.div>
  )
}
