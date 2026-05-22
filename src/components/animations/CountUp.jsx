import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.js'

export default function CountUp({ end, duration = 1.6, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const value = useRef({ current: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const tween = gsap.to(value.current, {
      current: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => setDisplay(Number(value.current.current).toFixed(decimals)),
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 86%',
        once: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [end, duration, decimals])

  return <span ref={ref}>{prefix}{display}{suffix}</span>
}
