import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/30',
  secondary:
    'bg-surface-elevated text-ink border border-border hover:border-brand-400 hover:bg-brand-50',
  outline:
    'bg-transparent text-ink border border-border hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400',
  ghost: 'bg-transparent text-ink-muted hover:text-ink hover:bg-surface-elevated',
  danger:
    'bg-danger text-white hover:bg-[#d94c4c] shadow-sm shadow-danger/30',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-[15px]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
        'transition-colors duration-200 cursor-pointer border-0',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
