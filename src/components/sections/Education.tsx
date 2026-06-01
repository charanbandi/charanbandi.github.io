import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Award } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { educationItems } from '../../data/education'

export default function Education() {
  return (
    <section id="education" className="relative section-padding">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="04 / Education"
          title="Academic Background"
          description="The foundations behind the engineering."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {educationItems.map((item, index) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6 md:p-8 group"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 p-3 rounded-xl bg-accent-cyan/8 border border-accent-cyan/15
                  group-hover:bg-accent-cyan/12 group-hover:border-accent-cyan/25 transition-all duration-300">
                  <GraduationCap size={24} className="text-accent-cyan" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-accent-cyan/80 uppercase tracking-widest mb-1">
                    {item.degree}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-text-primary leading-tight">
                    {item.field}
                  </h3>
                  <div className="text-sm font-medium text-text-secondary mt-0.5">
                    {item.institution}
                  </div>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-5 text-xs text-text-muted">
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="flex-shrink-0" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-text-muted" />
                  <span>{item.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award size={12} className="flex-shrink-0 text-accent-amber" />
                  <span className="text-accent-amber/90 font-medium">
                    GPA {item.gpa} / {item.gpaScale}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border-subtle mb-4" />

              {/* Highlights */}
              <ul className="space-y-2.5">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-cyan/50 flex-shrink-0" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}