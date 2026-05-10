import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Linkedin, Github, ExternalLink,
  User, Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader2,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const connectLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    description: 'Best for opportunities & professional chat',
    href: 'https://linkedin.com/in/charanbandi',
    color: '#0A66C2',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Find me on GitHub',
    description: 'Open source and side projects',
    href: 'https://github.com/charanbandi',
    color: undefined,
  },
]

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fields, setFields] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '6231a15a-6daf-4cc4-be2f-366d8fd03c0a',
          subject: `Portfolio message from ${fields.name}`,
          from_name: fields.name,
          ...fields,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setFormState('success')
        setFields({ name: '', email: '', message: '' })
      } else {
        throw new Error(data.message || 'Submission failed')
      }
    } catch (err) {
      setFormState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const inputClass = `w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3
    text-text-primary placeholder:text-text-muted text-sm
    focus:outline-none focus:border-accent-cyan/40 focus:bg-white/[0.05]
    transition-all duration-200`

  return (
    <section id="contact" className="relative section-padding">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          label="06 / Contact"
          title="Let's Talk"
          description="Have an opportunity or just want to say hi? Send a message or reach out directly."
        />

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass rounded-xl p-6 md:p-8 mb-4"
        >
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-10 gap-4 text-center"
              >
                <div className="p-4 rounded-full bg-accent-emerald/10 border border-accent-emerald/20">
                  <CheckCircle size={32} className="text-accent-emerald" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-text-primary mb-1">Message sent!</p>
                  <p className="text-sm text-text-muted">I'll get back to you as soon as I can.</p>
                </div>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-2 text-xs text-text-muted hover:text-text-secondary transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Send another message
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
                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                      <User size={11} />
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClass}
                      disabled={formState === 'loading'}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                      <Mail size={11} />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={inputClass}
                      disabled={formState === 'loading'}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                    <MessageSquare size={11} />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="What's on your mind?"
                    className={`${inputClass} resize-none`}
                    disabled={formState === 'loading'}
                  />
                </div>

                {/* Error */}
                <AnimatePresence>
                  {formState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-red-400 bg-red-500/[0.06]
                        border border-red-500/20 rounded-lg px-4 py-3"
                    >
                      <AlertCircle size={15} className="flex-shrink-0" />
                      {errorMsg || 'Something went wrong. Please try again.'}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
                    bg-accent-blue text-white text-sm font-medium
                    hover:bg-accent-blue/90 active:scale-[0.98]
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition-all duration-200 cursor-pointer"
                >
                  {formState === 'loading' ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social links */}
        <div className="grid sm:grid-cols-2 gap-4">
          {connectLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass rounded-xl p-5 flex items-center gap-4 group
                  hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-white/[0.04] group-hover:bg-white/[0.07] transition-colors duration-300">
                  <Icon size={20} style={link.color ? { color: link.color } : undefined}
                    className={!link.color ? 'text-text-muted group-hover:text-text-secondary transition-colors' : ''} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-text-primary">{link.value}</div>
                  <div className="text-xs text-text-muted mt-0.5">{link.description}</div>
                </div>
                <ExternalLink size={14} className="text-text-muted group-hover:text-text-secondary transition-colors flex-shrink-0" />
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
