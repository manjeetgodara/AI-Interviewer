import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { useAuth } from '@/context/AuthContext'
import { completeOAuthLogin } from '@/lib/auth'
import { getPostAuthRedirect } from '@/lib/authRedirect'

export function OAuthCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()
  const [error, setError] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    const redirect = getPostAuthRedirect(searchParams.get('redirect'))

    if (!token) {
      setError('Social sign-in did not return a valid session. Please try again.')
      return
    }

    let cancelled = false

    async function finish() {
      try {
        const auth = await completeOAuthLogin(token!)
        if (cancelled) return
        login(auth)
        navigate(redirect, { replace: true })
      } catch (err) {
        if (cancelled) return
        setError(
          err instanceof Error
            ? err.message
            : 'Could not complete social sign-in',
        )
      }
    }

    void finish()
    return () => {
      cancelled = true
    }
  }, [searchParams, login, navigate])

  return (
    <AuthLayout
      title="Finishing sign-in"
      subtitle="Just a moment while we connect your account."
      footer={
        error ? (
          <>
            Having trouble?{' '}
            <Link
              to="/?auth=signup"
              className="font-semibold text-brand-600 no-underline hover:text-brand-700"
            >
              Back to sign up
            </Link>
          </>
        ) : (
          'Please keep this window open.'
        )
      }
    >
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {error}
        </p>
      ) : (
        <div className="flex flex-col items-center gap-3 py-6 text-ink-muted">
          <LoaderCircle className="animate-spin text-brand-600" size={28} aria-hidden />
          <p className="text-sm font-medium">Completing sign-in…</p>
        </div>
      )}
    </AuthLayout>
  )
}
