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

    return () => {
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
