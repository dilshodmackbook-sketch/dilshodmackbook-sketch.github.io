import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTarget } from '../../lib/scroll'
import { refreshScrollTriggers } from '../../lib/gsap'

/** Scrolls to top on route change, or to the hash target once it exists (pages are lazy-loaded). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    refreshScrollTriggers(400)
    if (!hash) {
      scrollToTarget(0, 0, true)
      return
    }
    let attempts = 0
    const id = setInterval(() => {
      attempts += 1
      const el = document.querySelector<HTMLElement>(hash)
      if (el) {
        clearInterval(id)
        scrollToTarget(el, -72)
      } else if (attempts > 20) {
        clearInterval(id)
      }
    }, 100)
    return () => clearInterval(id)
  }, [pathname, hash])

  return null
}
