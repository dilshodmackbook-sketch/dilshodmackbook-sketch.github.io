import { useTranslation } from 'react-i18next'
import { useCountUp } from '../../hooks/useCountUp'

interface StatProps {
  value: number
  suffix: string
  label: string
}

export default function StatsBar() {
  const { t } = useTranslation()
  const stats: StatProps[] = [
    { value: 5, suffix: '+', label: t('hero.stats.yearsLabel') },
    { value: 30, suffix: '+', label: t('hero.stats.projectsLabel') },
    { value: 5, suffix: '', label: t('hero.stats.companiesLabel') },
    { value: 20, suffix: '+', label: t('hero.stats.clientsLabel') },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl glass p-6">
      {stats.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </div>
  )
}

function Stat({ value, suffix, label }: StatProps) {
  const [count, ref] = useCountUp(value, { duration: 1400 })
  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-3xl md:text-4xl font-bold gradient-text font-mono">
        {count}
        {suffix}
      </div>
      <div className="text-xs md:text-sm text-text-muted mt-1 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}
