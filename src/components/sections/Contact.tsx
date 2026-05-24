import { useState, type ChangeEvent, type ComponentType, type FormEvent, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Send,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  type LucideProps,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import { socials } from '../../data/socials'
import type { SocialPlatform } from '../../types'

type IconComponent = ComponentType<LucideProps>

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type FieldName = keyof FormState

type FormErrors = Partial<Record<FieldName, string | undefined>>

type Status = 'idle' | 'sending' | 'success' | 'error'

const initialState: FormState = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    const key = name as FieldName
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const er: FormErrors = {}
    if (!form.name.trim()) er.name = t('contact.form.validation.nameRequired')
    if (!form.email.trim()) er.email = t('contact.form.validation.emailRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      er.email = t('contact.form.validation.emailInvalid')
    if (!form.message.trim()) er.message = t('contact.form.validation.messageRequired')
    else if (form.message.trim().length < 10)
      er.message = t('contact.form.validation.messageShort')
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

    if (accessKey) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: form.name,
            email: form.email,
            subject: form.subject || `New portfolio message from ${form.name}`,
            message: form.message,
            from_name: 'Portfolio Contact Form',
            replyto: form.email,
            botcheck: '',
          }),
        })

        const data = await res.json().catch(() => ({}))

        if (res.ok && data.success !== false) {
          setStatus('success')
          setForm(initialState)
          setTimeout(() => setStatus('idle'), 5000)
        } else {
          throw new Error(data.message || 'send failed')
        }
      } catch (err) {
        console.error('Web3Forms submission failed:', err)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
      return
    }

    try {
      const subject = encodeURIComponent(
        form.subject || 'New message from portfolio',
      )
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
      )
      const mailto = `mailto:dilshodbunyodov2020@gmail.com?subject=${subject}&body=${body}`
      await new Promise((r) => setTimeout(r, 400))
      window.location.href = mailto
      setStatus('success')
      setForm(initialState)
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  interface DirectContact {
    icon: IconComponent
    label: string
    value: string
    href?: string
  }

  const directContacts: DirectContact[] = [
    {
      icon: Mail,
      label: 'Email',
      value: 'dilshodbunyodov2020@gmail.com',
      href: 'mailto:dilshodbunyodov2020@gmail.com',
    },
    { icon: MapPin, label: t('about.locationLabel'), value: t('about.location') },
    {
      icon: Clock,
      label: t('contact.responseTime'),
      value: '~24h',
    },
  ]

  const iconFor = (p: SocialPlatform): IconComponent =>
    ({ github: Github, linkedin: Linkedin, email: Mail } as Record<SocialPlatform, IconComponent>)[p] ||
    Mail

  return (
    <section id="contact" className="section">
      <div className="container-custom">
        <SectionHeader
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="glass-strong rounded-2xl p-5 sm:p-6">
              <h3 className="font-semibold text-text-primary mb-5 flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-violet" />
                {t('contact.directContact')}
              </h3>

              <div className="space-y-4">
                {directContacts.map((c) => {
                  const Icon = c.icon
                  const content = (
                    <div className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border flex items-center justify-center group-hover:border-accent-violet transition-colors shrink-0">
                        <Icon className="w-4 h-4 text-accent-cyan" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-text-muted font-mono mb-0.5">
                          {c.label}
                        </p>
                        <p className="text-sm text-text-primary group-hover:text-accent-cyan transition-colors break-all">
                          {c.value}
                        </p>
                      </div>
                    </div>
                  )
                  return c.href ? (
                    <a key={c.label} href={c.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={c.label}>{content}</div>
                  )
                })}
              </div>

              {/* Socials */}
              <div className="mt-6 pt-5 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => {
                    const Icon = iconFor(s.platform)
                    return (
                      <a
                        key={s.platform}
                        href={s.href}
                        target={s.platform !== 'email' ? '_blank' : undefined}
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-violet hover:bg-bg-elevated transition-all"
                        aria-label={s.label}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            <p className="text-xs text-text-muted text-center px-2">
              {t('contact.based')}
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 glass-strong rounded-2xl p-5 sm:p-6 md:p-8 space-y-4"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label={t('contact.form.name')}
                placeholder={t('contact.form.namePlaceholder')}
                name="name"
                value={form.name}
                onChange={onChange}
                error={errors.name}
                required
              />
              <Field
                label={t('contact.form.email')}
                placeholder={t('contact.form.emailPlaceholder')}
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                error={errors.email}
                required
              />
            </div>

            <Field
              label={t('contact.form.subject')}
              placeholder={t('contact.form.subjectPlaceholder')}
              name="subject"
              value={form.subject}
              onChange={onChange}
            />

            <Field
              label={t('contact.form.message')}
              placeholder={t('contact.form.messagePlaceholder')}
              name="message"
              textarea
              value={form.message}
              onChange={onChange}
              error={errors.message}
              required
            />

            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="text-sm min-h-[1.5rem]">
                {status === 'success' && (
                  <span className="flex items-center gap-1.5 text-accent-green">
                    <CheckCircle2 className="w-4 h-4" />
                    {t('contact.form.success')}
                  </span>
                )}
                {status === 'error' && (
                  <span className="flex items-center gap-1.5 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    {t('contact.form.error')}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending'
                  ? t('contact.form.submitting')
                  : t('contact.form.submit')}
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

type FieldProps = {
  label: string
  error?: string
  textarea?: boolean
  name: string
} & (
  | ({ textarea: true } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  | ({ textarea?: false } & InputHTMLAttributes<HTMLInputElement>)
)

function Field({ label, error, textarea, ...rest }: FieldProps) {
  const baseClasses = `w-full px-4 py-3 rounded-xl bg-bg-card border text-sm text-text-primary placeholder:text-text-muted
                        focus:outline-none focus:ring-2 focus:ring-accent-violet/40 transition-all
                        ${error ? 'border-red-500/60' : 'border-border focus:border-accent-violet'}`
  return (
    <div>
      <label
        htmlFor={rest.name}
        className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-1.5"
      >
        {label}
        {rest.required && <span className="text-accent-pink ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={rest.name}
          rows={6}
          className={baseClasses}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={rest.name}
          className={baseClasses}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  )
}
