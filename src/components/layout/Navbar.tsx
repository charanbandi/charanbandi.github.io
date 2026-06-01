import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, User, Code2, Briefcase, BookOpen, Layers, Mail, GraduationCap } from 'lucide-react'
import { scrollToSection } from '../../utils/scroll'

const sections = [
  { id: 'about',        label: 'About',        href: '#about',        Icon: User },
  { id: 'skills',       label: 'Skills',       href: '#skills',       Icon: Code2 },
  { id: 'experience',   label: 'Experience',   href: '#experience',   Icon: Briefcase },
  { id: 'education',    label: 'Education',    href: '#education',    Icon: GraduationCap },
  { id: 'publications', label: 'Publications', href: '#publications', Icon: BookOpen },
  { id: 'projects',     label: 'Projects',     href: '#projects',     Icon: Layers },
  { id: 'contact',      label: 'Contact',      href: '#contact',      Icon: Mail },
]

function useActiveSection() {
  const [active, setActive] = useState('')
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      setPastHero(window.scrollY > vh * 0.6)

      let current = ''
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= vh * 0.45 && rect.bottom > vh * 0.15) {
            current = s.id
          }
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return { active, pastHero }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { active, pastHero } = useActiveSection()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href: string) => {
    setMobileOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong' : 'bg-bg-primary/40 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-lg text-text-primary cursor-pointer flex-shrink-0"
          >
            CB
          </button>

          {/* Mobile: inline section icons — centered, appear after hero */}
          <div className="flex-1 flex items-center justify-center md:hidden">
            <AnimatePresence>
              {pastHero && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  {sections.map(({ id, href, Icon }) => {
                    const isActive = active === id
                    return (
                      <button
                        key={id}
                        onClick={() => handleClick(href)}
                        className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                          isActive ? 'text-accent-cyan' : 'text-text-muted hover:text-text-secondary'
                        }`}
                      >
                        <Icon size={15} />
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-0.5">
            {sections.map((s) => (
              <button
                key={s.href}
                onClick={() => handleClick(s.href)}
                className={`relative flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors duration-200 ${
                  active === s.id
                    ? 'text-accent-cyan'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <s.Icon size={13} />
                {s.label}
                {active === s.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0.5 left-3 right-3 h-px bg-accent-cyan/60"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side: Resume (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="/resume/Charan_Bandi_Resume_Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                bg-white/[0.05] text-text-secondary border border-border-subtle
                hover:text-text-primary hover:border-text-muted transition-all duration-200"
            >
              <Download size={13} />
              Resume
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile hamburger menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 glass-strong p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {sections.map((s) => (
                <button
                  key={s.href}
                  onClick={() => handleClick(s.href)}
                  className={`px-4 py-3 text-left text-sm rounded-lg transition-colors cursor-pointer ${
                    active === s.id
                      ? 'text-accent-cyan bg-accent-cyan/[0.05]'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
              <a
                href="/resume/Charan_Bandi_Resume_Portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg
                  bg-white/[0.05] text-text-secondary border border-border-subtle"
              >
                <Download size={13} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
