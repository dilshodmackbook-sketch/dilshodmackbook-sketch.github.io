import { useEffect, useState } from 'react'

interface UseTypewriterOptions {
  typingSpeed?: number
  deletingSpeed?: number
  pause?: number
}

export function useTypewriter(
  words: string[],
  { typingSpeed = 80, deletingSpeed = 40, pause = 1500 }: UseTypewriterOptions = {},
): string {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words || words.length === 0) return

    const current = words[index % words.length]
    let timeout: ReturnType<typeof setTimeout> | undefined

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          const next = deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1)
          setText(next)
        },
        deleting ? deletingSpeed : typingSpeed,
      )
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause])

  return text
}
