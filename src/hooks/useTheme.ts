import { useCallback, useState } from 'react'

export type Theme = 'dark' | 'light'

export function useTheme() {
  // index.html inline script sets data-theme before React mounts — read it directly
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark'
  )

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
      return next
    })
  }, [])

  return { theme, toggle }
}
