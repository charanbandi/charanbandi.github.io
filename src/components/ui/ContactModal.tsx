import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, User, Mail, MessageSquare,
  Send, CheckCircle, AlertCircle, Loader2,
} from 'lucide-react'
import { useContactForm } from '../../hooks/useContactForm'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const inputClass = `w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3
  text-text-primary placeholder:text-text-muted text-sm
  focus:outline-none focus:border-accent-cyan/40 focus:bg-white/[0.06]
  transition-all duration-200 disabled:opacity-50`

export default function ContactModal({ isOpen, onClose }: Props) {
  const { formState, errorMsg, fields, handleChange, handleSubmit, reset } = useContactForm()

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleClose = () => {
    onClose()
    setTimeout(reset, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 420, damping: 36 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display font-semibold text-lg text-text-primary">Send a message</h2>
                <p className="text-sm text-text-muted mt-0.5">I'll get back to you as soon as I can.</p>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary
                  hover:bg-white/[0.06] transition-all duration-200 cursor-pointer -mt-1 -mr-1"
              >
                <X size={18} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-8 gap-3 text-center"
                >
                  <div className="p-3.5 rounded-full bg-accent-emerald/10 border border-accent-emerald/20">
                    <CheckCircle size={28} className="text-accent-emerald" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary mb-1">Message sent!</p>
                    <p className="text-sm text-text-muted">I'll be in touch soon.</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-2 px-5 py-2 rounded-lg text-sm font-medium
                      bg-white/[0.05] border border-white/[0.08] text-text-secondary
                      hover:text-text-primary transition-all duration-200 cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                        <User size={11} /> Name
                      </label>
                      <input type="text" name="name" value={fields.name} onChange={handleChange}
                        required placeholder="Your name" className={inputClass} disabled={formState === 'loading'} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                        <Mail size={11} /> Email
                      </label>
                      <input type="email" name="email" value={fields.email} onChange={handleChange}
                        required placeholder="your@email.com" className={inputClass} disabled={formState === 'loading'} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                      <MessageSquare size={11} /> Message
                    </label>
                    <textarea name="message" value={fields.message} onChange={handleChange}
                      required rows={4} placeholder="What's on your mind?"
                      className={`${inputClass} resize-none`} disabled={formState === 'loading'} />
                  </div>

                  <AnimatePresence>
                    {formState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-sm text-red-400 bg-red-500/[0.06] border border-red-500/20 rounded-lg px-4 py-3"
                      >
                        <AlertCircle size={14} className="flex-shrink-0" />
                        {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit" disabled={formState === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                      bg-accent-blue text-white text-sm font-medium
                      hover:bg-accent-blue/90 active:scale-[0.98]
                      disabled:opacity-60 disabled:cursor-not-allowed
                      transition-all duration-200 cursor-pointer"
                  >
                    {formState === 'loading'
                      ? <><Loader2 size={14} className="animate-spin" /> Sending…</>
                      : <><Send size={14} /> Send Message</>
                    }
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
