import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  duration?: number
  start?: number
}

export function useCountUp(
  target: number,
  { duration = 1500, start = 0 }: UseCountUpOptions = {},
): [number, React.RefObject<HTMLDivElement>] {
  const [value, setValue] = useState(start)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(start + (target - start) * eased))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration, start])

  return [value, ref]
}
