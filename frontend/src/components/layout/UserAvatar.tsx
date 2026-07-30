import { useState, useRef, useEffect } from 'react'
import { getInitials, useAuth } from '@/context/AuthContext'

type UserAvatarProps = {
  className?: string
}

export function UserAvatar({ className = '' }: UserAvatarProps) {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  if (!user) return null

  const initials = getInitials(user.fullName)

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold tracking-wide text-white shadow-sm shadow-brand-600/25 transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        aria-label={`${user.fullName} account menu`}
        aria-expanded={menuOpen}
        title={user.fullName}
      >
        {initials}
      </button>

      {menuOpen && (
        <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-white py-1 shadow-lg">
          <div className="border-b border-border px-3.5 py-2.5">
            <p className="truncate text-sm font-semibold text-ink">{user.fullName}</p>
            <p className="truncate text-xs text-ink-muted">{user.email}</p>
          </div>
          <button
            type="button"
            className="w-full px-3.5 py-2.5 text-left text-sm font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink"
            onClick={() => {
              setMenuOpen(false)
              logout()
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
