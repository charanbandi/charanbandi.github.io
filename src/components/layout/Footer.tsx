import { Github, Linkedin, ArrowUp, MapPin } from 'lucide-react'
import { scrollToTop } from '../../utils/lenisStore'
import { openToWork } from '../../data/config'

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Name + status */}
          <div className="text-center md:text-left">
            <div className="font-display font-semibold text-text-primary mb-1">
              Charan Bandi
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              {openToWork ? (
                <div className="flex items-center gap-1.5 text-xs text-accent-emerald/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse-glow" />
                  Open to opportunities
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <MapPin size={11} />
                  Mountain View, CA
                </div>
              )}
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            <a
              href="https://linkedin.com/in/charanbandi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg transition-colors hover:opacity-80"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} style={{ color: '#0A66C2' }} />
            </a>
            <a
              href="https://github.com/charanbandi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-text-muted
              hover:text-text-secondary transition-colors cursor-pointer"
          >
            <ArrowUp size={13} />
            Back to top
          </button>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Charan Bandi
          </p>
          <p className="text-xs text-text-muted">
            Built with{' '}
            <span className="text-text-secondary">React</span>,{' '}
            <span className="text-text-secondary">Vite</span>,{' '}
            <span className="text-text-secondary">TypeScript</span>{' '}&amp;{' '}
            <span className="text-text-secondary">Three.js</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
