type SocialAuthButtonsProps = {
  disabled?: boolean
  loading?: boolean
  onContinue: () => void
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  )
}

export function SocialAuthButtons({
  disabled = false,
  loading = false,
  onContinue,
}: SocialAuthButtonsProps) {
  const busy = disabled || loading

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        disabled={busy}
        onClick={onContinue}
        className={[
          'inline-flex h-12 w-full items-center justify-center gap-3 rounded-full',
          'border border-border bg-surface px-5 text-sm font-semibold text-ink',
          'transition-colors duration-200',
          'hover:border-brand-400 hover:bg-brand-50',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400',
          'disabled:cursor-not-allowed disabled:opacity-50',
        ].join(' ')}
      >
        <GoogleIcon />
        {loading ? 'Continuing with Google…' : 'Continue with Google'}
      </button>

      <div className="relative my-1 flex items-center gap-3" aria-hidden>
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium tracking-wide text-ink-soft uppercase">
          or continue with email
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  )
}
