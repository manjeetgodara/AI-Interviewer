import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearSession,
  getStoredUser,
  getToken,
  setSession as persistSession,
  type AuthResponse,
  type AuthUser,
} from '@/lib/auth'

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (auth: AuthResponse) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    getToken() ? getStoredUser() : null,
  )

  const login = useCallback((auth: AuthResponse) => {
    persistSession(auth)
    setUser(auth.user)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, login, logout],
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
