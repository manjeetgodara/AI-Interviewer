import type { ReactNode } from 'react'
import { Bot, DoorOpen, Sparkles, Timer } from 'lucide-react'
import { RevealOnScroll, WaveformBackground } from '@/components/ui'

type Benefit = {
  title: string
  description: string
  icon: ReactNode
  iconWrap: string
}

const BENEFITS: Benefit[] = [
  {
    title: 'Save 80% of Screening Time',
    description:
      'Merra handles early interviews so your team can focus on final-round fits.',
    icon: <Timer size={22} strokeWidth={1.75} />,
    iconWrap: 'bg-sky-100 text-sky-600',
  },
  {
    title: 'Conversational AI',
    description:
      'Human-sounding questions with adaptive follow-ups — not just a video dump.',
    icon: <Bot size={22} strokeWidth={1.75} />,
    iconWrap: 'bg-indigo-100 text-indigo-600',
  },
  {
    title: 'One Clear Score',
    description:
      'One clear 0-100 score + ranked shortlist. Per-area notes, key quotes, full video & transcript.',
    icon: <Sparkles size={22} strokeWidth={1.75} />,
    iconWrap: 'bg-violet-100 text-violet-600',
  },
  {
    title: 'Fully Async, Truly Accessible',
    description:
      'No scheduling. Candidates complete interviews anytime, on any device.',
    icon: <DoorOpen size={22} strokeWidth={1.75} />,
    iconWrap: 'bg-emerald-100 text-emerald-600',
  },
]

export function CoreBenefits() {
  return (
    <section id="use-cases" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white px-6 py-10 shadow-[0_20px_60px_-30px_rgba(26,24,72,0.18)] sm:px-10 sm:py-12 lg:px-14">
            <WaveformBackground className="top-0 h-16 opacity-[0.12]" bars={72} />

            <div className="relative mb-10 max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                Core Benefits
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Why Teams Use Merra for Async Interviews?
              </h2>
            </div>

            <div className="relative grid sm:grid-cols-2">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300/30 blur-3xl sm:block"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent sm:block"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border to-transparent sm:block"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 text-brand-400 sm:block"
                aria-hidden
              >
                <Sparkles size={18} />
              </div>

              {BENEFITS.map((benefit, index) => (
                <RevealOnScroll key={benefit.title} delayMs={index * 90}>
                  <article className="relative px-1 py-8 sm:px-8 sm:py-10">
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${benefit.iconWrap}`}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-bold text-ink">{benefit.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
                      {benefit.description}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
