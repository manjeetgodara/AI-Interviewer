import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

type ThemeToggleProps = {
  className?: string
  /** Slightly denser label for menus */
  showLabel?: boolean
}

export function ThemeToggle({
  className = '',
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full border border-border',
        'bg-surface-elevated text-ink transition-colors',
        'hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:text-brand-400',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400',
        'cursor-pointer',
        showLabel ? 'h-10 px-4 text-sm font-semibold' : 'h-9 w-9',
        className,
      ].join(' ')}
    >
      {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
      {showLabel ? (isDark ? 'Light theme' : 'Dark theme') : null}
    </button>
  )
}
