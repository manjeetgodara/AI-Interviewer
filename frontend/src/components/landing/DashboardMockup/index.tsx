import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { MerraLogo } from '@/components/ui'
import dummyInterviewer from '@/assets/dummy-interviewer.svg'
import dummyCandidate from '@/assets/dummy-candidate.svg'
import { ParticipantTabs } from './ParticipantTabs'
import { VideoFeed } from './VideoFeed'
import { ChatHistory } from './ChatHistory'

const PARTICIPANTS = [
  {
    id: 'merra',
    name: 'AI Interviewer',
    role: 'Merra',
    label: 'AI Interviewer · Merra',
    imageUrl: dummyInterviewer,
    alt: 'AI Interviewer Merra placeholder',
    online: true,
  },
  {
    id: 'candidate',
    name: 'Candidate',
    role: 'Live session',
    label: 'Candidate',
    imageUrl: dummyCandidate,
    alt: 'Candidate placeholder',
  },
] as const

const CHAT_BY_PARTICIPANT: Record<string, { id: string; text: string }[]> = {
  merra: [
    {
      id: '1',
      text: "Hey, I'm Merra. I talk with candidates, not at a camera.",
    },
    {
      id: '2',
      text: "No 'record yourself' homework, no waffle — just a real conversation.",
    },
    {
      id: '3',
      text: 'Tell me about a time you had to ship under a tight deadline.',
    },
    {
      id: '4',
      text: 'What trade-offs did you make, and how did you communicate them?',
    },
  ],
  candidate: [
    {
      id: '1',
      text: 'In my last sprint we had three days left and a critical bug in checkout.',
    },
    {
      id: '2',
      text: 'I cut non-essential scope, paired with QA, and shipped a hotfix the same day.',
    },
    {
      id: '3',
      text: 'I kept stakeholders updated every few hours so expectations stayed clear.',
    },
  ],
}

export function DashboardMockup() {
  const [selectedId, setSelectedId] = useState('merra')

  const selected =
    PARTICIPANTS.find((p) => p.id === selectedId) ?? PARTICIPANTS[0]
  const messages = CHAT_BY_PARTICIPANT[selectedId] ?? CHAT_BY_PARTICIPANT.merra

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="relative rounded-2xl border border-border bg-white p-4 shadow-[0_24px_80px_-20px_rgba(26,24,72,0.18)] sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <MerraLogo size="sm" className="shrink-0" />
          <ParticipantTabs
            tabs={PARTICIPANTS.map(({ id, label, online }) => ({
              id,
              label,
              online,
            }))}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="min-w-0 flex-1">
            <VideoFeed
              timeLabel="12:18"
              dateLabel="09 September, 2025"
              selectedId={selectedId}
              participants={PARTICIPANTS.map(
                ({ id, name, role, imageUrl, alt }) => ({
                  id,
                  name,
                  role,
                  imageUrl,
                  alt,
                }),
              )}
            />
          </div>

          <ChatHistory
            title={`Chat History — ${selected.name}`}
            messages={messages}
          />
        </div>

        <button
          type="button"
          className="absolute -right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 cursor-pointer hover:bg-brand-700 xl:inline-flex"
          aria-label="Schedule interview"
        >
          <Calendar size={18} />
        </button>
      </div>
    </section>
  )
}
