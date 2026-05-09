import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ChevronDown, Zap, Trophy } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { projects } from '../../data/projects'

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="relative section-padding">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="05 / Projects"
          title="Featured Work"
          description="Systems I've designed and built, from AI-driven automation to IoT security research."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, index) => {
            const isExpanded = expandedIndex === index

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="glass rounded-xl overflow-hidden h-full flex flex-col">
                  <div className="p-6 lg:p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-display text-lg font-semibold text-text-primary leading-snug">
                        {project.title}
                      </h3>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        {project.isHackathonFinalist && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full
                            bg-accent-amber/10 border border-accent-amber/30">
                            <Trophy size={10} className="text-accent-amber" />
                            <span className="text-[10px] text-accent-amber font-medium">Hackathon Finalist</span>
                          </div>
                        )}
                        {project.isInternal && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full
                            bg-white/[0.04] border border-white/[0.08] flex-shrink-0">
                            <Lock size={10} className="text-text-muted" />
                            <span className="text-[10px] text-text-muted">Internal</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-text-muted mb-5">{project.subtitle}</p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-5">
                      {project.impacts.map((impact) => (
                        <div
                          key={impact}
                          className="flex items-start gap-2 text-xs text-text-secondary leading-snug"
                        >
                          <Zap size={10} className="text-accent-cyan/60 mt-0.5 flex-shrink-0" />
                          <span>{impact}</span>
                        </div>
                      ))}
                    </div>

                    {project.image && (
                      <div className="mb-5 rounded-lg overflow-hidden bg-bg-secondary border border-border-subtle">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-40 object-contain p-3 opacity-80"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-text-secondary leading-relaxed mb-5">
                            {project.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-auto pt-5 border-t border-border-subtle flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5 min-w-0">
                        {project.technologies.slice(0, isExpanded ? undefined : 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded text-[10px]
                              bg-white/[0.03] text-text-muted border border-white/[0.04]"
                          >
                            {tech}
                          </span>
                        ))}
                        {!isExpanded && project.technologies.length > 3 && (
                          <span className="px-2 py-1 text-[10px] text-text-muted">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                        className="flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary
                          transition-colors duration-200 cursor-pointer flex-shrink-0"
                      >
                        {isExpanded ? 'Less' : 'More'}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={13} />
                        </motion.div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
