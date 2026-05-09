import { motion } from 'framer-motion'
import { FileText, ExternalLink, Award, Quote, GraduationCap } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { publications } from '../../data/publications'

export default function Publications() {
  return (
    <section id="publications" className="relative section-padding">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="04 / Research"
          title="Publications"
          description="Peer-reviewed research on hardware vulnerability analysis using NLP and machine learning."
        />

        <div className="space-y-5">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.doi}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass rounded-xl p-6 lg:p-7"
            >
              <div className="flex gap-5">
                <div className="flex-shrink-0 hidden sm:block">
                  <div className="p-2.5 rounded-lg bg-white/[0.04] text-text-muted">
                    <FileText size={20} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="font-display text-base font-semibold text-text-primary leading-snug">
                      {pub.title}
                    </h3>
                    {pub.isFirstAuthor && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full
                        bg-accent-emerald/8 border border-accent-emerald/15 flex-shrink-0">
                        <Award size={10} className="text-accent-emerald/80" />
                        <span className="text-[10px] text-accent-emerald/80 whitespace-nowrap">
                          First Author
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-text-muted mb-3">{pub.authors}</p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm mb-4">
                    <span className="text-text-secondary text-xs">{pub.conference}</span>
                    <span className="text-text-muted text-xs">{pub.year}</span>
                    <div className="flex items-center gap-1 text-text-muted">
                      <Quote size={10} />
                      <span className="text-xs">{pub.citations} citations</span>
                    </div>
                  </div>

                  <a
                    href={pub.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-accent-cyan/70
                      hover:text-accent-cyan transition-colors"
                  >
                    <ExternalLink size={12} />
                    DOI: {pub.doi}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="https://scholar.google.com/citations?user=6qzhtkAAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 glass rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center
            gap-5 group hover:border-accent-cyan/20 transition-all duration-300 cursor-pointer"
        >
          {/* Icon */}
          <div className="flex-shrink-0 p-4 rounded-xl bg-accent-cyan/8 border border-accent-cyan/15
            group-hover:bg-accent-cyan/12 group-hover:border-accent-cyan/25 transition-all duration-300">
            <GraduationCap size={32} className="text-accent-cyan" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Quote size={14} className="text-accent-cyan flex-shrink-0" />
              <span className="text-xs font-medium text-accent-cyan uppercase tracking-widest">
                Research Impact
              </span>
            </div>
            <div className="text-lg font-semibold text-text-primary mb-1">
              ~29 Total Citations
            </div>
            <div className="text-sm text-text-secondary">
              Research extended by the HWREx framework (ACM TODAES 2025).
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-accent-cyan/20
            text-accent-cyan/80 text-sm font-medium flex-shrink-0
            group-hover:bg-accent-cyan/8 group-hover:border-accent-cyan/35 group-hover:text-accent-cyan
            transition-all duration-300 self-start sm:self-center whitespace-nowrap">
            <span>Google Scholar</span>
            <ExternalLink size={13} />
          </div>
        </motion.a>
      </div>
    </section>
  )
}
