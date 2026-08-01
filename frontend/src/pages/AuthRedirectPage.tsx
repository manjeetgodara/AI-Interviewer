import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import type { AuthModalMode } from '@/context/AuthModalContext'

type AuthRedirectPageProps = {
  mode: AuthModalMode
}

/** Keeps /signin and /signup bookmarks working by opening the auth popup. */
export function AuthRedirectPage({ mode }: AuthRedirectPageProps) {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const params = new URLSearchParams()
  params.set('auth', mode)

  const fromState = (location.state as { from?: string } | null)?.from
  const fromQuery = searchParams.get('from')
  const from = fromState || fromQuery
  if (from) params.set('from', from)

  const error = searchParams.get('error')
  if (error) params.set('error', error)

  return <Navigate to={`/?${params.toString()}`} replace />
}
