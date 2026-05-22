import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField() {
  const points = useRef(null)
  const geometry = useRef(null)
  const material = useRef(null)
  const [positions] = useState(() => {
    const count = 1200
    const values = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 12
      values[index * 3 + 1] = (Math.random() - 0.5) * 7
      values[index * 3 + 2] = (Math.random() - 0.5) * 7
    }
    return values
  })
  const { pointer } = useThree()

  useFrame((state) => {
    if (!points.current || !material.current) return
    points.current.rotation.y += 0.0009
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, pointer.y * 0.11, 0.035)
    points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, pointer.x * -0.22, 0.04)
    material.current.size = THREE.MathUtils.lerp(material.current.size, 0.035 + Math.abs(pointer.x) * 0.012, 0.05)
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.14
  })

  useEffect(() => () => {
    geometry.current?.dispose()
    material.current?.dispose()
  }, [])

  return (
    <points ref={points}>
      <bufferGeometry ref={geometry}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color="#F0C96E"
        size={0.035}
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (isMobile) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,168,67,0.22),transparent_38%),linear-gradient(135deg,#07070D,#11111d)]" />
    )
  }

  return (
    <div className="absolute inset-0">
      <Canvas className="h-full w-full" camera={{ position: [0, 0, 7], fov: 62 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.55} />
        <ParticleField />
      </Canvas>
    </div>
  )
}
