type VideoParticipant = {
  id: string
  name: string
  role: string
  imageUrl: string
  alt: string
}

type VideoFeedProps = {
  participants: VideoParticipant[]
  selectedId: string
  timeLabel: string
  dateLabel: string
}

export function VideoFeed({
  participants,
  selectedId,
  timeLabel,
  dateLabel,
}: VideoFeedProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between gap-3 rounded-lg bg-[#eef0f6] px-3 py-2 text-[11px] font-semibold tracking-wide text-ink-muted sm:text-xs">
        <span className="uppercase">AI Interview</span>
        <span className="tabular-nums">{timeLabel}</span>
        <span className="uppercase tracking-wider">{dateLabel}</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {participants.map((person) => {
          const selected = person.id === selectedId
          return (
            <div
              key={person.id}
              className={[
                'relative aspect-[4/3] overflow-hidden rounded-xl bg-[#d8dce8] ring-2 transition-shadow',
                selected ? 'ring-brand-500' : 'ring-transparent',
              ].join(' ')}
            >
              <img
                src={person.imageUrl}
                alt={person.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2.5 pb-2 pt-8">
                <p className="text-[11px] font-semibold text-white sm:text-xs">
                  {person.name}
                </p>
                <p className="text-[10px] text-white/80">{person.role}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
