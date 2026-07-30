type WaveformBackgroundProps = {
  className?: string
  bars?: number
}

export function WaveformBackground({
  className = '',
  bars = 64,
}: WaveformBackgroundProps) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const wave = Math.sin(i * 0.35) * 0.35 + Math.sin(i * 0.12) * 0.25
    const midBoost = 1 - Math.abs(i - bars / 2) / (bars / 2)
    return Math.max(0.12, 0.2 + wave * midBoost + midBoost * 0.35)
  })

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 flex items-end justify-center gap-[3px] opacity-[0.18] ${className}`}
      aria-hidden
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-ink-soft"
          style={{ height: `${h * 100}%` }}
        />
      ))}
    </div>
  )
}
