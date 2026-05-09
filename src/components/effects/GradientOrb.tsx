import { motion } from 'framer-motion'

interface GradientOrbProps {
  className?: string
  color?: 'cyan' | 'blue' | 'indigo'
  size?: 'sm' | 'md' | 'lg'
}

const colorMap = {
  cyan: 'from-accent-cyan/20 to-accent-cyan/0',
  blue: 'from-accent-blue/20 to-accent-blue/0',
  indigo: 'from-accent-indigo/20 to-accent-indigo/0',
}

const sizeMap = {
  sm: 'w-[300px] h-[300px]',
  md: 'w-[500px] h-[500px]',
  lg: 'w-[700px] h-[700px]',
}

export default function GradientOrb({
  className = '',
  color = 'cyan',
  size = 'md',
}: GradientOrbProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`absolute rounded-full bg-gradient-radial ${colorMap[color]} ${sizeMap[size]} blur-3xl pointer-events-none ${className}`}
    />
  )
}
