import { useEffect, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Publications from './components/sections/Publications'
import Contact from './components/sections/Contact'
import ScrollProgressBar from './components/ui/ScrollProgressBar'
import { setLenisInstance } from './utils/lenisStore'
import { useScrollSection } from './hooks/useScrollSection'
import { useMediaQuery } from './hooks/useMediaQuery'

const Scene = lazy(() => import('./components/3d/Scene'))

export default function App() {
  const { activeSection } = useScrollSection()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.55,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
    setLenisInstance(lenis)

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative bg-bg-primary">
        <div className="noise-overlay" />
        <ScrollProgressBar />
        <Navbar />

        <div className="flex items-start">

          {/* ── Left: sticky 3D character (desktop only) ── */}
          {isDesktop && (
            <aside className="flex flex-col items-center justify-center sticky top-16 h-[calc(100vh-4rem)] w-[25%] flex-shrink-0">
              <div className="w-full h-full">
                <Suspense fallback={null}>
                  <Scene activeSection={activeSection} />
                </Suspense>
              </div>
            </aside>
          )}

          {/* ── Right: scrollable sections ── */}
          <main className="w-full md:w-[75%]">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Education />
            <Publications />
            <Projects />
            <Contact />
            <Footer />
          </main>

        </div>
      </div>
    </MotionConfig>
  )
}
