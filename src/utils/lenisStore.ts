import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenisInstance(lenis: Lenis) {
  instance = lenis
}

export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 0.8 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
