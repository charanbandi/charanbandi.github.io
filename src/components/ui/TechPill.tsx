import { motion } from 'framer-motion'

interface TechPillProps {
  label: string
  delay?: number
}

export default function TechPill({ label, delay = 0 }: TechPillProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono
        bg-accent-cyan/8 text-accent-cyan/80 border border-accent-cyan/10
        hover:bg-accent-cyan/15 hover:border-accent-cyan/25 transition-all duration-300"
    >
      {label}
    </motion.span>
  )
}
