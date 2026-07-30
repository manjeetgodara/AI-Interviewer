import { Play } from 'lucide-react'

export type Voice = {
  id: string
  name: string
  online?: boolean
}

type VoiceSelectorProps = {
  voices: Voice[]
  selectedId: string
  extraCount?: number
  onSelect: (id: string) => void
}

export function VoiceSelector({
  voices,
  selectedId,
  extraCount = 10,
  onSelect,
}: VoiceSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {voices.map((voice) => {
        const selected = voice.id === selectedId
        return (
          <button
            key={voice.id}
            type="button"
            onClick={() => onSelect(voice.id)}
            className={[
              'inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-semibold transition-colors cursor-pointer',
              selected
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-border bg-white text-ink-muted hover:border-brand-300 hover:text-ink',
            ].join(' ')}
          >
            {selected && voice.online && (
              <span
                className="h-2 w-2 rounded-full bg-success"
                aria-label="Online"
              />
            )}
            <Play
              size={11}
              fill="currentColor"
              className={selected ? 'text-brand-600' : 'text-ink-soft'}
              aria-hidden
            />
            {voice.name}
          </button>
        )
      })}
      <button
        type="button"
        className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3.5 text-sm font-semibold text-ink-muted cursor-pointer hover:text-ink"
      >
        +{extraCount} Voices
      </button>
    </div>
  )
}
