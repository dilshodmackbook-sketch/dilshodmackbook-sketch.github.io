import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-[80vh] flex items-center justify-center pt-24"
    >
      <div className="text-center px-6">
        <div className="text-[10rem] md:text-[14rem] font-extrabold leading-none gradient-text font-mono">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mt-4 mb-2">
          {t('common.notFound')}
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          {t('common.notFoundDesc')}
        </p>
        <Link to="/" className="btn-primary">
          <Home className="w-4 h-4" />
          {t('common.goHome')}
        </Link>
      </div>
    </motion.div>
  )
}
