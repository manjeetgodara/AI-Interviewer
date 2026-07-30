import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { MerraLogo } from '@/components/ui'
import { VoiceSelector, type Voice } from './VoiceSelector'
import { VideoFeed } from './VideoFeed'
import { AudioPlayer } from './AudioPlayer'
import { ChatHistory } from './ChatHistory'

const VOICES: Voice[] = [
  { id: 'lily', name: 'Lily', online: true },
  { id: 'alexandra', name: 'Alexandra' },
  { id: 'chris', name: 'Chris' },
]

const CHAT_BY_VOICE: Record<string, { id: string; text: string }[]> = {
  lily: [
    {
      id: '1',
      text: "Hey, I'm Lily. I talk with candidates, not at a camera.",
    },
    {
      id: '2',
      text: "No 'record yourself' homework, no waffle — just a real conversation.",
    },
    {
      id: '3',
      text: "Tell me about a time you had to ship under a tight deadline.",
    },
    {
      id: '4',
      text: 'What trade-offs did you make, and how did you communicate them?',
    },
  ],
  alexandra: [
    {
      id: '1',
      text: "Hi, I'm Alexandra. I'll guide you through a structured interview.",
    },
    {
      id: '2',
      text: "We'll cover role fit, problem-solving, and how you collaborate.",
    },
    {
      id: '3',
      text: 'Walk me through a project you owned end to end.',
    },
  ],
  chris: [
    {
      id: '1',
      text: "Chris here — let's keep this conversational and practical.",
    },
    {
      id: '2',
      text: "I'll dig into how you think, not just what you've memorized.",
    },
    {
      id: '3',
      text: 'Describe a tough technical decision you made recently.',
    },
  ],
}

export function DashboardMockup() {
  const [selectedVoiceId, setSelectedVoiceId] = useState('lily')
  const [isPlaying, setIsPlaying] = useState(false)

  const selectedVoice =
    VOICES.find((v) => v.id === selectedVoiceId) ?? VOICES[0]
  const messages = CHAT_BY_VOICE[selectedVoiceId] ?? CHAT_BY_VOICE.lily

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="relative rounded-2xl border border-border bg-white p-4 shadow-[0_24px_80px_-20px_rgba(26,24,72,0.18)] sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <MerraLogo size="sm" className="shrink-0" />
          <VoiceSelector
            voices={VOICES}
            selectedId={selectedVoiceId}
            onSelect={setSelectedVoiceId}
          />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="min-w-0 flex-1">
            <VideoFeed
              timeLabel="12:18"
              dateLabel="09 September, 2025"
              interviewer={{
                name: 'AI Interviewer',
                role: 'Merra · Lily',
                imageUrl:
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=640&h=480&fit=crop&auto=format',
                alt: 'AI interviewer in a blue shirt',
              }}
              candidate={{
                name: 'Candidate',
                role: 'Live session',
                imageUrl:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=640&h=480&fit=crop&auto=format',
                alt: 'Candidate in a white shirt',
              }}
            />
            <AudioPlayer
              currentTime="0:00"
              duration="0:33"
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying((v) => !v)}
            />
          </div>

          <ChatHistory voiceName={selectedVoice.name} messages={messages} />
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
