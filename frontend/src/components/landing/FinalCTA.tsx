import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { Button, MerraLogo, RevealOnScroll } from '@/components/ui'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div
        className="pointer-events-none absolute left-1/2 top-[55%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300/30 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />

      <RevealOnScroll>
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
          <MerraLogo
            size="lg"
            className="items-center text-brand-600 [&_span]:text-ink"
          />

          <h2 className="mt-8 max-w-xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl sm:leading-tight">
            Built for Recruiters Who Value Time, Not Extra Tabs.
          </h2>

          <div className="relative mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link to="/interview/setup">
              <Button variant="primary" size="lg" className="min-w-[168px]">
                Start Interview
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="min-w-[168px]">
              <Play size={16} fill="currentColor" aria-hidden />
              Hear a Sample
            </Button>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
