import { useState, useEffect } from 'react'

/**
 * Subscribe to a CSS media query. Returns whether it currently matches.
 * Used to mount the 3D Canvas in exactly one place (desktop aside OR mobile
 * bar) instead of both at once.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = () => setMatches(mql.matches)
    handler()
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
