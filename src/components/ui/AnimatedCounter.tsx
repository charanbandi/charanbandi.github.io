import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
  delay?: number
}

export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  label,
  duration = 2,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const timeout = setTimeout(() => {
      let start = 0
      const step = end / (duration * 60)
      const timer = setInterval(() => {
        start += step
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [isInView, end, duration, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="text-center"
    >
      <div className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-1">
        {prefix}{isInView ? count : 0}{suffix}
      </div>
      <div className="text-xs text-text-muted">{label}</div>
    </motion.div>
  )
}
