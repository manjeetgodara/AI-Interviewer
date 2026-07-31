import { useState } from 'react'
import { Link } from 'react-router-dom'
import { History, Menu, X } from 'lucide-react'
import { MerraLogo, Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-5 lg:px-8">
        <MerraLogo size="md" />

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-white px-3.5 text-[13px] font-semibold text-ink transition-colors hover:bg-surface cursor-pointer"
          >
            <History size={15} aria-hidden />
            View History
          </button>

          {isAuthenticated ? (
            <>
              <span className="max-w-[220px] truncate text-sm font-medium text-ink-muted">
                {user?.email}
              </span>
              <Link
                to="/interview/setup"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold tracking-wide text-white shadow-sm shadow-brand-600/25 transition-colors hover:bg-brand-700"
                aria-label="Go to interview setup"
              >
                GO
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold tracking-wide text-white shadow-sm shadow-brand-600/25 transition-colors hover:bg-brand-700"
                aria-label="Sign up"
              >
                GO
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {isAuthenticated && (
            <Link
              to="/interview/setup"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-xs font-bold tracking-wide text-white"
              aria-label="Go to interview setup"
            >
              GO
            </Link>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-white text-sm font-semibold text-ink cursor-pointer"
            >
              <History size={15} aria-hidden />
              View History
            </button>
            {isAuthenticated ? (
              <div className="border-t border-border pt-3">
                <p className="truncate px-1 text-sm font-semibold text-ink">
                  {user?.email}
                </p>
                <Link
                  to="/interview/setup"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex h-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold tracking-wide text-white"
                >
                  GO
                </Link>
                <Button
                  variant="outline"
                  size="md"
                  className="mt-2 w-full"
                  onClick={() => {
                    setOpen(false)
                    logout()
                  }}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/signin" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold tracking-wide text-white"
                >
                  GO
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
