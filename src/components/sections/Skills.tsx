import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Code2, Shield, Brain, Cloud, Database,
  Webhook, Activity, Wrench, ExternalLink, BadgeCheck,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { skillCategories } from '../../data/skills'

const iconMap: Record<string, ReactNode> = {
  'code-2': <Code2 size={18} />,
  shield: <Shield size={18} />,
  brain: <Brain size={18} />,
  cloud: <Cloud size={18} />,
  database: <Database size={18} />,
  webhook: <Webhook size={18} />,
  activity: <Activity size={18} />,
  wrench: <Wrench size={18} />,
}

export default function Skills() {
  return (
    <section id="skills" className="relative section-padding">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="02 / Skills"
          title="Technical Stack"
          description="The tools and technologies I work with across the full infrastructure lifecycle."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: catIndex * 0.05 }}
              className="glass rounded-xl p-5 group"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-1.5 rounded-lg bg-white/[0.06] text-text-secondary
                  group-hover:text-accent-cyan transition-colors duration-300">
                  {iconMap[category.icon]}
                </div>
                <h3 className="font-display font-semibold text-base text-text-primary">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-md text-sm
                      bg-white/[0.04] text-text-secondary border border-white/[0.06]
                      hover:text-text-primary hover:border-white/[0.12] hover:bg-white/[0.07]
                      transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="https://www.credly.com/go/f1e8e8779df69d18f597cb5f885d"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 glass rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center
            gap-5 group hover:border-accent-amber/20 transition-all duration-300 cursor-pointer"
        >
          {/* AWS logo badge */}
          <div className="flex-shrink-0 p-4 rounded-xl bg-accent-amber/8 border border-accent-amber/15
            group-hover:bg-accent-amber/12 group-hover:border-accent-amber/25 transition-all duration-300">
            <Shield size={32} className="text-accent-amber" />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <BadgeCheck size={15} className="text-accent-amber flex-shrink-0" />
              <span className="text-xs font-medium text-accent-amber uppercase tracking-widest">
                AWS Certification
              </span>
            </div>
            <div className="text-lg font-semibold text-text-primary mb-1">
              AWS Certified DevOps Engineer, Professional
            </div>
            <div className="text-sm text-text-secondary mb-3">
              Issued April 2025 &middot; Expires April 2028
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
              <span className="text-text-muted">Validation ID:</span>
              <span className="text-text-secondary">f1e8e8779df69d18f597cb5f885d</span>
            </div>
          </div>

          {/* Verify link */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-accent-amber/20
            text-accent-amber/80 text-sm font-medium flex-shrink-0
            group-hover:bg-accent-amber/8 group-hover:border-accent-amber/35 group-hover:text-accent-amber
            transition-all duration-300 self-start sm:self-center">
            <span>Verify</span>
            <ExternalLink size={13} />
          </div>
        </motion.a>
      </div>
    </section>
  )
}
