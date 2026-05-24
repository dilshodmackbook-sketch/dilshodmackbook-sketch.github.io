import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Github, Linkedin, Mail, ArrowUp, Heart, type LucideProps } from 'lucide-react'
import { socials } from '../../data/socials'
import type { SocialPlatform } from '../../types'

type IconComponent = ComponentType<LucideProps>

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const iconFor = (platform: SocialPlatform): IconComponent => {
    const map: Record<SocialPlatform, IconComponent> = {
      github: Github,
      linkedin: Linkedin,
      email: Mail,
    }
    return map[platform] || Mail
  }

  return (
    <footer className="relative z-10 border-t border-border mt-20">
      <div className="container-custom py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-violet-cyan flex items-center justify-center font-mono font-bold text-white">
                D
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-text-primary">Dilshod Bunyodov</span>
                <span className="text-xs text-text-muted font-mono">
                  Senior Frontend Engineer
                </span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm max-w-sm">
              {t('footer.tagline')} {t('footer.builtWith')}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-widest text-text-muted font-mono mb-4">
              {t('footer.sections.navigation')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-text-secondary hover:text-text-primary transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/blog" className="text-text-secondary hover:text-text-primary transition-colors">{t('nav.blog')}</Link></li>
              <li><a href="/#projects" className="text-text-secondary hover:text-text-primary transition-colors">{t('nav.projects')}</a></li>
              <li><a href="/#contact" className="text-text-secondary hover:text-text-primary transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-widest text-text-muted font-mono mb-4">
              {t('footer.sections.social')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = iconFor(s.platform)
                return (
                  <a
                    key={s.platform}
                    href={s.href}
                    target={s.platform !== 'email' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-violet hover:bg-bg-elevated transition-all"
                    aria-label={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
            <p className="mt-4 text-xs text-text-muted">
              dilshodbunyodov2020@gmail.com
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            © {year} Dilshod Bunyodov. {t('footer.rights')}
            <span className="inline-flex items-center gap-1 ml-2">
              Made with <Heart className="w-3 h-3 text-accent-pink fill-accent-pink" />
            </span>
          </p>
          <button
            onClick={scrollTop}
            className="group flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            {t('footer.scrollTop')}
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
