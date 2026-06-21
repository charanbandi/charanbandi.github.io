import { useEffect, useLayoutEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import type { Group } from 'three'

// One GLB: a single shared mesh + skeleton with all 8 animations as named
// clips. ~2 MB total (vs ~58 MB when each animation shipped its own mesh).
const MODEL = '/models/character.glb'
useGLTF.preload(MODEL)

// Section id -> animation clip name (clips were named per-section at build time)
const SECTION_CLIPS: Record<string, string> = {
  hero:         'hero',
  about:        'about',
  skills:       'skills',
  experience:   'experience',
  education:    'education',
  publications: 'publications',
  projects:     'projects',
  contact:      'contact',
}

const FACING = 0  // GLB already faces the camera (+Z) at zero rotation
const SWAY = 0.3  // radians of gentle left/right idle sway

export default function Character({ activeSection }: { activeSection: string }) {
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF(MODEL)
  const { actions } = useAnimations(animations, group)
  const prefersReduced = useReducedMotion()

  const clip = SECTION_CLIPS[activeSection] ?? 'hero'

  // Crossfade between clips on the same skeleton — the body blends smoothly
  // from one pose into the next instead of hard-swapping.
  useEffect(() => {
    const action = actions[clip]
    if (!action) return
    action.reset().fadeIn(0.4).play()
    return () => {
      action.fadeOut(0.4)
    }
  }, [actions, clip])

  // Face the camera before first paint (avoids a one-frame backwards flash)
  const rotY = useRef(FACING)
  const dir = useRef(1)
  useLayoutEffect(() => {
    if (group.current) group.current.rotation.y = FACING
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    if (!prefersReduced) {
      rotY.current += delta * 0.18 * dir.current
      if (rotY.current > FACING + SWAY) dir.current = -1
      if (rotY.current < FACING - SWAY) dir.current = 1
      group.current.rotation.y = rotY.current
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={1} position={[0, -1.4, 0]} />
    </group>
  )
}
