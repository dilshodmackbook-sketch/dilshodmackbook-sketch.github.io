import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../../lib/scroll'
import { gsap, ScrollTrigger, refreshScrollTriggers } from '../../lib/gsap'

export default function SmoothScroll() {
  useEffect(() => {
    const fontsReady = document.fonts?.ready
    fontsReady?.then(() => refreshScrollTriggers(100))

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
    })
    setLenis(lenis)

    // Drive Lenis from GSAP's ticker so ScrollTrigger and Lenis stay in sync.
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
