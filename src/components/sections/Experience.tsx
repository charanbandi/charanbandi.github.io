import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, ChevronRight } from 'lucide-react'
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

export default function Experience() {
  const [active, setActive] = useState(0)
  const exp = experiences[active]
  const color = accent[exp.company] ?? '#2dd4bf'

  return (
    <section id="experience" className="relative section-padding">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="03 / Experience"
          title="Career Timeline"
          description="From research lab to production infrastructure serving millions."
        />

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">

          {/* Tab list — horizontal scroll on mobile, vertical on desktop */}
          <div
            className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible
              pb-1 md:pb-0 flex-shrink-0 md:w-48"
            style={{ scrollbarWidth: 'none' }}
          >
            {experiences.map((e, i) => {
              const c = accent[e.company] ?? '#2dd4bf'
              const isActive = active === i
              return (
                <button
                  key={e.company + e.title}
                  onClick={() => setActive(i)}
                  className={`relative flex-shrink-0 text-left px-4 py-3 rounded-lg
                    transition-all duration-200 cursor-pointer
                    ${isActive
                      ? 'text-text-primary bg-white/[0.06]'
                      : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.03]'
                    }`}
                >
                  {/* Active indicator — left bar on desktop, bottom bar on mobile */}
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute md:left-0 md:top-2 md:bottom-2 md:w-0.5 md:h-auto
                        bottom-0 left-2 right-2 h-0.5 md:rounded-full rounded-full"
                      style={{ background: c }}
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                  <div className="md:pl-2">
                    <div className="text-sm font-semibold leading-tight whitespace-nowrap md:whitespace-normal">
                      {shortCompany(e.company)}
                    </div>
                    <div className="text-xs mt-0.5 text-text-muted whitespace-nowrap md:whitespace-normal leading-tight">
                      {e.title}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Content panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
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
                      <ChevronRight
                        size={14}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color }}
                      />
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
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
