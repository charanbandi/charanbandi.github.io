import { MapPin, Calendar } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack'
import { experiences } from '../../data/experience'

// Per-company accent colours
const accent: Record<string, string> = {
  'Gen Digital':             '#2dd4bf',
  'NortonLifeLock':          '#3b82f6',
  'George Mason University': '#fbbf24',
  'Cyient Ltd':              '#34d399',
}

export default function Experience() {
  return (
    <section id="experience" className="relative section-padding">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="03 / Experience"
          title="Career Timeline"
          description="From research lab to production infrastructure serving millions."
        />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <ScrollStack
          useWindowScroll
          className="window-mode"
          itemDistance={220}
          itemScale={0.02}
          itemStackDistance={22}
          stackPosition="20%"
          scaleEndPosition="13%"
          baseScale={0.93}
        >
          {experiences.map((exp) => {
            const color = accent[exp.company] ?? '#2dd4bf'
            const highlights = exp.description.slice(0, 3)

            return (
              <ScrollStackItem key={exp.company + exp.title}>
                {/* No Framer Motion here — it conflicts with ScrollStack transforms */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgb(11, 14, 23)',
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderLeft: `3px solid ${color}`,
                  }}
                >
                  {/* Header */}
                  <div
                    className="px-7 py-6 md:px-9 md:py-7"
                    style={{ background: `${color}22`, borderBottom: `1px solid ${color}22` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                          {exp.title}
                        </h3>
                        <p className="text-base font-semibold mt-1.5" style={{ color }}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1.5 flex-shrink-0 sm:text-right">
                        <div className="flex sm:justify-end items-center gap-1.5 text-sm text-white/50">
                          <Calendar size={13} />
                          {exp.duration}
                        </div>
                        <div className="flex sm:justify-end items-center gap-1.5 text-sm text-white/50">
                          <MapPin size={13} />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet highlights */}
                  <div className="px-7 md:px-9 py-6 space-y-4 border-t border-white/[0.06]">
                    {highlights.map((bullet, i) => (
                      <div key={i} className="flex gap-3.5 text-base font-medium text-white/85 leading-relaxed">
                        <span
                          className="mt-[9px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: color, opacity: 0.7 }}
                        />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  {exp.technologies.length > 0 && (
                    <div className="px-7 md:px-9 pb-7 pt-2 border-t border-white/[0.06]">
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/60"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.07)',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollStackItem>
            )
          })}
        </ScrollStack>
      </div>
    </section>
  )
}
