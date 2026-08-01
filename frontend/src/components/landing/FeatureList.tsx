import { Check } from 'lucide-react'

const FEATURES = [
  'Resume-based questions',
  'Instant feedback score',
  'Practice anytime',
] as const

export function FeatureList() {
  return (
    <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
      {FEATURES.map((feature) => (
        <li
          key={feature}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted sm:text-sm"
        >
          <span className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-success text-white">
            <Check size={11} strokeWidth={3} aria-hidden />
          </span>
          {feature}
        </li>
      ))}
    </ul>
  )
}
