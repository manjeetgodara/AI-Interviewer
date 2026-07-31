import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { INTERVIEW_ROLES } from '@/lib/interviewSetup'
import { Input } from '@/components/ui'

type RoleSelectProps = {
  role: string
  customRole: string
  onRoleChange: (role: string) => void
  onCustomRoleChange: (value: string) => void
  error?: string
}

export function RoleSelect({
  role,
  customRole,
  onRoleChange,
  onCustomRoleChange,
  error,
}: RoleSelectProps) {
  const listId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return [...INTERVIEW_ROLES]
    return INTERVIEW_ROLES.filter((item) => item.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  function selectRole(value: string) {
    onRoleChange(value)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-ink" htmlFor="role-trigger">
          Interview role
        </label>
        <span className="text-xs font-medium text-ink-soft">Required</span>
      </div>

      <button
        id="role-trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={[
          'flex h-11 w-full items-center justify-between gap-3 rounded-xl border bg-white px-3.5 text-left text-sm',
          'outline-none transition-[border-color,box-shadow]',
          'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
          error && !role ? 'border-red-400' : 'border-border',
        ].join(' ')}
      >
        <span className={role ? 'font-medium text-ink' : 'text-ink-soft'}>
          {role || 'Search or select a role'}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-ink-soft transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_40px_-24px_rgba(26,24,72,0.35)]">
          <div className="border-b border-border p-2">
            <div className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
                aria-hidden
              />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roles…"
                className="h-10 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-soft focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>
          <ul
            id={listId}
            role="listbox"
            aria-label="Interview roles"
            className="max-h-56 overflow-y-auto p-1.5"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-ink-muted">No roles found</li>
            ) : (
              filtered.map((item) => {
                const selected = item === role
                return (
                  <li key={item}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => selectRole(item)}
                      className={[
                        'flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                        selected
                          ? 'bg-brand-50 font-semibold text-brand-700'
                          : 'text-ink hover:bg-surface',
                      ].join(' ')}
                    >
                      {item}
                      {selected ? <Check size={15} aria-hidden /> : null}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      ) : null}

      {error && !role ? (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      ) : (
        <p className="mt-1.5 text-xs text-ink-soft">
          Choose the role this interview should evaluate
        </p>
      )}

      {role === 'Other' ? (
        <div className="mt-4">
          <Input
            label="Custom role"
            name="customRole"
            placeholder="e.g. Machine Learning Engineer"
            value={customRole}
            onChange={(e) => onCustomRoleChange(e.target.value)}
            error={
              error && !customRole.trim() ? error : undefined
            }
          />
        </div>
      ) : null}
    </div>
  )
}
