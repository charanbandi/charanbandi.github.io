import { Github, Linkedin, ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-display font-semibold text-text-primary mb-0.5">
              Charan Bandi
            </div>
          </div>

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

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-xs text-text-muted
              hover:text-text-secondary transition-colors cursor-pointer"
          >
            <ArrowUp size={13} />
            Back to top
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-border-subtle text-center">
          <p className="text-xs text-text-muted">
            &copy; 2026 Charan Bandi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
