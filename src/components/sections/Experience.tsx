import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, Calendar } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { experiences } from '../../data/experience'

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="experience" className="relative section-padding">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="03 / Experience"
          title="Career Timeline"
          description="From research lab to production infrastructure serving millions."
        />

        <div className="relative">
          <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-accent-cyan/20 via-border-subtle to-transparent" />

          <div className="space-y-5">
            {experiences.map((exp, index) => {
              const isExpanded = expandedIndex === index

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative pl-10"
                >
                  <div
                    className={`absolute left-[7px] top-7 w-[9px] h-[9px] rounded-full border-2 z-10 transition-colors duration-300 ${
                      isExpanded
                        ? 'border-accent-cyan bg-accent-cyan/30'
                        : 'border-text-muted bg-bg-primary'
                    }`}
                  />

                  <div className="glass rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="w-full text-left p-6 lg:p-7 cursor-pointer group"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary">
                            {exp.title}
                          </h3>
                          <p className="text-accent-cyan/80 text-sm font-medium mt-1">
                            {exp.company}
                          </p>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
                          <div className="flex items-center gap-1.5 text-xs text-text-muted">
                            <Calendar size={12} />
                            {exp.duration}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-text-muted">
                            <MapPin size={12} />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-5 text-xs text-text-muted group-hover:text-text-secondary transition-colors">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={14} />
                        </motion.div>
                        {isExpanded ? 'Hide details' : 'Show details'}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 lg:px-7 pb-6 lg:pb-7 border-t border-border-subtle">
                            <ul className="mt-5 space-y-4">
                              {exp.description.map((bullet, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: i * 0.04 }}
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
                                      className="px-3 py-1.5 rounded-lg text-xs
                                        bg-white/[0.03] text-text-secondary border border-white/[0.05]"
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
