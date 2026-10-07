import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out' })

export { gsap, ScrollTrigger }

/** Debounced ScrollTrigger refresh for after lazy content / fonts settle. */
let refreshTimer: ReturnType<typeof setTimeout> | undefined
export function refreshScrollTriggers(delay = 250) {
  if (refreshTimer) clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), delay)
}
