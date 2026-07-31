import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  loadInterviewSetupDraft,
  saveInterviewSetupDraft,
  type ResumeMeta,
} from '@/lib/interviewSetup'

type InterviewSetupState = {
  resumeFile: File | null
  resumeMeta: ResumeMeta | null
  role: string
  customRole: string
  githubUrl: string
  setResume: (file: File | null) => void
  setRole: (role: string) => void
  setCustomRole: (value: string) => void
  setGithubUrl: (value: string) => void
  clearSetup: () => void
}

const InterviewSetupContext = createContext<InterviewSetupState | null>(null)

function persist(partial: {
  role: string
  customRole: string
  githubUrl: string
  resumeMeta: ResumeMeta | null
}) {
  saveInterviewSetupDraft({
    role: partial.role,
    customRole: partial.customRole,
    githubUrl: partial.githubUrl,
    resume: partial.resumeMeta,
  })
}

export function InterviewSetupProvider({ children }: { children: ReactNode }) {
  const draft = loadInterviewSetupDraft()
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeMeta, setResumeMeta] = useState<ResumeMeta | null>(
    draft?.resume ?? null,
  )
  const [role, setRoleState] = useState(draft?.role ?? '')
  const [customRole, setCustomRoleState] = useState(draft?.customRole ?? '')
  const [githubUrl, setGithubUrlState] = useState(draft?.githubUrl ?? '')

  const setResume = useCallback(
    (file: File | null) => {
      setResumeFile(file)
      const meta: ResumeMeta | null = file
        ? { name: file.name, size: file.size, type: file.type }
        : null
      setResumeMeta(meta)
      persist({ role, customRole, githubUrl, resumeMeta: meta })
    },
    [role, customRole, githubUrl],
  )

  const setRole = useCallback(
    (next: string) => {
      setRoleState(next)
      const nextCustom = next === 'Other' ? customRole : ''
      if (next !== 'Other') setCustomRoleState('')
      persist({
        role: next,
        customRole: nextCustom,
        githubUrl,
        resumeMeta,
      })
    },
    [customRole, githubUrl, resumeMeta],
  )

  const setCustomRole = useCallback(
    (value: string) => {
      setCustomRoleState(value)
      persist({ role, customRole: value, githubUrl, resumeMeta })
    },
    [role, githubUrl, resumeMeta],
  )

  const setGithubUrl = useCallback(
    (value: string) => {
      setGithubUrlState(value)
      persist({ role, customRole, githubUrl: value, resumeMeta })
    },
    [role, customRole, resumeMeta],
  )

  const clearSetup = useCallback(() => {
    setResumeFile(null)
    setResumeMeta(null)
    setRoleState('')
    setCustomRoleState('')
    setGithubUrlState('')
    persist({
      role: '',
      customRole: '',
      githubUrl: '',
      resumeMeta: null,
    })
  }, [])

  const value = useMemo(
    () => ({
      resumeFile,
      resumeMeta,
      role,
      customRole,
      githubUrl,
      setResume,
      setRole,
      setCustomRole,
      setGithubUrl,
      clearSetup,
    }),
    [
      resumeFile,
      resumeMeta,
      role,
      customRole,
      githubUrl,
      setResume,
      setRole,
      setCustomRole,
      setGithubUrl,
      clearSetup,
    ],
  )

  return (
    <InterviewSetupContext.Provider value={value}>
      {children}
    </InterviewSetupContext.Provider>
  )
}

export function useInterviewSetup() {
  const ctx = useContext(InterviewSetupContext)
  if (!ctx) {
    throw new Error('useInterviewSetup must be used within InterviewSetupProvider')
  }
  return ctx
}
