import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import { getPostAuthRedirect } from '@/lib/authRedirect'

export type AuthModalMode = 'signin' | 'signup'

type OpenAuthOptions = {
  from?: string
  error?: string
}

type AuthModalContextValue = {
  isOpen: boolean
  mode: AuthModalMode
  redirectTo: string
  errorFromUrl: string
  openAuth: (mode: AuthModalMode, options?: OpenAuthOptions) => void
  switchMode: (mode: AuthModalMode) => void
  closeAuth: () => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

function isAuthMode(value: string | null): value is AuthModalMode {
  return value === 'signin' || value === 'signup'
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const modeParam = searchParams.get('auth')
  const isOpen = isAuthMode(modeParam)
  const mode: AuthModalMode = isOpen ? modeParam : 'signin'
  const errorFromUrl = searchParams.get('error') ?? ''
  const redirectTo = getPostAuthRedirect(searchParams.get('from'))

  const openAuth = useCallback(
    (nextMode: AuthModalMode, options?: OpenAuthOptions) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.set('auth', nextMode)
          if (options?.from) next.set('from', options.from)
          else next.delete('from')
          if (options?.error) next.set('error', options.error)
          else next.delete('error')
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const switchMode = useCallback(
    (nextMode: AuthModalMode) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.set('auth', nextMode)
          next.delete('error')
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const closeAuth = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete('auth')
        next.delete('error')
        next.delete('from')
        return next
      },
      { replace: true },
    )
  }, [setSearchParams])

  const value = useMemo(
    () => ({
      isOpen,
      mode,
      redirectTo,
      errorFromUrl,
      openAuth,
      switchMode,
      closeAuth,
    }),
    [
      isOpen,
      mode,
      redirectTo,
      errorFromUrl,
      openAuth,
      switchMode,
      closeAuth,
    ],
  )

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  )
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext)
  if (!ctx) {
    throw new Error('useAuthModal must be used within AuthModalProvider')
  }
  return ctx
}
