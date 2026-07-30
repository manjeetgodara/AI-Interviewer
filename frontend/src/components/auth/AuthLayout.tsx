import type { ReactNode } from 'react'
import { MerraLogo } from '@/components/ui'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(165deg,#f4f7ff_0%,#ffffff_42%,#eef3ff_100%)]">
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-brand-100/70 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-12">
        <div className="mb-10 flex justify-center">
          <MerraLogo size="lg" className="items-center text-brand-600 [&_span]:text-ink" />
        </div>

        <div className="rounded-2xl border border-border/80 bg-white/90 p-7 shadow-[0_20px_60px_-28px_rgba(26,24,72,0.28)] backdrop-blur-sm sm:p-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.65rem]">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">{footer}</p>
      </div>
    </div>
  )
}
