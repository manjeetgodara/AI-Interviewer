import { useEffect, useState, type ReactNode } from 'react'
import { MerraLogo, ThemeToggle } from '@/components/ui'

export const INTERVIEW_TRANSCRIPT = [
  "Hey, I'm Merra. Let's practice your job interview together.",
  "I'll ask real interview questions and follow up — just like a live interview.",
  'Tell me about a time you had to ship under a tight deadline.',
  'In my last sprint we had three days left and a critical bug in checkout.',
  'What trade-offs did you make, and how did you communicate them?',
  'I cut non-essential scope, paired with QA, and shipped a hotfix the same day.',
] as const

type ParticipantKey = 'merra' | 'candidate'

type InterviewStageProps = {
  title: string
  subtitle?: string
  candidateLabel: string
  candidateAvatar: ReactNode
  onEnd?: () => void
  /** Smaller panels for the landing-page preview */
  compact?: boolean
  showThemeToggle?: boolean
  className?: string
}

export function InterviewStage({
  title,
  subtitle,
  candidateLabel,
  candidateAvatar,
  onEnd,
  compact = false,
  showThemeToggle = false,
  className = '',
}: InterviewStageProps) {
  const [active, setActive] = useState<ParticipantKey>('merra')
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLineIndex((i) => (i + 1) % INTERVIEW_TRANSCRIPT.length)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    setActive(lineIndex % 2 === 0 ? 'merra' : 'candidate')
  }, [lineIndex])

  return (
    <div className={`relative flex flex-col overflow-hidden ${className}`}>
      <StageAtmosphere />

      <div
        className={[
          'relative z-10 mx-auto flex w-full flex-1 flex-col',
          compact
            ? 'max-w-5xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8'
            : 'max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10',
        ].join(' ')}
      >
        <header
          className={[
            'animate-[fadeSlideIn_0.5s_ease-out]',
            compact ? 'mb-5 sm:mb-6' : 'mb-8 sm:mb-10',
          ].join(' ')}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <MerraLogo size="sm" />
            {showThemeToggle ? <ThemeToggle /> : null}
          </div>
          <h2
            className={[
              'font-bold tracking-tight text-ink',
              compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl',
            ].join(' ')}
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>
          ) : null}
        </header>

        <div
          className={[
            'grid flex-1 grid-cols-1 content-center md:grid-cols-2',
            compact ? 'gap-3 sm:gap-4' : 'gap-4 sm:gap-5',
          ].join(' ')}
        >
          <ParticipantPanel
            active={active === 'merra'}
            onSelect={() => setActive('merra')}
            label="AI Interviewer"
            compact={compact}
            accent
            delayClass="animate-[fadeSlideIn_0.55s_ease-out]"
          >
            <div
              className={[
                'flex items-center justify-center rounded-full bg-ink shadow-[0_12px_40px_-12px_rgba(124,109,240,0.45)]',
                compact
                  ? 'h-20 w-20 sm:h-24 sm:w-24'
                  : 'h-28 w-28 sm:h-32 sm:w-32',
              ].join(' ')}
            >
              <MerraMark size={compact ? 40 : 56} className="text-canvas" />
            </div>
          </ParticipantPanel>

          <ParticipantPanel
            active={active === 'candidate'}
            onSelect={() => setActive('candidate')}
            label={candidateLabel}
            compact={compact}
            delayClass="animate-[fadeSlideIn_0.65s_ease-out]"
          >
            {candidateAvatar}
          </ParticipantPanel>
        </div>

        <div
          className={[
            'flex flex-col items-center animate-[fadeSlideIn_0.75s_ease-out]',
            compact ? 'mt-5 gap-4 sm:mt-6' : 'mt-8 gap-5 sm:mt-10',
          ].join(' ')}
        >
          <div
            className="flex min-h-12 w-full max-w-3xl items-center justify-center rounded-full border border-border/80 bg-surface-elevated/80 px-5 py-3 text-center shadow-[0_8px_32px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-6"
            role="status"
            aria-live="polite"
            aria-label="Live transcript"
          >
            <p
              key={lineIndex}
              className={[
                'leading-relaxed text-ink animate-[transcriptIn_0.45s_ease-out]',
                compact ? 'text-[13px] sm:text-sm' : 'text-sm sm:text-[15px]',
              ].join(' ')}
            >
              {INTERVIEW_TRANSCRIPT[lineIndex]}
            </p>
          </div>

          <button
            type="button"
            onClick={onEnd}
            className="inline-flex h-10 min-w-[5.5rem] items-center justify-center rounded-full bg-danger px-6 text-sm font-semibold text-white shadow-sm shadow-danger/30 transition-colors hover:bg-[#d94c4c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger cursor-pointer border-0"
          >
            End
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes transcriptIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes activePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139, 124, 246, 0.35); }
          50% { box-shadow: 0 0 0 6px rgba(139, 124, 246, 0); }
        }
      `}</style>
    </div>
  )
}

function StageAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 45% at 15% 10%, rgba(124, 109, 240, 0.14), transparent 55%),
            radial-gradient(ellipse 60% 40% at 90% 85%, rgba(124, 109, 240, 0.08), transparent 50%),
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, auto, 56px 56px, 56px 56px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255, 255, 255, 0.22) 1px, transparent 1px)',
          backgroundSize: '84px 84px',
          backgroundPosition: '28px 40px',
        }}
      />
    </>
  )
}

function ParticipantPanel({
  active,
  onSelect,
  label,
  children,
  delayClass,
  compact,
  accent = false,
}: {
  active: boolean
  onSelect: () => void
  label: string
  children: ReactNode
  delayClass: string
  compact: boolean
  accent?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={[
        'group relative flex w-full flex-col items-center justify-center overflow-hidden border text-left transition-all duration-300 cursor-pointer',
        delayClass,
        compact
          ? 'aspect-[5/3.6] rounded-2xl px-3 py-5 sm:aspect-[4/3] sm:rounded-[1.25rem]'
          : 'aspect-[5/4] rounded-2xl px-4 py-8 sm:aspect-[4/3] sm:rounded-3xl',
        active && accent
          ? 'border-brand-400 bg-gradient-to-b from-brand-100 via-surface-elevated to-surface shadow-[0_20px_50px_-24px_rgba(124,109,240,0.55)]'
          : active
            ? 'border-brand-400/70 bg-gradient-to-b from-surface-elevated via-surface to-canvas shadow-[0_20px_50px_-24px_rgba(124,109,240,0.35)]'
            : 'border-border bg-surface-elevated/80 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.45)] hover:border-brand-200 hover:bg-surface-elevated',
      ].join(' ')}
      style={
        active ? { animation: 'activePulse 2.4s ease-in-out infinite' } : undefined
      }
    >
      <div
        className={[
          'transition-transform duration-300',
          compact ? 'mb-4' : 'mb-6',
          active ? 'scale-105' : 'scale-100 group-hover:scale-[1.02]',
        ].join(' ')}
      >
        {children}
      </div>
      <p
        className={[
          'font-semibold tracking-wide',
          compact ? 'text-sm' : 'text-sm sm:text-base',
          active ? 'text-brand-400' : 'text-ink',
        ].join(' ')}
      >
        {label}
      </p>
    </button>
  )
}

function MerraMark({
  size = 56,
  className = 'text-ink',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M6 30L14 10L20 22L26 8L34 30"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
