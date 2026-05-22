import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.js'

export default function StaggerReveal({ children, stagger = 0.08, from = 40, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const targets = Array.from(element.children)
    const tween = gsap.from(targets, {
      y: from,
      opacity: 0,
      duration: 0.7,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [stagger, from])

  return <div ref={ref} className={className}>{children}</div>
}
