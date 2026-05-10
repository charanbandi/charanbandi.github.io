import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, ChevronRight, ChevronLeft } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { experiences } from '../../data/experience'

const accent: Record<string, string> = {
  'Gen Digital':             '#2dd4bf',
  'NortonLifeLock':          '#3b82f6',
  'George Mason University': '#fbbf24',
  'Cyient Ltd':              '#34d399',
}

const shortCompany = (name: string) =>
  name.replace('George Mason University', 'George Mason')

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
}

export default function Experience() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef(0)
  const mobileInnerRef = useRef<HTMLDivElement>(null)
  const [mobileMinH, setMobileMinH] = useState(0)

  // Ratchet the mobile container's min-height up to the tallest card seen so
  // that switching to a shorter card never causes a layout-reflow shrink.
  useEffect(() => {
    const el = mobileInnerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight
      if (h > 0) setMobileMinH(prev => Math.max(prev, h))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const go = (index: number) => {
    setDirection(index > active ? 1 : -1)
    setActive(index)
  }

  const prev = () => { if (active > 0) go(active - 1) }
  const next = () => { if (active < experiences.length - 1) go(active + 1) }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) {
      if (delta > 0) next()
      else prev()
    }
  }

  const exp = experiences[active]
  const color = accent[exp.company] ?? '#2dd4bf'

  // Shared card content
  const card = (
    <motion.div
      key={active}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="glass rounded-xl overflow-hidden"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      {/* Header */}
      <div
        className="px-6 md:px-8 py-5 md:py-6"
        style={{ background: `${color}14`, borderBottom: `1px solid ${color}20` }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary leading-tight">
              {exp.title}
            </h3>
            <p className="text-base font-semibold mt-1.5" style={{ color }}>
              {exp.company}
            </p>
          </div>
          <div className="flex sm:flex-col gap-3 sm:gap-2 flex-shrink-0 sm:items-end">
            <div className="flex items-center gap-1.5 text-sm text-text-muted">
              <Calendar size={13} />
              {exp.duration}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-text-muted">
              <MapPin size={13} />
              {exp.location}
            </div>
          </div>
        </div>
      </div>

      {/* Bullets */}
      <div className="px-6 md:px-8 py-6 space-y-4">
        {exp.description.map((bullet, i) => (
          <div key={i} className="flex gap-3 text-[15px] font-medium text-text-primary/85 leading-relaxed">
            <ChevronRight size={14} className="flex-shrink-0 mt-0.5" style={{ color }} />
            {bullet}
          </div>
        ))}
      </div>

      {/* Tech tags */}
      {exp.technologies.length > 0 && (
        <div className="px-6 md:px-8 pb-6 pt-1 border-t border-white/[0.06]">
          <div className="flex flex-wrap gap-1.5 mt-4">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-medium
                  text-text-muted bg-white/[0.04] border border-white/[0.07]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )

  return (
    <section id="experience" className="relative section-padding">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="03 / Experience"
          title="Career Timeline"
          description="From research lab to production infrastructure serving millions."
        />

        {/* ── MOBILE: carousel with prev/next + dots ── */}
        <div className="md:hidden">
          {/* Navigation row */}
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={prev}
              disabled={active === 0}
              className={`p-2 rounded-lg transition-all duration-200 cursor-pointer flex-shrink-0 ${
                active === 0
                  ? 'text-white/15 cursor-not-allowed'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/[0.06]'
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Company + counter */}
            <div className="flex-1 text-center min-w-0">
              <div className="text-sm font-bold leading-tight truncate" style={{ color }}>
                {shortCompany(exp.company)}
              </div>
              <div className="text-xs text-text-muted mt-0.5">
                {active + 1} of {experiences.length}
              </div>
            </div>

            <button
              onClick={next}
              disabled={active === experiences.length - 1}
              className={`p-2 rounded-lg transition-all duration-200 cursor-pointer flex-shrink-0 ${
                active === experiences.length - 1
                  ? 'text-white/15 cursor-not-allowed'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/[0.06]'
              }`}
            >
              <ChevronLeft size={20} className="rotate-180" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-1.5 mb-4">
            {experiences.map((e, i) => {
              const c = accent[e.company] ?? '#2dd4bf'
              return (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    width: i === active ? 20 : 6,
                    height: 6,
                    borderRadius: 9999,
                    background: i === active ? c : 'rgba(255,255,255,0.18)',
                  }}
                />
              )
            })}
          </div>

          {/* Swipeable card — outer clips x-overflow (no BFC, won't affect y),
              minHeight prevents height-shrink layout reflow when switching cards */}
          <div
            style={{ overflowX: 'clip', minHeight: mobileMinH || undefined }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div ref={mobileInnerRef}>
              <AnimatePresence mode="wait" custom={direction}>
                {card}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── DESKTOP: vertical tabs + content panel ── */}
        <div className="hidden md:flex gap-8">

          {/* Tab list */}
          <div className="flex flex-col gap-0.5 flex-shrink-0 w-48">
            {experiences.map((e, i) => {
              const c = accent[e.company] ?? '#2dd4bf'
              const isActive = active === i
              return (
                <button
                  key={e.company + e.title}
                  onClick={() => go(i)}
                  className={`relative text-left px-4 py-3 rounded-lg
                    transition-all duration-200 cursor-pointer
                    ${isActive
                      ? 'text-text-primary bg-white/[0.06]'
                      : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.03]'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                      style={{ background: c }}
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                  <div className="pl-2">
                    <div className="text-sm font-semibold leading-tight">
                      {shortCompany(e.company)}
                    </div>
                    <div className="text-xs mt-0.5 text-text-muted leading-tight">
                      {e.title}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Content panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait" custom={direction}>
              {card}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
