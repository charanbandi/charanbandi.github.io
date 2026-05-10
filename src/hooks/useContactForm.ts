import { useState } from 'react'
import { WEB3FORMS_KEY } from '../data/config'

export type FormState = 'idle' | 'loading' | 'success' | 'error'

export function useContactForm() {
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
          access_key: WEB3FORMS_KEY,
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

  const reset = () => {
    setFormState('idle')
    setErrorMsg('')
  }

  return { formState, errorMsg, fields, handleChange, handleSubmit, reset }
}
