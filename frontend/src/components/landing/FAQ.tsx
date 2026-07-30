import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui'

type FaqItem = {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: 'Is this real conversation or one-way video?',
    answer:
      'Merra runs a real back-and-forth conversational interview. Candidates talk with an AI interviewer that asks adaptive follow-ups — not a one-way pre-recorded video dump.',
  },
  {
    question: 'Can we customise questions & focus areas?',
    answer:
      'Yes. Set the role, choose up to five focus areas, auto-generate or write your own questions, and control pass score, duration, language, voice, opening line, and interview style.',
  },
  {
    question: 'How is scoring calculated?',
    answer:
      'Each interview produces a 0–100 match-fit score with per-area evaluation and analysis, plus key quotes, full video, and transcript so your team can review the “why” behind the score.',
  },
  {
    question: 'Will this work without my ATS?',
    answer:
      'Absolutely. No ATS is required. Invite candidates by email and review results in Merra. You can always export or share outcomes with your existing hiring tools.',
  },
  {
    question: 'Data retention & GDPR?',
    answer:
      'Media is retained for 30 days by default, and Merra is built to be GDPR-friendly with clear controls for access, retention, and data processing agreements.',
  },
  {
    question: "What's included in the free trial?",
    answer:
      'The free trial includes 1 job and 10 interviews so you can create an AI interview, invite candidates, and review match-fit scores end to end.',
  },
]

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: FaqItem
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-xl border border-transparent bg-white shadow-[0_8px_24px_-16px_rgba(26,24,72,0.25)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left sm:px-5"
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-600"
          aria-hidden
        />
        <span className="flex-1 text-sm font-semibold text-ink sm:text-[15px]">
          {item.question}
        </span>
        <ChevronDown
          size={18}
          className={[
            'shrink-0 text-ink-soft transition-transform duration-300',
            open ? 'rotate-180' : '',
          ].join(' ')}
          aria-hidden
        />
      </button>

      <div
        className={[
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 pl-[2.15rem] text-sm leading-relaxed text-ink-muted sm:px-5 sm:pl-[2.4rem]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="resources" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-[#eef1f7] px-5 py-12 sm:px-10 sm:py-14 lg:px-16">
            <div
              className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-300/35 blur-3xl"
              aria-hidden
            />

            <h2 className="relative text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <div className="relative mx-auto mt-10 flex max-w-3xl flex-col gap-3">
              {FAQS.map((item, index) => (
                <FaqRow
                  key={item.question}
                  item={item}
                  open={openIndex === index}
                  onToggle={() =>
                    setOpenIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
