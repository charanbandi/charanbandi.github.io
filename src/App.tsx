import { useEffect } from 'react'
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

export default function App() {
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
      <div className="relative min-h-screen bg-bg-primary">
        <div className="noise-overlay" />
        <ScrollProgressBar />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Publications />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
