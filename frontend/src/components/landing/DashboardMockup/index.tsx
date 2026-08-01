import dummyCandidate from '@/assets/dummy-candidate.svg'
import { InterviewStage } from '@/components/interview/InterviewStage'

export function DashboardMockup() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)] sm:rounded-3xl">
        <InterviewStage
          compact
          title="Practice interview"
          subtitle="Interview session"
          candidateLabel="Candidate"
          candidateAvatar={
            <div className="h-20 w-20 overflow-hidden rounded-full shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] ring-4 ring-ink/90 sm:h-24 sm:w-24">
              <img
                src={dummyCandidate}
                alt="Candidate"
                className="h-full w-full object-cover"
              />
            </div>
          }
        />
      </div>
    </section>
  )
}
