import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently under the reading line (≈35% from the top).
 * Queries the DOM on each scroll so it works with lazy-loaded pages and Lenis.
 */
export function useActiveSection(ids: string[], enabled = true): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }

    let frame = 0
    const compute = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= line && rect.bottom > line) {
          current = id
          break
        }
      }
      setActive((prev) => (prev === current ? prev : current))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }

    const timer = setInterval(compute, 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    compute()

    return () => {
      clearInterval(timer)
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, enabled])

  return active
}
