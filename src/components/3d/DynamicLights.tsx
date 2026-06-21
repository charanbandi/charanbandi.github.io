import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface LightConfig {
  ambientColor: string
  ambientIntensity: number
  keyColor: string
  keyIntensity: number
  keyPosition: [number, number, number]
  fillColor: string
  fillIntensity: number
  fillPosition: [number, number, number]
  accentColor: string
  accentIntensity: number
  accentPosition: [number, number, number]
}

const CONFIGS: Record<string, LightConfig> = {
  hero: {
    ambientColor: '#1a2a4a', ambientIntensity: 0.6,
    keyColor: '#b0c8ff', keyIntensity: 1.2, keyPosition: [-3, 5, 2],
    fillColor: '#7090ff', fillIntensity: 0.5, fillPosition: [0, 2, 6],
    accentColor: '#8855ff', accentIntensity: 0.8, accentPosition: [3, 2, -3],
  },
  about: {
    ambientColor: '#d4f0c8', ambientIntensity: 1.0,
    keyColor: '#fff5d0', keyIntensity: 1.8, keyPosition: [3, 6, 2],
    fillColor: '#e8ffe0', fillIntensity: 0.6, fillPosition: [-2, 2, 6],
    accentColor: '#80ff80', accentIntensity: 0.4, accentPosition: [-3, 2, -3],
  },
  skills: {
    ambientColor: '#a0c8d8', ambientIntensity: 0.7,
    keyColor: '#e0f0ff', keyIntensity: 1.4, keyPosition: [0, 6, 2],
    fillColor: '#c0e8ff', fillIntensity: 0.5, fillPosition: [3, 2, 6],
    accentColor: '#00ddff', accentIntensity: 1.0, accentPosition: [-3, 2, -3],
  },
  experience: {
    ambientColor: '#051020', ambientIntensity: 0.4,
    keyColor: '#8090c0', keyIntensity: 1.0, keyPosition: [-2, 5, 2],
    fillColor: '#4060a0', fillIntensity: 0.3, fillPosition: [2, 2, 6],
    accentColor: '#00ff88', accentIntensity: 0.6, accentPosition: [3, 1, -3],
  },
  education: {
    ambientColor: '#2a1a08', ambientIntensity: 0.8,
    keyColor: '#ffb050', keyIntensity: 1.6, keyPosition: [0, 6, 1],
    fillColor: '#ff9030', fillIntensity: 0.4, fillPosition: [-2, 2, 6],
    accentColor: '#ffd080', accentIntensity: 0.5, accentPosition: [3, 2, -3],
  },
  publications: {
    ambientColor: '#d0d8e8', ambientIntensity: 0.9,
    keyColor: '#ffffff', keyIntensity: 1.8, keyPosition: [0, 6, 2],
    fillColor: '#e0e8ff', fillIntensity: 0.5, fillPosition: [-3, 2, 6],
    accentColor: '#c0d8ff', accentIntensity: 0.3, accentPosition: [3, 2, -3],
  },
  projects: {
    ambientColor: '#1a1008', ambientIntensity: 0.6,
    keyColor: '#ffcc70', keyIntensity: 1.2, keyPosition: [0, 5, 2],
    fillColor: '#2040a0', fillIntensity: 0.4, fillPosition: [3, 2, 6],
    accentColor: '#ff9940', accentIntensity: 0.7, accentPosition: [-3, 3, -3],
  },
  contact: {
    ambientColor: '#201030', ambientIntensity: 0.7,
    keyColor: '#ffaa50', keyIntensity: 1.4, keyPosition: [2, 4, 2],
    fillColor: '#d080ff', fillIntensity: 0.4, fillPosition: [-3, 2, 6],
    accentColor: '#ff6080', accentIntensity: 0.5, accentPosition: [3, 3, -3],
  },
}

const FALLBACK = CONFIGS.hero

export default function DynamicLights({ activeSection }: { activeSection: string }) {
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const keyRef = useRef<THREE.DirectionalLight>(null)
  const fillRef = useRef<THREE.DirectionalLight>(null)
  const accentRef = useRef<THREE.PointLight>(null)
  const tmp = useRef(new THREE.Color())

  const current = useRef({
    ambientColor: new THREE.Color(FALLBACK.ambientColor),
    ambientIntensity: FALLBACK.ambientIntensity,
    keyColor: new THREE.Color(FALLBACK.keyColor),
    keyIntensity: FALLBACK.keyIntensity,
    fillColor: new THREE.Color(FALLBACK.fillColor),
    fillIntensity: FALLBACK.fillIntensity,
    accentColor: new THREE.Color(FALLBACK.accentColor),
    accentIntensity: FALLBACK.accentIntensity,
  })

  const target = useRef<LightConfig>(FALLBACK)

  useEffect(() => {
    target.current = CONFIGS[activeSection] ?? FALLBACK
  }, [activeSection])

  useFrame((_, delta) => {
    const t = Math.min(1, delta * 2.0)
    const c = current.current
    const tgt = target.current

    c.ambientColor.lerp(tmp.current.set(tgt.ambientColor), t)
    c.ambientIntensity = THREE.MathUtils.lerp(c.ambientIntensity, tgt.ambientIntensity, t)
    c.keyColor.lerp(tmp.current.set(tgt.keyColor), t)
    c.keyIntensity = THREE.MathUtils.lerp(c.keyIntensity, tgt.keyIntensity, t)
    c.fillColor.lerp(tmp.current.set(tgt.fillColor), t)
    c.fillIntensity = THREE.MathUtils.lerp(c.fillIntensity, tgt.fillIntensity, t)
    c.accentColor.lerp(tmp.current.set(tgt.accentColor), t)
    c.accentIntensity = THREE.MathUtils.lerp(c.accentIntensity, tgt.accentIntensity, t)

    if (ambientRef.current) {
      ambientRef.current.color.copy(c.ambientColor)
      ambientRef.current.intensity = c.ambientIntensity
    }
    if (keyRef.current) {
      keyRef.current.color.copy(c.keyColor)
      keyRef.current.intensity = c.keyIntensity
    }
    if (fillRef.current) {
      fillRef.current.color.copy(c.fillColor)
      fillRef.current.intensity = c.fillIntensity
    }
    if (accentRef.current) {
      accentRef.current.color.copy(c.accentColor)
      accentRef.current.intensity = c.accentIntensity
    }
  })

  const cfg = CONFIGS[activeSection] ?? FALLBACK

  return (
    <>
      <ambientLight ref={ambientRef} color={FALLBACK.ambientColor} intensity={FALLBACK.ambientIntensity} />
      <directionalLight ref={keyRef} color={FALLBACK.keyColor} intensity={FALLBACK.keyIntensity} position={cfg.keyPosition} />
      <directionalLight ref={fillRef} color={FALLBACK.fillColor} intensity={FALLBACK.fillIntensity} position={cfg.fillPosition} />
      <pointLight ref={accentRef} color={FALLBACK.accentColor} intensity={FALLBACK.accentIntensity} position={cfg.accentPosition} />
    </>
  )
}
