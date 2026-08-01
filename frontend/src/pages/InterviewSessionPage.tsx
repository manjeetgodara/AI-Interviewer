import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AvatarFace } from '@/components/auth/AvatarFace'
import { InterviewStage } from '@/components/interview/InterviewStage'
import { getInitials, useAuth } from '@/context/AuthContext'
import { getAvatarOption, isAvatarId } from '@/lib/avatars'
import dummyCandidate from '@/assets/dummy-candidate.svg'
import type { InterviewLocationState } from '@/pages/InterviewPage'

export function InterviewSessionPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const state = (location.state as InterviewLocationState | null) ?? {}

  const candidateLabel = useMemo(() => {
    if (!user?.email) return 'Candidate'
    const local = user.email.split('@')[0] ?? 'Candidate'
    return local
      .replace(/[._-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }, [user?.email])

  const candidateAvatar = isAvatarId(user?.avatar)
    ? getAvatarOption(user.avatar)
    : null
  const initials = user?.email ? getInitials(user.email) : 'YOU'

  const title = state.role
    ? `${state.role} practice interview`
    : 'Practice interview'
  const subtitle = state.resumeName
    ? `Interview session · ${state.resumeName}`
    : 'Interview session'

  return (
    <InterviewStage
      title={title}
      subtitle={subtitle}
      candidateLabel={candidateLabel}
      onEnd={() => navigate('/', { replace: true })}
      showThemeToggle
      className="min-h-screen bg-canvas"
      candidateAvatar={
        candidateAvatar ? (
          <div className="overflow-hidden rounded-full shadow-[0_12px_40px_-12px_rgba(124,109,240,0.35)] ring-4 ring-ink/90">
            <AvatarFace avatar={candidateAvatar} size={128} />
          </div>
        ) : user ? (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-600 text-2xl font-bold tracking-wide text-white shadow-[0_12px_40px_-12px_rgba(124,109,240,0.45)] ring-4 ring-ink/90 sm:h-32 sm:w-32 sm:text-3xl">
            {initials}
          </div>
        ) : (
          <div className="h-28 w-28 overflow-hidden rounded-full shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] ring-4 ring-ink/90 sm:h-32 sm:w-32">
            <img
              src={dummyCandidate}
              alt="Candidate"
              className="h-full w-full object-cover"
            />
          </div>
        )
      }
    />
  )
}
