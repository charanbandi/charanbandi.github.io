import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Publications from './components/sections/Publications'
import Contact from './components/sections/Contact'
import { useScrollProgress } from './hooks/useScrollProgress'

export default function App() {
  const scrollProgress = useScrollProgress()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.55,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Section snap: after scrolling stops, nudge to the nearest section boundary
    // if we're stranded in the gap between two sections.
    const sectionIds = ['hero', 'about', 'skills', 'experience', 'publications', 'projects', 'contact']
    let snapTimer: ReturnType<typeof setTimeout>
    let isSnapping = false

    lenis.on('scroll', () => {
      if (isSnapping) return
      clearTimeout(snapTimer)
      snapTimer = setTimeout(() => {
        const vh = window.innerHeight

        // Find the section whose top is closest to the viewport top
        let bestEl: Element | null = null
        let bestDist = Infinity

        for (const id of sectionIds) {
          const el = document.getElementById(id) ?? (id === 'hero' ? document.querySelector('section') : null)
          if (!el) continue
          const top = el.getBoundingClientRect().top
          const dist = Math.abs(top)
          if (dist < bestDist) {
            bestDist = dist
            bestEl = el
          }
        }

        // Only snap if the section boundary is within 35% of the viewport height —
        // any further in and we're clearly reading that section, so leave it alone.
        if (bestEl && bestDist > 8 && bestDist < vh * 0.35) {
          isSnapping = true
          lenis.scrollTo(bestEl as HTMLElement, {
            duration: 0.5,
            offset: 0,
            onComplete: () => { isSnapping = false },
          })
        }
      }, 180)
    })

    return () => {
      clearTimeout(snapTimer)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-bg-primary">
      <div className="noise-overlay" />

      <div
        className="fixed top-0 left-0 h-px z-[60] bg-accent-cyan/50 transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Publications />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
