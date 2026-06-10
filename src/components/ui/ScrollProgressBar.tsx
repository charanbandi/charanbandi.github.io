import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function ScrollProgressBar() {
  const progress = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 h-px z-[60] bg-accent-cyan/50 transition-all duration-150"
      style={{ width: `${progress * 100}%` }}
    />
  )
}
