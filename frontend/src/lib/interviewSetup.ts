export const INTERVIEW_ROLES = [
  'Software Developer',
  'Data Analyst',
  'DevOps Engineer',
  'Product Manager',
  'UI/UX Designer',
  'QA Engineer',
  'Other',
] as const

export type InterviewRole = (typeof INTERVIEW_ROLES)[number]

export const MAX_RESUME_BYTES = 5 * 1024 * 1024
export const ACCEPTED_RESUME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const
export const ACCEPTED_RESUME_EXTENSIONS = ['.pdf', '.docx'] as const

export type ResumeMeta = {
  name: string
  size: number
  type: string
}

export type InterviewSetupDraft = {
  role: string
  customRole: string
  githubUrl: string
  resume: ResumeMeta | null
}

const STORAGE_KEY = 'merra_interview_setup'

const GITHUB_URL_PATTERN =
  /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}(?:\/[A-Za-z0-9._-]+)?\/?$/i

export function isValidGitHubUrl(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return true
  return GITHUB_URL_PATTERN.test(trimmed)
}

export function isAcceptedResumeFile(file: File): boolean {
  const lower = file.name.toLowerCase()
  const hasExtension = ACCEPTED_RESUME_EXTENSIONS.some((ext) =>
    lower.endsWith(ext),
  )
  const hasMime =
    ACCEPTED_RESUME_TYPES.includes(
      file.type as (typeof ACCEPTED_RESUME_TYPES)[number],
    ) || file.type === ''

  return hasExtension && hasMime
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function loadInterviewSetupDraft(): InterviewSetupDraft | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as InterviewSetupDraft
  } catch {
    return null
  }
}

export function saveInterviewSetupDraft(draft: InterviewSetupDraft): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
  } catch {
    // Ignore quota / private-mode failures
  }
}

export function clearInterviewSetupDraft(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore
  }
}
