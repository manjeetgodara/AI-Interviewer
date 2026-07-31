export type ParticipantTab = {
  id: string
  label: string
  online?: boolean
}

type ParticipantTabsProps = {
  tabs: ParticipantTab[]
  selectedId: string
  onSelect: (id: string) => void
}

export function ParticipantTabs({
  tabs,
  selectedId,
  onSelect,
}: ParticipantTabsProps) {
  return (
    <div
      className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-surface p-1"
      role="tablist"
      aria-label="Interview participants"
    >
      {tabs.map((tab) => {
        const selected = tab.id === selectedId
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect(tab.id)}
            className={[
              'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors cursor-pointer',
              selected
                ? 'bg-white text-brand-700 shadow-sm ring-1 ring-brand-200'
                : 'text-ink-muted hover:text-ink',
            ].join(' ')}
          >
            {selected && tab.online && (
              <span
                className="h-2 w-2 rounded-full bg-success"
                aria-label="Online"
              />
            )}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
