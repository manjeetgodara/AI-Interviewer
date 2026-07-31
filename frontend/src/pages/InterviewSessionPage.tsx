import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PhoneOff } from 'lucide-react'
import { Button, MerraLogo } from '@/components/ui'
import dummyInterviewer from '@/assets/dummy-interviewer.svg'
import dummyCandidate from '@/assets/dummy-candidate.svg'
import { ParticipantTabs } from '@/components/landing/DashboardMockup/ParticipantTabs'
import { VideoFeed } from '@/components/landing/DashboardMockup/VideoFeed'
import { ChatHistory } from '@/components/landing/DashboardMockup/ChatHistory'
import type { InterviewLocationState } from '@/pages/InterviewPage'

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

function formatSessionClock(date: Date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function formatSessionDate(date: Date) {
  return date
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase()
}

export function InterviewSessionPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = (location.state as InterviewLocationState | null) ?? {}
  const [selectedId, setSelectedId] = useState('merra')
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const selected =
    PARTICIPANTS.find((p) => p.id === selectedId) ?? PARTICIPANTS[0]
  const messages = CHAT_BY_PARTICIPANT[selectedId] ?? CHAT_BY_PARTICIPANT.merra

  const timeLabel = useMemo(() => formatSessionClock(now), [now])
  const dateLabel = useMemo(() => formatSessionDate(now), [now])

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-[90rem] rounded-2xl border border-border bg-white p-4 shadow-[0_24px_80px_-20px_rgba(26,24,72,0.18)] sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <MerraLogo size="sm" className="shrink-0" />
            {state.role ? (
              <p className="text-xs font-medium text-ink-muted">
                {state.role} interview
                {state.resumeName ? ` · ${state.resumeName}` : ''}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <ParticipantTabs
              tabs={PARTICIPANTS.map(({ id, label, online }) => ({
                id,
                label,
                online,
              }))}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/', { replace: true })}
              className="border-red-200 text-red-600 hover:border-red-400 hover:text-red-700"
            >
              <PhoneOff size={14} aria-hidden />
              End Interview
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="min-w-0 flex-1">
            <VideoFeed
              timeLabel={timeLabel}
              dateLabel={dateLabel}
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
      </div>
    </div>
  )
}
