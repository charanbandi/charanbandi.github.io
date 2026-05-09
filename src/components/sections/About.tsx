import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import AnimatedCounter from '../ui/AnimatedCounter'

const stats = [
  { end: 5, suffix: '+', label: 'Years Experience' },
  { end: 2, suffix: '', label: 'IEEE Publications' },
  { end: 5, prefix: '$', suffix: 'B+', label: 'Revenue Supported' },
  { end: 5000, suffix: '+', label: 'Servers Managed' },
  { end: 100, suffix: '+', label: 'Global Locations' },
  { end: 168, prefix: '$', suffix: 'K+', label: 'Annual Savings' },
]

export default function About() {
  return (
    <section id="about" className="relative section-padding">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="01 / About"
          title="Engineering at Scale"
          description="Building systems that are secure, reliable, and designed to serve millions."
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-text-secondary leading-relaxed">
              I'm a Senior Software Engineer at Gen Digital with 5+ years of experience
              designing and building scalable backend systems, cloud infrastructure, and
              security platforms that serve millions of users worldwide.
            </p>
            <p className="text-text-secondary leading-relaxed">
              I currently lead backend architecture for consumer VPN products spanning
              5,000+ servers across 100+ locations, working with IPsec/IKEv2 tunnel
              management, VPN gateway orchestration, and certificate lifecycle management
              across AWS and Azure. I also build Java/Spring Boot applications for Gen's
              e-commerce and payments platform, supporting over $5 billion in annual
              revenue across all Gen brands.
            </p>
            <p className="text-text-secondary leading-relaxed">
              On the AI side, I've built AI-driven production support systems for automated
              incident triage and reached the finals of an internal AI hackathon for
              designing a Private VPN layer with automatic PII/PCI detection for LLM
              interactions.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Before industry, I earned my Master's in Computer Science from George Mason
              University, where I published 2 peer-reviewed IEEE papers on IoT hardware
              vulnerability analysis using NLP and machine learning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                <span className="text-xs text-accent-cyan/80 tracking-widest uppercase">
                  Current Focus
                </span>
              </div>
              <ul className="space-y-3">
                {[
                  'VPN Infrastructure at Global Scale',
                  'Cloud-Native Backend Architecture',
                  'AI-Driven Operations & Automation',
                  'Payments & E-Commerce Systems',
                  'Security-First System Design',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-text-secondary">
                    <span className="w-1 h-1 rounded-full bg-text-muted" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
                <span className="text-xs text-accent-amber/80 tracking-widest uppercase">
                  Education
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-text-primary">M.S. Computer Science</div>
                  <div className="text-xs text-text-muted mt-0.5">George Mason University, 2019 - 2021</div>
                  <div className="text-xs text-text-muted">GPA: 3.70 / 4.0</div>
                </div>
                <div className="border-t border-border-subtle pt-4">
                  <div className="text-sm font-medium text-text-primary">B.Tech Computer Science</div>
                  <div className="text-xs text-text-muted mt-0.5">GITAM University, 2015 - 2019</div>
                  <div className="text-xs text-text-muted">CGPA: 8.56 / 10</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mt-14 glass rounded-xl p-8 md:p-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, i) => (
              <AnimatedCounter
                key={stat.label}
                end={stat.end}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
                delay={i * 0.08}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
