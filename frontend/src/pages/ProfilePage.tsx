import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import { AvatarFace } from '@/components/auth/AvatarFace'
import { AvatarPicker } from '@/components/auth/AvatarPicker'
import { Button, MerraLogo } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { updateAvatar } from '@/lib/auth'
import {
  DEFAULT_AVATAR,
  getAvatarOption,
  isAvatarId,
  type AvatarId,
} from '@/lib/avatars'

export function ProfilePage() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [avatar, setAvatar] = useState<AvatarId>(DEFAULT_AVATAR)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && isAvatarId(user.avatar)) {
      setAvatar(user.avatar)
    }
  }, [user])

  if (!user) return null

  const currentAvatar = getAvatarOption(avatar)
  const dirty = user.avatar !== avatar

  async function handleSave() {
    if (!dirty || saving) return
    setError('')
    setSaving(true)
    try {
      const { user: nextUser } = await updateAvatar(avatar)
      updateUser(nextUser)
      navigate('/', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not update avatar',
      )
      setSaving(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(165deg,#f4f7ff_0%,#ffffff_42%,#eef3ff_100%)]">
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-brand-100/70 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-xl px-5 py-10 sm:py-14">
        <div className="mb-8 flex items-center justify-between gap-4">
          <MerraLogo size="md" className="text-brand-600 [&_span]:text-ink" />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted no-underline transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} aria-hidden />
            Back
          </Link>
        </div>

        <div className="rounded-3xl border border-border/80 bg-white/90 p-6 shadow-[0_20px_60px_-28px_rgba(26,24,72,0.28)] backdrop-blur-sm sm:p-8">
          <div className="flex items-center gap-4">
            <AvatarFace avatar={currentAvatar} size={72} />
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-ink">
                Profile
              </h1>
              <p className="mt-1 truncate text-sm text-ink-muted">{user.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <AvatarPicker
              label="Update your avatar"
              value={avatar}
              onChange={(next) => {
                setAvatar(next)
                setError('')
              }}
              disabled={saving}
            />
          </div>

          {error ? (
            <p
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link to="/" className="no-underline sm:mr-auto">
              <Button variant="ghost" size="md" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>
            <Button
              variant="primary"
              size="lg"
              className="w-full min-w-[180px] sm:w-auto"
              disabled={!dirty || saving}
              onClick={() => void handleSave()}
            >
              {saving ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" aria-hidden />
                  Saving…
                </>
              ) : (
                'Save avatar'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
