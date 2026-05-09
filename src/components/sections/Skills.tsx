import { motion } from 'framer-motion'
import {
  Code2, Shield, Brain, Cloud, Database,
  Webhook, Activity, Wrench,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { skillCategories } from '../../data/skills'

const iconMap: Record<string, React.ReactNode> = {
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

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 glass rounded-xl p-5 flex flex-col md:flex-row items-center gap-4 md:gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-accent-amber/8">
              <Shield size={18} className="text-accent-amber/80" />
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">
                AWS Certified DevOps Engineer, Professional
              </div>
              <div className="text-xs text-text-secondary">
                Issued April 2025 &middot; Expires April 2028
              </div>
            </div>
          </div>
          <div className="hidden md:block h-6 w-px bg-border-subtle" />
          <div className="text-xs text-text-secondary">
            Validation: f1e8e8779df69d18f597cb5f885d
          </div>
        </motion.div>
      </div>
    </section>
  )
}
