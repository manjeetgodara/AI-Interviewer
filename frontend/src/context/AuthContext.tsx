import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearSession,
  fetchMe,
  getStoredUser,
  getToken,
  setSession as persistSession,
  setStoredUser,
  type AuthResponse,
  type AuthUser,
} from '@/lib/auth'

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (auth: AuthResponse) => void
  logout: () => void
  updateUser: (user: AuthUser) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    getToken() ? getStoredUser() : null,
  )

  useEffect(() => {
    const token = getToken()
    if (!token) return

    let cancelled = false
    void fetchMe()
      .then(({ user: nextUser }) => {
        if (cancelled) return
        persistSession({ token, user: nextUser })
        setUser(nextUser)
      })
      .catch(() => {
        if (cancelled) return
        clearSession()
        setUser(null)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback((auth: AuthResponse) => {
    persistSession(auth)
    setUser(auth.user)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const updateUser = useCallback((nextUser: AuthUser) => {
    setStoredUser(nextUser)
    setUser(nextUser)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      updateUser,
    }),
    [user, login, logout, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

export function getInitials(email: string): string {
  const local = email.trim().split('@')[0] ?? ''
  const cleaned = local.replace(/[^a-zA-Z0-9]/g, '')
  if (cleaned.length === 0) return '?'
  return cleaned.slice(0, 2).toUpperCase()
}
