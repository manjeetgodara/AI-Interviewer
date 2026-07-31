import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { Button, Input } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { signin } from '@/lib/auth'
import { getPostAuthRedirect } from '@/lib/authRedirect'

export function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from =
    (location.state as { from?: string } | null)?.from ?? undefined
  const redirectTo = getPostAuthRedirect(from)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const auth = await signin({ email, password })
      login(auth)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={
        redirectTo === '/interview/setup'
          ? 'Sign in to start your interview setup.'
          : 'Sign in to continue interviewing with Merra.'
      }
      footer={
        <>
          New to Merra?{' '}
          <Link
            to="/signup"
            state={{ from }}
            className="font-semibold text-brand-600 no-underline hover:text-brand-700"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
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
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  )
}
