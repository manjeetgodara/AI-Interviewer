import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons'
import { Button, Input } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { signup, startOAuth } from '@/lib/auth'
import { getPostAuthRedirect } from '@/lib/authRedirect'

export function SignUpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState(false)

  const from =
    (location.state as { from?: string } | null)?.from ??
    searchParams.get('from') ??
    undefined
  const redirectTo = getPostAuthRedirect(from)

  useEffect(() => {
    const oauthError = searchParams.get('error')
    if (oauthError) setError(oauthError)
  }, [searchParams])

  function handleGoogleContinue() {
    setError('')
    setSocialLoading(true)
    try {
      startOAuth('google', redirectTo)
    } catch (err) {
      setSocialLoading(false)
      setError(
        err instanceof Error
          ? err.message
          : 'Could not continue with Google',
      )
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const auth = await signup({ email, password })
      login(auth)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        redirectTo === '/interview/setup'
          ? 'Create an account to start your interview setup.'
          : 'Start running conversational AI interviews in minutes.'
      }
      footer={
        <>
          Already have an account?{' '}
          <Link
            to="/signin"
            state={{ from }}
            className="font-semibold text-brand-600 no-underline hover:text-brand-700"
          >
            Sign in
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <SocialAuthButtons
          disabled={loading}
          loading={socialLoading}
          onContinue={handleGoogleContinue}
        />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Input
            label="Work email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-1 w-full"
            disabled={loading || socialLoading}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
