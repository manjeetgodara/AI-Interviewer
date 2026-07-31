import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export function Input({
  label,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name

  return (
    <label className="block" htmlFor={inputId}>
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={[
          'h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-ink',
          'placeholder:text-ink-soft outline-none transition-[border-color,box-shadow]',
          'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
          error ? 'border-red-400' : 'border-border',
          className,
        ].join(' ')}
        {...props}
      />
      {error ? (
        <span className="mt-1.5 block text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  )
}
