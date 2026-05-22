import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText } from '../../lib/gsap.js'

export default function SplitTextReveal({ children, type = 'words', delay = 0, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    let split
    try {
      split = new SplitText(element, { type })
    } catch {
      split = { words: [element], chars: [element], revert: () => {} }
    }
    const parts = type === 'chars' ? split.chars : split.words
    const tween = gsap.from(parts, {
      yPercent: 115,
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
      stagger: type === 'chars' ? 0.018 : 0.055,
      delay,
      duration: 0.85,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 86%',
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      split.revert()
      ScrollTrigger.refresh()
    }
  }, [type, delay])

  return <span ref={ref} className={`inline-block overflow-hidden ${className}`}>{children}</span>
}
