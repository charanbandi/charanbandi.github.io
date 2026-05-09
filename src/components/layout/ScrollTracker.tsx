import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function ScrollTracker() {
  const [activeSection, setActiveSection] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight

      // Only show after scrolling past the hero
      setVisible(scrollY > vh * 0.5)

      // Determine which section is in view
      let current = ''
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Section is "active" when its top is within the upper 60% of the viewport
          if (rect.top <= vh * 0.5 && rect.bottom > vh * 0.2) {
            current = section.id
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-1"
        >
          {/* Vertical line behind dots */}
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-white/[0.06]" />

          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="relative flex items-center gap-3 py-2 group cursor-pointer"
              >
                {/* Dot */}
                <div className="relative z-10">
                  <motion.div
                    className={`w-[11px] h-[11px] rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-accent-cyan bg-accent-cyan/30 shadow-[0_0_8px_rgba(56,189,248,0.3)]'
                        : 'border-white/20 bg-bg-primary group-hover:border-white/40'
                    }`}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-accent-cyan translate-x-0 opacity-100'
                      : 'text-text-muted -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-text-secondary'
                  }`}
                >
                  {section.label}
                </span>
              </button>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
