import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { Button, WaveformBackground } from '@/components/ui'
import { FeatureList } from './FeatureList'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-10 sm:pt-20 sm:pb-14">
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <h1 className="text-[2.15rem] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
          Conversational AI interviews
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-base sm:leading-7">
          A real back-and-forth with an AI interviewer — no pre-recorded video
          answers. In 15–20 minutes you get a 0–100 match-fit score with
          per-area evaluation, plus the full video &amp; transcript.
        </p>

        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WaveformBackground className="bottom-[-28px] h-24 sm:h-28" />
          <Link to="/interview/setup" className="relative z-10">
            <Button variant="primary" size="lg" className="min-w-[168px]">
              Start Interview
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            className="relative z-10 min-w-[168px]"
          >
            <Play size={16} fill="currentColor" aria-hidden />
            Hear a Sample
          </Button>
        </div>

        <FeatureList />
      </div>
    </section>
  )
}
