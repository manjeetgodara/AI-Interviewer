import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AvatarFace } from '@/components/auth/AvatarFace'
import { getInitials, useAuth } from '@/context/AuthContext'
import { getAvatarOption, isAvatarId } from '@/lib/avatars'

type UserAvatarProps = {
  className?: string
}

export function UserAvatar({ className = '' }: UserAvatarProps) {
  const navigate = useNavigate()
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

  const hasAvatar = isAvatarId(user.avatar)
  const avatar = hasAvatar ? getAvatarOption(user.avatar) : null
  const initials = getInitials(user.email)

  function openProfile() {
    setMenuOpen(false)
    navigate('/profile')
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className={[
          'inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full',
          'shadow-sm transition-opacity hover:opacity-90',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
          avatar
            ? 'bg-transparent shadow-brand-600/15'
            : 'bg-brand-600 text-sm font-bold tracking-wide text-white shadow-brand-600/25 hover:bg-brand-700',
        ].join(' ')}
        aria-label={`${user.email} account menu`}
        aria-expanded={menuOpen}
        title={user.email}
      >
        {avatar ? <AvatarFace avatar={avatar} size={40} /> : initials}
      </button>

      {menuOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={openProfile}
            className="flex w-full items-center gap-2.5 border-b border-border px-3.5 py-2.5 text-left transition-colors hover:bg-surface cursor-pointer border-0 bg-transparent"
            aria-label="Open profile"
          >
            {avatar ? (
              <AvatarFace avatar={avatar} size={28} />
            ) : (
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                {initials}
              </span>
            )}
            <span className="min-w-0 truncate text-sm font-semibold text-ink">
              {user.email}
            </span>
          </button>
          <button
            type="button"
            className="w-full px-3.5 py-2.5 text-left text-sm font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink cursor-pointer border-0 bg-transparent"
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
