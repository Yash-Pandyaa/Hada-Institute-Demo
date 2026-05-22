import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.js'

export default function MagneticButton({ children, strength = 0.32, className = '', onClick, type = 'button' }) {
  const ref = useRef(null)

  useEffect(() => {
    const button = ref.current
    if (!button) return undefined
    const xTo = gsap.quickTo(button, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(button, 'y', { duration: 0.35, ease: 'power3.out' })
    const onMove = (event) => {
      const rect = button.getBoundingClientRect()
      xTo((event.clientX - rect.left - rect.width / 2) * strength)
      yTo((event.clientY - rect.top - rect.height / 2) * strength)
    }
    const onLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' })
    }
    button.addEventListener('mousemove', onMove)
    button.addEventListener('mouseleave', onLeave)
    return () => {
      button.removeEventListener('mousemove', onMove)
      button.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return (
    <button ref={ref} type={type} onClick={onClick} className={className}>
      {children}
    </button>
  )
}
