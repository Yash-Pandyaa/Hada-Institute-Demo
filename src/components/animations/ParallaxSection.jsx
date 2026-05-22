import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.js'

export default function ParallaxSection({ children, speed = 0.25, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const tween = gsap.to(ref.current, {
      y: `${speed * -120}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [speed])

  return <div ref={ref} className={className}>{children}</div>
}
