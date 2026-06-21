import { Canvas } from '@react-three/fiber'
import { ContactShadows, useProgress } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import Character from './Character'
import DynamicLights from './DynamicLights'

interface SceneProps {
  activeSection: string
}

function SceneLoader() {
  const { active, progress } = useProgress()
  const wasActive = useRef(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (active) wasActive.current = true
    if (!active && wasActive.current) setDone(true)
  }, [active])

  if (done || !active) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-accent-cyan/25 border-t-accent-cyan animate-spin" />
        <span className="text-[10px] tracking-widest uppercase text-text-muted">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}

export default function Scene({ activeSection }: SceneProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={2.5} />
        <DynamicLights activeSection={activeSection} />
        <Suspense fallback={null}>
          <Character activeSection={activeSection} />
          <ContactShadows position={[0, -2.1, 0]} opacity={0.35} scale={5} blur={2.5} far={4} />
        </Suspense>
      </Canvas>
      <SceneLoader />
    </div>
  )
}
