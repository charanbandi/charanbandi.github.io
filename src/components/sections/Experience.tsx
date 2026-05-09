import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, ChevronDown } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { experiences } from '../../data/experience'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index))
  }

  return (
    <section id="experience" className="relative section-padding">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="03 / Experience"
          title="Career Timeline"
          description="From research lab to production infrastructure serving millions."
        />

        <div className="relative">
          {/* Timeline line — desktop only */}
          <div className="hidden md:block absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-accent-cyan/20 via-border-subtle to-transparent" />

          <div className="space-y-4">
            {experiences.map((exp, index) => {
              const isExpanded = expandedIndex === index

              return (
                <motion.div
                  key={exp.company + exp.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative md:pl-10"
                  style={{ scrollMarginTop: '100px' }}
                >
                  {/* Timeline dot — desktop only */}
                  <div className={`hidden md:block absolute left-[7px] top-7 w-[9px] h-[9px] rounded-full border-2 z-10 transition-all duration-300 ${
                    isExpanded
                      ? 'border-accent-cyan bg-accent-cyan/30 shadow-[0_0_6px_rgba(56,189,248,0.4)]'
                      : 'border-text-muted bg-bg-primary'
                  }`} />

                  <div className="glass rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggle(index)}
                      className="w-full text-left p-5 md:p-6 lg:p-7 cursor-pointer group"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div>
                          <h3 className={`font-display text-lg md:text-xl font-semibold transition-colors duration-200 ${
                            isExpanded ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                          }`}>
                            {exp.title}
                          </h3>
                          <p className={`text-sm font-medium mt-1 transition-colors duration-200 ${
                            isExpanded ? 'text-accent-cyan/90' : 'text-text-muted group-hover:text-accent-cyan/70'
                          }`}>
                            {exp.company}
                          </p>
                        </div>

                        <div className="flex items-start md:items-end justify-between md:flex-col gap-1 flex-shrink-0">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-xs text-text-muted">
                              <Calendar size={12} />
                              {exp.duration}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-text-muted">
                              <MapPin size={12} />
                              {exp.location}
                            </div>
                          </div>

                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className={`p-1 transition-colors duration-200 ${
                              isExpanded ? 'text-accent-cyan' : 'text-text-muted group-hover:text-text-secondary'
                            }`}
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 lg:px-7 pb-6 lg:pb-7 border-t border-border-subtle">
                            <ul className="mt-5 space-y-4">
                              {exp.description.map((bullet, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -4 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.04, duration: 0.25 }}
                                  className="flex gap-4 text-sm text-text-secondary leading-relaxed"
                                >
                                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent-cyan/30 flex-shrink-0" />
                                  <span>{bullet}</span>
                                </motion.li>
                              ))}
                            </ul>

                            {exp.technologies.length > 0 && (
                              <div className="mt-7 pt-5 border-t border-border-subtle">
                                <div className="flex flex-wrap gap-2">
                                  {exp.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-3 py-1.5 rounded-lg text-xs bg-white/[0.03] text-text-secondary border border-white/[0.05]"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
