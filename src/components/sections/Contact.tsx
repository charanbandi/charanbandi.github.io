import { motion } from 'framer-motion'
import { Linkedin, Github, ExternalLink } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const connectLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Connect with me on LinkedIn',
    description: 'Best place to reach me for opportunities',
    href: 'https://linkedin.com/in/charanbandi',
    primary: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Check out my work on GitHub',
    description: 'Open source and side projects',
    href: 'https://github.com/charanbandi',
    primary: false,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative section-padding">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          label="06 / Contact"
          title="Let's Talk"
          description="Interested in working together? I'd love to hear from you. The best way to reach me is through LinkedIn."
        />

        <div className="space-y-4">
          {connectLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-xl p-6 flex items-center gap-5 group transition-all duration-300
                  hover:border-accent-cyan/15 cursor-pointer block ${
                    link.primary ? 'ring-1 ring-[#0A66C2]/25' : ''
                  }`}
              >
                <div className={`p-3 rounded-xl transition-colors duration-300 ${
                  link.primary
                    ? 'bg-[#0A66C2]/10 group-hover:bg-[#0A66C2]/20'
                    : 'bg-white/[0.04] text-text-muted group-hover:text-text-secondary'
                }`}>
                  <Icon size={22} style={link.primary ? { color: '#0A66C2' } : undefined} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-text-primary mb-0.5">
                    {link.value}
                  </div>
                  <div className="text-sm text-text-muted">
                    {link.description}
                  </div>
                </div>
                <ExternalLink size={16} className="text-text-muted group-hover:text-text-secondary transition-colors flex-shrink-0" />
              </motion.a>
            )
          })}
        </div>

      </div>
    </section>
  )
}
