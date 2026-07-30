import { Circle, Pause, Play } from 'lucide-react'

type AudioPlayerProps = {
  currentTime?: string
  duration?: string
  isPlaying?: boolean
  onTogglePlay?: () => void
}

const WAVE_BARS = [
  0.25, 0.4, 0.55, 0.35, 0.7, 0.45, 0.85, 0.5, 0.65, 0.9, 0.55, 0.75, 0.4,
  0.6, 0.95, 0.5, 0.7, 0.35, 0.8, 0.55, 0.45, 0.75, 0.6, 0.85, 0.4, 0.65,
  0.5, 0.9, 0.55, 0.7, 0.35, 0.8, 0.45, 0.6, 0.75, 0.5, 0.85, 0.4, 0.65,
  0.55, 0.7, 0.35, 0.9, 0.5, 0.75, 0.45, 0.6, 0.8,
]

export function AudioPlayer({
  currentTime = '0:00',
  duration = '0:33',
  isPlaying = false,
  onTogglePlay,
}: AudioPlayerProps) {
  return (
    <div className="mt-3 flex items-center gap-3 rounded-xl bg-brand-600 px-3 py-2.5 text-white sm:px-4">
      <button
        type="button"
        onClick={onTogglePlay}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 cursor-pointer hover:bg-white/25"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause size={14} fill="currentColor" />
        ) : (
          <Play size={14} fill="currentColor" className="ml-0.5" />
        )}
      </button>

      <span className="shrink-0 text-xs font-medium tabular-nums opacity-95">
        {currentTime} / {duration}
      </span>

      <div
        className="flex h-8 min-w-0 flex-1 items-center gap-[2px] overflow-hidden"
        aria-hidden
      >
        {WAVE_BARS.map((h, i) => (
          <span
            key={i}
            className="w-[3px] shrink-0 rounded-full bg-white/85"
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>

      <span className="relative inline-flex shrink-0" aria-label="Recording">
        <Circle size={18} className="text-red-500" fill="currentColor" />
        <span className="absolute inset-0 animate-ping rounded-full bg-red-500/40" />
      </span>
    </div>
  )
}
