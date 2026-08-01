import type { ReactNode } from 'react'
import { FileText, Bot, Target, Clock3, Sparkles } from 'lucide-react'
import { RevealOnScroll, WaveformBackground } from '@/components/ui'

type Benefit = {
  title: string
  description: string
  icon: ReactNode
  iconWrap: string
}

const BENEFITS: Benefit[] = [
  {
    title: 'Tailored to Your Resume & Role',
    description:
      "Upload your resume, pick the job you're aiming for, and optionally add GitHub — Merra builds practice questions around your real experience.",
    icon: <FileText size={22} strokeWidth={1.75} />,
    iconWrap: 'bg-brand-100 text-brand-400',
  },
  {
    title: 'Live Interview Practice',
    description:
      'Practice a real job interview with an AI interviewer — adaptive follow-ups, not a one-way video dump.',
    icon: <Bot size={22} strokeWidth={1.75} />,
    iconWrap: 'bg-brand-50 text-brand-400',
  },
  {
    title: 'Clear Match-Fit Score',
    description:
      'Finish in 15–20 minutes with a 0–100 score, per-area notes, and a full transcript so you know what to improve before the real interview.',
    icon: <Target size={22} strokeWidth={1.75} />,
    iconWrap: 'bg-brand-100 text-brand-500',
  },
  {
    title: 'Practice Anytime',
    description:
      'No scheduling, no panel to assemble. Rehearse for Software, Data, DevOps, PM, Design, QA, and more whenever you are ready.',
    icon: <Clock3 size={22} strokeWidth={1.75} />,
    iconWrap: 'bg-success/15 text-success',
  },
]

export function CoreBenefits() {
  return (
    <section id="use-cases" className="bg-canvas py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated px-6 py-10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] sm:px-10 sm:py-12 lg:px-14">
            <WaveformBackground className="top-0 h-16 opacity-[0.12]" bars={72} />

            <div className="relative mb-10 max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-400">
                For Job Seekers
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Why Practice Job Interviews with Merra
              </h2>
            </div>

            <div className="relative grid sm:grid-cols-2">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-3xl sm:block"
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
