import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownToLine } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { CV_FILENAME, CV_PATH } from '../../data/socials'
import { scrollToTarget, getLenis } from '../../lib/scroll'
import { useActiveSection } from '../../hooks/useActiveSection'

interface NavItem {
  id: string
  to: string
  label: string
  isRoute?: boolean
}

const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'contact']

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isHome = location.pathname === '/'
  const active = useActiveSection(SECTION_IDS, isHome)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    } else {
      document.body.style.overflow = ''
      lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [open])

  const items: NavItem[] = useMemo(
    () => [
      { id: 'about', to: '/#about', label: t('nav.about') },
      { id: 'experience', to: '/#experience', label: t('nav.experience') },
      { id: 'projects', to: '/#projects', label: t('nav.projects') },
      { id: 'skills', to: '/#skills', label: t('nav.skills') },
      { id: 'blog', to: '/blog', label: t('nav.blog'), isRoute: true },
      { id: 'contact', to: '/#contact', label: t('nav.contact') },
    ],
    [t],
  )

  const onAnchor = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome) return
    e.preventDefault()
    setOpen(false)
    scrollToTarget(`#${id}`, -72)
  }

  const isActive = (item: NavItem) =>
    item.isRoute ? location.pathname.startsWith(item.to) : isHome && active === item.id

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-line/10 bg-ink/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="container-site flex h-16 items-center justify-between md:h-[4.5rem]">
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault()
                scrollToTarget(0, 0)
              }
            }}
            className="group flex items-baseline gap-2"
            aria-label="Home"
          >
            <span className="font-mono text-[13px] font-medium tracking-tight text-fg">DB</span>
            <span className="h-1 w-1 rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-[2.2]" />
            <span className="hidden text-[13px] font-semibold tracking-tight text-muted transition-colors group-hover:text-fg sm:inline">
              dilshod.bunyodov
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  onClick={(e) => !item.isRoute && onAnchor(e, item.id)}
                  className={`nav-link ${isActive(item) ? 'is-active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher className="hidden sm:flex" />
            <ThemeToggle />
            <a
              href={CV_PATH}
              download={CV_FILENAME}
              className="btn-solid btn-sm hidden md:inline-flex"
            >
              {t('nav.resume')}
              <ArrowDownToLine className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t('nav.close') : t('nav.menu')}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line/[0.12] lg:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${
                  open ? 'rotate-45' : '-translate-y-[3px]'
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${
                  open ? '-rotate-45' : 'translate-y-[3px]'
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-site flex h-full flex-col pb-10 pt-24">
              <ul className="flex flex-col">
                {items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line/10"
                  >
                    <Link
                      to={item.to}
                      onClick={(e) => {
                        if (item.isRoute) {
                          setOpen(false)
                          return
                        }
                        onAnchor(e, item.id)
                      }}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className="text-3xl font-bold tracking-tighter">{item.label}</span>
                      <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                <LanguageSwitcher />
                <a href={CV_PATH} download={CV_FILENAME} className="btn-solid btn-sm">
                  {t('nav.resume')}
                  <ArrowDownToLine className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
