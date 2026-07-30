import { Link } from 'react-router-dom'

type MerraLogoProps = {
  className?: string
  showWordmark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { icon: 22, text: 'text-sm' },
  md: { icon: 28, text: 'text-base' },
  lg: { icon: 36, text: 'text-lg' },
} as const

export function MerraLogo({
  className = '',
  showWordmark = true,
  size = 'md',
}: MerraLogoProps) {
  const { icon, text } = sizeMap[size]

  return (
    <Link
      to="/"
      className={`inline-flex flex-col items-start gap-0.5 text-ink no-underline ${className}`}
      aria-label="Merra home"
    >
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M6 30L14 10L20 22L26 8L34 30"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span
          className={`font-extrabold tracking-[0.14em] uppercase leading-none ${text}`}
        >
          MERRA
        </span>
      )}
    </Link>
  )
}
