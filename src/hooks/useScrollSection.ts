import { useState, useEffect } from 'react'

const SECTIONS = [
  'hero',
  'about',
  'skills',
  'experience',
  'education',
  'publications',
  'projects',
  'contact',
]

export function useScrollSection() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.35 },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return { activeSection }
}
