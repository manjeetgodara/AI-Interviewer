import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

type RequireAuthProps = {
  children: ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const params = new URLSearchParams({
      auth: 'signin',
      from: location.pathname,
    })
    return <Navigate to={`/?${params.toString()}`} replace />
  }

  return children
}
