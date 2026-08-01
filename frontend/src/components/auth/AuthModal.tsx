import { useEffect, useId, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/ui/Modal'
import { Button, Input, MerraLogo } from '@/components/ui'
import { AvatarPicker } from '@/components/auth/AvatarPicker'
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons'
import { useAuth } from '@/context/AuthContext'
import { useAuthModal } from '@/context/AuthModalContext'
import { signin, signup, startOAuth } from '@/lib/auth'
import { DEFAULT_AVATAR, type AvatarId } from '@/lib/avatars'

export function AuthModal() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const {
    isOpen,
    mode,
    redirectTo,
    errorFromUrl,
    closeAuth,
  } = useAuthModal()
  const subtitleId = useId()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState<AvatarId>(DEFAULT_AVATAR)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState(false)

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      closeAuth()
    }
  }, [isOpen, isAuthenticated, closeAuth])

  useEffect(() => {
    if (!isOpen) return
    setEmail('')
    setPassword('')
    setAvatar(DEFAULT_AVATAR)
    setError(errorFromUrl)
    setLoading(false)
    setSocialLoading(false)
  }, [isOpen, mode, errorFromUrl])

  const title = mode === 'signin' ? 'Welcome back' : 'Create your account'
  const subtitle =
    mode === 'signin'
      ? redirectTo === '/interview/setup'
        ? 'Sign in to set up your practice interview.'
        : 'Sign in to keep practicing job interviews with Merra.'
      : redirectTo === '/interview/setup'
        ? 'Create an account to set up your practice interview.'
        : 'Start practicing job interviews with AI in minutes.'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const auth =
        mode === 'signin'
          ? await signin({ email, password })
          : await signup({ email, password, avatar })
      login(auth)
      closeAuth()
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : mode === 'signin'
            ? 'Could not sign in'
            : 'Could not create account',
      )
    } finally {
      setLoading(false)
    }
  }

  function handleGoogleContinue() {
    setError('')
    setSocialLoading(true)
    try {
      startOAuth(
        'google',
        redirectTo,
        mode === 'signup' ? avatar : undefined,
      )
    } catch (err) {
      setSocialLoading(false)
      setError(
        err instanceof Error
          ? err.message
          : 'Could not continue with Google',
      )
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={closeAuth}
      title={title}
      describedById={subtitleId}
      header={
        <MerraLogo
          size="md"
          className="text-brand-400 [&_span]:text-ink"
        />
      }
    >
      <p id={subtitleId} className="text-sm leading-relaxed text-ink-muted">
        {subtitle}
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {mode === 'signup' ? (
          <AvatarPicker
            value={avatar}
            onChange={setAvatar}
            disabled={loading || socialLoading}
          />
        ) : null}

        <SocialAuthButtons
          disabled={loading}
          loading={socialLoading}
          onContinue={handleGoogleContinue}
        />

        <form
          key={mode}
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete={
              mode === 'signin' ? 'current-password' : 'new-password'
            }
            placeholder={
              mode === 'signin' ? 'Your password' : 'At least 8 characters'
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={mode === 'signup' ? 8 : undefined}
          />

          {error ? (
            <p
              className="rounded-xl border border-danger/40 bg-danger/10 px-3.5 py-2.5 text-sm text-danger"
              role="alert"
            >
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
            {mode === 'signin'
              ? loading
                ? 'Signing in…'
                : 'Sign in'
              : loading
                ? 'Creating account…'
                : 'Create account'}
          </Button>
        </form>
      </div>
    </Modal>
  )
}
