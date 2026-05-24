import { useState, useEffect, type MouseEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

interface NavLinkItem {
  to: string
  hash?: string
  label: string
  isRoute?: boolean
}

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isHome = location.pathname === '/'

  const navLinks: NavLinkItem[] = [
    { to: isHome ? '/#about' : '/', hash: '#about', label: t('nav.about') },
    { to: isHome ? '/#experience' : '/', hash: '#experience', label: t('nav.experience') },
    { to: isHome ? '/#skills' : '/', hash: '#skills', label: t('nav.skills') },
    { to: isHome ? '/#projects' : '/', hash: '#projects', label: t('nav.projects') },
    { to: '/blog', label: t('nav.blog'), isRoute: true },
    { to: isHome ? '/#contact' : '/', hash: '#contact', label: t('nav.contact') },
  ]

  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) return
    e.preventDefault()
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-primary/70 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label="Home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-violet-cyan flex items-center justify-center font-mono font-bold text-white shadow-glow-violet group-hover:scale-110 transition-transform">
              D
              <div className="absolute -inset-px rounded-xl bg-gradient-violet-cyan blur-md opacity-50 group-hover:opacity-80 transition-opacity -z-10" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-semibold text-text-primary">Dilshod</span>
              <span className="text-[10px] text-text-muted font-mono uppercase tracking-widest">
                Frontend Engineer
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.isRoute ? (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm rounded-full transition-colors link-underline ${
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-secondary hover:text-text-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ) : (
                <a
                  key={link.label}
                  href={link.hash}
                  onClick={(e) => link.hash && handleAnchor(e, link.hash)}
                  className="px-3 py-2 text-sm rounded-full text-text-secondary hover:text-text-primary transition-colors link-underline"
                >
                  {link.label}
                </a>
              ),
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Desktop-only controls */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <a
                href={isHome ? '#contact' : '/#contact'}
                onClick={(e) => handleAnchor(e, '#contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-violet-cyan text-white text-sm font-semibold hover:shadow-glow-violet transition-all hover:scale-105"
              >
                <Code2 className="w-4 h-4" />
                {t('nav.contact')}
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative w-10 h-10 rounded-xl border border-border bg-bg-card/60 backdrop-blur-md flex items-center justify-center text-text-primary hover:border-accent-violet transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-bg-primary/70 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-[4.5rem] inset-x-4 rounded-3xl glass-strong p-4 shadow-card max-h-[80vh] overflow-y-auto"
            >
              {/* Nav links */}
              <div className="flex flex-col mb-3">
                {navLinks.map((link) =>
                  link.isRoute ? (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 rounded-xl text-text-primary hover:bg-bg-card transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.hash}
                      onClick={(e) => {
                        if (link.hash) handleAnchor(e, link.hash)
                        setOpen(false)
                      }}
                      className="px-4 py-3 rounded-xl text-text-primary hover:bg-bg-card transition-colors"
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                <a
                  href={isHome ? '#contact' : '/#contact'}
                  onClick={(e) => {
                    handleAnchor(e, '#contact')
                    setOpen(false)
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-violet-cyan text-white text-sm font-semibold hover:shadow-glow-violet transition-all"
                >
                  <Code2 className="w-4 h-4" />
                  {t('nav.contact')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
