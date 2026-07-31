import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Briefcase,
  GitBranch,
  LoaderCircle,
  Sparkles,
} from 'lucide-react'
import { ResumeUpload, RoleSelect } from '@/components/interview'
import { Button, Input, MerraLogo } from '@/components/ui'
import { useInterviewSetup } from '@/context/InterviewSetupContext'
import { submitInterviewSetup } from '@/lib/interviewApi'
import { isValidGitHubUrl } from '@/lib/interviewSetup'

export function InterviewSetupPage() {
  const navigate = useNavigate()
  const {
    resumeFile,
    resumeMeta,
    role,
    customRole,
    githubUrl,
    setResume,
    setRole,
    setCustomRole,
    setGithubUrl,
  } = useInterviewSetup()

  const [resumeError, setResumeError] = useState('')
  const [roleError, setRoleError] = useState('')
  const [githubError, setGithubError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const hasResume = Boolean(resumeFile)
  const hasRole =
    Boolean(role) && (role !== 'Other' || customRole.trim().length > 0)
  const canContinue = hasResume && hasRole && !submitting

  const resolvedRole = useMemo(() => {
    if (role === 'Other') return customRole.trim()
    return role
  }, [role, customRole])

  function validate(): boolean {
    let ok = true

    if (!resumeFile) {
      setResumeError(
        resumeMeta
          ? 'Please re-upload your resume to continue.'
          : 'Please upload your resume to continue.',
      )
      ok = false
    } else {
      setResumeError('')
    }

    if (!role) {
      setRoleError('Please select an interview role.')
      ok = false
    } else if (role === 'Other' && !customRole.trim()) {
      setRoleError('Please enter a custom role title.')
      ok = false
    } else {
      setRoleError('')
    }

    if (githubUrl.trim() && !isValidGitHubUrl(githubUrl)) {
      setGithubError(
        'Enter a valid GitHub profile or repository URL (e.g. https://github.com/username).',
      )
      ok = false
    } else {
      setGithubError('')
    }

    return ok
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate() || !resumeFile) return

    setSubmitting(true)
    setSubmitError('')
    try {
      const result = await submitInterviewSetup({
        resume: resumeFile,
        role: resolvedRole,
        githubUrl: githubUrl.trim(),
      })
      navigate('/interview', {
        state: {
          role: result.role,
          githubUrl: result.githubUrl,
          resumeName: result.resumeName,
          textPath: result.textPath,
        },
      })
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Failed to process resume',
      )
    } finally {
      setSubmitting(false)
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
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Sparkles size={20} aria-hidden />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.65rem]">
                Interview setup
              </h1>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Upload your resume and choose a role so Merra can tailor your
                AI interview.
              </p>
            </div>
          </div>

          <form className="mt-8 flex flex-col gap-7" onSubmit={handleSubmit} noValidate>
            <ResumeUpload
              resumeMeta={resumeMeta}
              onFileReady={(file) => {
                setResumeError('')
                setResume(file)
              }}
              onRemove={() => {
                setResumeError('')
                setResume(null)
              }}
              error={resumeError}
            />

            <div className="h-px bg-border" />

            <div className="flex items-center gap-2 text-ink">
              <Briefcase size={16} className="text-brand-600" aria-hidden />
              <h2 className="text-sm font-bold tracking-wide text-ink uppercase">
                Role details
              </h2>
            </div>

            <RoleSelect
              role={role}
              customRole={customRole}
              onRoleChange={(next) => {
                setRoleError('')
                setRole(next)
              }}
              onCustomRoleChange={(value) => {
                setRoleError('')
                setCustomRole(value)
              }}
              error={roleError}
            />

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                  <GitBranch size={15} className="text-ink-soft" aria-hidden />
                  GitHub profile
                </span>
                <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-ink-soft uppercase">
                  Optional
                </span>
              </div>
              <Input
                id="githubUrl"
                name="githubUrl"
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => {
                  setGithubError('')
                  setGithubUrl(e.target.value)
                }}
                onBlur={() => {
                  if (githubUrl.trim() && !isValidGitHubUrl(githubUrl)) {
                    setGithubError(
                      'Enter a valid GitHub profile or repository URL (e.g. https://github.com/username).',
                    )
                  }
                }}
                error={githubError}
                aria-label="GitHub profile or repository URL"
                aria-describedby="github-hint"
              />
              {!githubError ? (
                <p id="github-hint" className="mt-1.5 text-xs text-ink-soft">
                  Share a profile or repository URL to help personalize technical
                  questions.
                </p>
              ) : null}
            </div>

            {submitError ? (
              <p
                className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
                role="alert"
              >
                {submitError}
              </p>
            ) : null}

            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                size="md"
                className="w-full sm:w-auto"
                onClick={() => navigate('/')}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full min-w-[220px] sm:w-auto"
                disabled={!canContinue}
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" aria-hidden />
                    Preparing interview…
                  </>
                ) : (
                  'Continue to Interview'
                )}
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-ink-soft">
          Your resume is parsed when you continue so Merra can tailor the interview.
        </p>
      </div>
    </div>
  )
}
