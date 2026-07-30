import type { ReactNode } from 'react'
import { Briefcase, Check, MousePointer2, Share2, Star } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui'

type StepLayout = 'visual-left' | 'visual-right'

type HowItWorksStepProps = {
  step: number
  title: string
  description: string
  icon: ReactNode
  layout: StepLayout
  visual: ReactNode
  delayMs?: number
}

function StepBadge({ step }: { step: number }) {
  return (
    <div
      className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-2xl font-extrabold text-brand-700"
      aria-hidden
    >
      {step}
    </div>
  )
}

function HowItWorksStep({
  step,
  title,
  description,
  icon,
  layout,
  visual,
  delayMs = 0,
}: HowItWorksStepProps) {
  const textBlock = (
    <div className="flex max-w-md flex-col">
      <StepBadge step={step} />
      <div className="mb-3 flex items-center gap-2.5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
          {icon}
        </span>
        <h3 className="text-xl font-bold text-ink sm:text-2xl">{title}</h3>
      </div>
      <p className="text-[15px] leading-relaxed text-ink-muted">{description}</p>
    </div>
  )

  return (
    <RevealOnScroll delayMs={delayMs}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {layout === 'visual-left' ? (
          <>
            <div className="order-2 lg:order-1">{visual}</div>
            <div className="order-1 lg:order-2">{textBlock}</div>
          </>
        ) : (
          <>
            <div className="order-1">{textBlock}</div>
            <div className="order-2">{visual}</div>
          </>
        )}
      </div>
    </RevealOnScroll>
  )
}

function CreateJobCard() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-[0_20px_60px_-24px_rgba(26,24,72,0.22)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500">
        Create New Job
      </p>
      <div className="relative mt-3 inline-flex items-center gap-1">
        <p className="text-sm font-bold text-brand-600">Basic Information</p>
        <MousePointer2
          size={16}
          className="absolute -right-5 top-4 text-ink"
          aria-hidden
        />
      </div>

      <label className="mt-5 block text-sm font-medium text-ink">
        Job title
        <input
          readOnly
          value="e.g senior frontend developer"
          className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-3 text-sm text-ink-soft outline-none"
        />
      </label>

      <label className="mt-4 block text-sm font-medium text-ink">
        Job Description
        <input
          readOnly
          value="e.g senior frontend developer"
          className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-3 text-sm text-ink-soft outline-none"
        />
      </label>

      <button
        type="button"
        className="mt-6 h-11 w-full rounded-lg bg-brand-600 text-sm font-semibold text-white"
      >
        Create Interview
      </button>
    </div>
  )
}

function InviteCandidateCard() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-[0_20px_60px_-24px_rgba(26,24,72,0.22)]">
      <p className="text-sm font-bold uppercase tracking-wide text-ink">
        Add New Candidate
      </p>

      <label className="mt-5 block text-sm font-medium text-ink">
        Full Name
        <input
          readOnly
          value="e.g. Tanmoy Samaddar"
          className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-3 text-sm text-ink-soft outline-none"
        />
      </label>

      <label className="relative mt-4 block text-sm font-medium text-ink">
        Email Address
        <input
          readOnly
          value="e.g. tanmoysamaddar@gmail.com"
          className="mt-1.5 h-11 w-full rounded-lg border border-border bg-white px-3 text-sm text-ink-soft outline-none"
        />
        <MousePointer2
          size={16}
          className="absolute right-3 top-10 text-ink"
          aria-hidden
        />
      </label>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="h-11 rounded-lg bg-brand-50 text-sm font-semibold text-brand-700"
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 text-sm font-semibold text-white"
        >
          <Share2 size={14} aria-hidden />
          Send Invite
        </button>
      </div>
    </div>
  )
}

function ReviewAdvanceCard() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-[0_20px_60px_-24px_rgba(26,24,72,0.22)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
        Review and Advance
      </p>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-brand-100">
          <div className="h-full w-[70%] rounded-full bg-brand-600" />
        </div>
        <span className="text-sm font-bold text-ink">70</span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] gap-4">
        <div>
          <p className="mb-2 text-sm font-bold text-ink">Strengths</p>
          <ul className="space-y-2">
            {[
              'Communication skills',
              'Technical knowledge',
              'Problem-solving',
              'Teamwork',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-ink-muted"
              >
                <Check size={14} className="text-brand-600" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="h-fit rounded-xl border border-brand-200 bg-brand-50/60 px-3 py-2.5">
          <p className="text-xs font-bold text-ink">Risks</p>
          <p className="mt-1 max-w-[110px] text-xs leading-snug text-ink-muted">
            Lack of relevant experience
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          className="h-10 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white"
        >
          Advance
        </button>
        <button
          type="button"
          className="h-10 rounded-lg bg-brand-50 px-5 text-sm font-semibold text-brand-700"
        >
          Reject
        </button>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.08),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(59,130,246,0.07),_transparent_45%)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <RevealOnScroll>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted sm:text-base">
              Create your AI interview, invite candidates by email, and review a
              0–100 match-fit score with full analysis/evaluation, including
              video and transcript—no scheduling required.
            </p>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col gap-20 lg:gap-28">
          <HowItWorksStep
            step={1}
            title="Create AI Interview"
            icon={<Briefcase size={16} aria-hidden />}
            layout="visual-left"
            delayMs={80}
            description="Pick the role and JD, choose up to five focus areas, and auto-generate questions (or write your own). Set the pass score and duration, then choose language, voice, opening line, and style of the AI: friendly, direct, or extra probing. You're in control."
            visual={<CreateJobCard />}
          />

          <HowItWorksStep
            step={2}
            title="Invite Candidates"
            icon={<Share2 size={16} aria-hidden />}
            layout="visual-right"
            delayMs={80}
            description="Send email invites straight to candidates. No calendars, no back-and-forth. They complete a 10–15 minute conversational interview in one sitting on a desktop/laptop—quick, consistent, and easy to roll out to a whole batch."
            visual={<InviteCandidateCard />}
          />

          <HowItWorksStep
            step={3}
            title="Review & Advance"
            icon={<Star size={16} fill="currentColor" aria-hidden />}
            layout="visual-left"
            delayMs={80}
            description="Get a 0–100 match-fit score with per-area evaluation & analysis, plus the full video and transcript. Shortlist the standouts or pass in one click. Either way, candidates automatically receive a short summary of strengths/weaknesses and specific tips to improve."
            visual={<ReviewAdvanceCard />}
          />
        </div>
      </div>
    </section>
  )
}
