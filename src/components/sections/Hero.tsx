import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, ChevronDown, Download, Mail } from 'lucide-react'
import BlurText from '../ui/BlurText'
import ContactModal from '../ui/ContactModal'
import { scrollToSection } from '../../utils/scroll'
import { openToWork, targetingLabel } from '../../data/config'

const PixelBlast = lazy(() => import('../effects/PixelBlast'))

export default function Hero() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background: WebGL PixelBlast — lazy-loaded so Three.js doesn't block TTI */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(45,212,191,0.10),transparent)]" />
        }>
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#2dd4bf"
            patternScale={2}
            patternDensity={1}
            enableRipples
            rippleSpeed={0.3}
            rippleThickness={0.1}
            rippleIntensityScale={1}
            speed={0.5}
            transparent
            edgeFade={0.25}
          />
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary z-[5]" />

      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="bg-bg-primary/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 border border-white/[0.06]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

            {/* Text content — lg:order-first puts it on the left on desktop; on mobile it's first in source order */}
            <div className="flex-1 text-center lg:text-left w-full lg:order-first">
              {openToWork && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center justify-center lg:justify-start gap-2.5 mb-6"
                >
                  <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse-glow flex-shrink-0" />
                  <div>
                    <div className="text-sm text-accent-emerald/90 tracking-wide leading-tight">
                      Open to opportunities
                    </div>
                    <div className="text-xs text-accent-emerald/55 mt-0.5">
                      {targetingLabel}
                    </div>
                  </div>
                </motion.div>
              )}

              <BlurText
                text="Charan Bandi"
                delay={120}
                animateBy="words"
                direction="top"
                stepDuration={0.4}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 text-text-primary justify-center lg:justify-start"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-2xl text-accent-cyan/80 font-medium mb-5"
              >
                Senior Software Engineer
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base md:text-lg text-text-secondary max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Building scalable backend systems, VPN infrastructure, and
                AI-driven solutions serving millions of users globally.
                Currently at Gen Digital (Norton, Avast, Avira, LifeLock).
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
              >
                <button
                  onClick={() => scrollToSection('#experience')}
                  className="px-7 py-3.5 rounded-xl font-medium text-sm
                    bg-accent-blue text-white
                    hover:bg-accent-blue/90 transition-all duration-300
                    hover:shadow-lg hover:shadow-accent-blue/20
                    active:scale-[0.98] cursor-pointer"
                >
                  View My Work
                </button>
                <a
                  href="/resume/Charan_Bandi_Resume_Portfolio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm
                    border border-border-subtle text-text-secondary
                    hover:border-text-muted hover:text-text-primary hover:bg-white/[0.03]
                    transition-all duration-300"
                >
                  <Download size={15} />
                  Resume
                </a>
                <button
                  onClick={() => setContactOpen(true)}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm
                    border border-accent-cyan/20 text-accent-cyan/80
                    hover:border-accent-cyan/40 hover:text-accent-cyan hover:bg-accent-cyan/[0.05]
                    transition-all duration-300 cursor-pointer"
                >
                  <Mail size={15} />
                  Get in touch
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center gap-3 justify-center lg:justify-start flex-wrap"
              >
                {[
                  { icon: Linkedin, href: 'https://linkedin.com/in/charanbandi', label: 'LinkedIn', iconColor: '#0A66C2' },
                  { icon: Github, href: 'https://github.com/charanbandi', label: 'GitHub', iconColor: undefined },
                ].map(({ icon: Icon, href, label, iconColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-text-secondary
                      hover:text-text-primary hover:bg-white/[0.06] border border-white/[0.05]
                      hover:border-white/[0.12] transition-all duration-300 group"
                  >
                    <Icon
                      size={17}
                      style={iconColor ? { color: iconColor } : undefined}
                      className={!iconColor ? 'group-hover:text-accent-cyan transition-colors' : ''}
                    />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                ))}

                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                  <span className="text-xs text-text-secondary whitespace-nowrap">Mountain View, CA</span>
                </div>
              </motion.div>
            </div>

            {/* Profile photo — circular avatar on mobile, rectangular card on sm+ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative flex-shrink-0 lg:order-last"
            >
              {/* Mobile: circular avatar */}
              <div className="sm:hidden relative w-24 h-24 rounded-full overflow-hidden mx-auto
                border-2 border-white/10 ring-2 ring-accent-cyan/20 avatar-glitch">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/images/profile-sm.webp 200w, /images/profile-md.webp 400w, /images/profile.webp 533w"
                    sizes="96px"
                  />
                  <img
                    src="/images/profile.jpeg"
                    srcSet="/images/profile-sm.jpeg 200w, /images/profile-md.jpeg 400w, /images/profile.jpeg 533w"
                    sizes="96px"
                    alt="Charan Bandi"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    fetchPriority="high"
                  />
                </picture>
                <div className="avatar-glitch__scanlines" />
                <div className="avatar-glitch__rgb" />
              </div>

              {/* sm+: rectangular card */}
              <div className="hidden sm:block relative w-52 h-64 sm:w-64 sm:h-80 md:w-72 md:h-[360px] lg:w-[300px] lg:h-[380px]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/15 to-accent-blue/15 blur-2xl" />
                <div className="absolute inset-2 rounded-2xl overflow-hidden border border-white/10 avatar-glitch">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="/images/profile-sm.webp 200w, /images/profile-md.webp 400w, /images/profile.webp 533w"
                      sizes="(max-width: 768px) 208px, (max-width: 1024px) 288px, 300px"
                    />
                    <img
                      src="/images/profile.jpeg"
                      srcSet="/images/profile-sm.jpeg 200w, /images/profile-md.jpeg 400w, /images/profile.jpeg 533w"
                      sizes="(max-width: 768px) 208px, (max-width: 1024px) 288px, 300px"
                      alt="Charan Bandi"
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </picture>
                  <div className="avatar-glitch__scanlines" />
                  <div className="avatar-glitch__rgb" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => scrollToSection('#about')}
          className="text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  )
}
