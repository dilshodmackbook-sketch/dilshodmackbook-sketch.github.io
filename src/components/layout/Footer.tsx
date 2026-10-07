import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUp } from 'lucide-react'
import { socials } from '../../data/socials'
import { scrollToTarget } from '../../lib/scroll'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const links = socials.filter((s) => s.platform !== 'phone')

  return (
    <footer className="relative z-10 border-t border-line/10">
      <div className="container-site py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto_auto] md:gap-16">
          <div>
            <Link to="/" className="flex items-baseline gap-2">
              <span className="font-mono text-[13px] font-medium">DB</span>
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[13px] font-semibold tracking-tight">Dilshod Bunyodov</span>
            </Link>
            <p className="mt-3 text-[13px] text-muted">{t('footer.tagline')}</p>
            <p className="mt-1 text-[12px] text-faint">{t('footer.builtWith')}</p>
          </div>

          <div>
            <p className="eyebrow mb-4">{t('footer.navigation')}</p>
            <ul className="space-y-2 text-[13px]">
              {['about', 'experience', 'projects', 'skills', 'contact'].map((id) => (
                <li key={id}>
                  <Link to={`/#${id}`} className="link-underline text-muted hover:text-fg">
                    {t(`nav.${id}`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="link-underline text-muted hover:text-fg">
                  {t('nav.blog')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">{t('footer.social')}</p>
            <ul className="space-y-2 text-[13px]">
              {links.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    target={s.platform === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                    className="link-underline text-muted hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-line/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] tracking-[0.15em] text-faint">
            © {year} DILSHOD BUNYODOV · {t('footer.rights').toUpperCase()}
          </p>
          <button
            type="button"
            onClick={() => scrollToTarget(0, 0)}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-fg"
          >
            {t('footer.scrollTop')}
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line/[0.12] transition-all duration-300 group-hover:border-accent group-hover:text-accent">
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
