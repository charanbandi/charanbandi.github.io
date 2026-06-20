import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
}

export default function SectionHeading({ label, title, description }: SectionHeadingProps) {
  const words = title.split(' ')
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(h2Ref, { once: true, margin: '-80px' })

  return (
    <div className="mb-14 md:mb-16">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="h-px w-8 bg-accent-cyan/30" />
        <span className="text-xs text-accent-cyan/70 tracking-widest uppercase">
          {label}
        </span>
      </motion.div>

      <h2
        ref={h2Ref}
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight"
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ marginRight: i < words.length - 1 ? '0.3em' : 0 }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : { y: '110%' }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.18 + words.length * 0.05, ease: EASE }}
          className="mt-5 text-base md:text-lg text-text-secondary max-w-xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
