import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Mic } from 'lucide-react'
import { Button, MerraLogo } from '@/components/ui'

type InterviewLocationState = {
  role?: string
  githubUrl?: string
  resumeName?: string
}

export function InterviewPage() {
  const location = useLocation()
  const state = (location.state as InterviewLocationState | null) ?? {}

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(165deg,#f4f7ff_0%,#ffffff_42%,#eef3ff_100%)]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-5 py-12">
        <div className="mb-8 flex justify-center">
          <MerraLogo size="lg" className="items-center text-brand-600 [&_span]:text-ink" />
        </div>

        <div className="rounded-3xl border border-border/80 bg-white/90 p-8 text-center shadow-[0_20px_60px_-28px_rgba(26,24,72,0.28)] backdrop-blur-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <Mic size={26} aria-hidden />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">
            You&apos;re all set
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {state.role
              ? `Your ${state.role} interview is ready to begin.`
              : 'Your interview setup is complete.'}
          </p>
          {state.resumeName ? (
            <p className="mt-4 rounded-xl bg-surface px-3.5 py-2.5 text-xs text-ink-muted">
              Resume: <span className="font-semibold text-ink">{state.resumeName}</span>
            </p>
          ) : null}

          <div className="mt-7 flex flex-col gap-3">
            <Link to="/interview/setup" className="no-underline">
              <Button variant="outline" size="md" className="w-full">
                <ArrowLeft size={15} aria-hidden />
                Back to setup
              </Button>
            </Link>
            <Link to="/" className="no-underline">
              <Button variant="ghost" size="md" className="w-full">
                Return home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
