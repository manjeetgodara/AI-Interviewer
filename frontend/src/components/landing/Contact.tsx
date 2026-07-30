import { useState, type FormEvent, type ReactNode } from 'react'
import { Users, Phone, Mail } from 'lucide-react'
import { Button, RevealOnScroll } from '@/components/ui'

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const CONTACT_DETAILS = [
  {
    label: 'Support Team',
    value: 'AI Interviewer Support',
    icon: Users,
  },
  {
    label: 'Phone',
    value: '+91 99534 62784',
    href: 'tel:+919953462784',
    icon: Phone,
  },
  {
    label: 'Email',
    value: 'support@merra.ai',
    href: 'mailto:support@merra.ai',
    icon: Mail,
  },
]

const SOCIAL_LINKS: {
  label: string
  href: string
  icon: ReactNode
}[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/',
    icon: <GitHubIcon />,
  },
]

const fieldClassName = [
  'h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink',
  'placeholder:text-ink-soft outline-none transition-[border-color,box-shadow]',
  'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
].join(' ')

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <section id="contact" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-[#eef1f7] px-5 py-12 sm:px-10 sm:py-14 lg:px-16">
            <div
              className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-brand-300/35 blur-3xl"
              aria-hidden
            />

            <h2 className="relative text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Contact for Query
            </h2>

            <div className="relative mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <h3 className="text-xl font-bold text-ink sm:text-2xl">
                  Query Support
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                  Have questions about the AI Interviewer platform? Reach out
                  anytime for demos, support, or onboarding help.
                </p>

                <ul className="mt-8 flex flex-col gap-6">
                  {CONTACT_DETAILS.map(({ label, value, href, icon: Icon }) => (
                    <li key={label} className="flex items-start gap-3.5">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                        <Icon size={18} strokeWidth={2} aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-ink">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-0.5 block text-sm text-ink-muted transition-colors hover:text-brand-600"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-sm text-ink-muted">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-3">
                  {SOCIAL_LINKS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-ink sm:text-2xl">
                  Send Your Query
                </h3>

                <form
                  className="mt-6 flex flex-col gap-3.5"
                  onSubmit={handleSubmit}
                >
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Full Name"
                      autoComplete="name"
                      className={fieldClassName}
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Work Email"
                      autoComplete="email"
                      className={fieldClassName}
                    />
                  </div>
                  <input
                    name="subject"
                    type="text"
                    required
                    placeholder="Subject"
                    className={fieldClassName}
                  />
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your query, demo request, or support need..."
                    className={[
                      fieldClassName,
                      'h-auto min-h-[120px] resize-y py-3',
                    ].join(' ')}
                  />

                  <div className="pt-1">
                    <Button type="submit" variant="primary" size="md">
                      Submit Query
                    </Button>
                  </div>

                  {submitted ? (
                    <p
                      className="text-sm font-medium text-brand-600"
                      role="status"
                    >
                      Thanks — your query has been submitted.
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
