import { getToken } from '@/lib/auth'

export type InterviewSetupResponse = {
  role: string
  githubUrl: string
  resumeName: string
  textPath: string
}

type ApiErrorBody = {
  error?: string
  detail?: string
}

export async function submitInterviewSetup(input: {
  resume: File
  role: string
  githubUrl?: string
}): Promise<InterviewSetupResponse> {
  const form = new FormData()
  form.append('resume', input.resume)
  form.append('role', input.role)
  form.append('githubUrl', input.githubUrl?.trim() ?? '')

  const headers = new Headers()
  const token = getToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch('/api/interview/setup', {
    method: 'POST',
    headers,
    body: form,
  })

  const data = (await res.json().catch(() => ({}))) as InterviewSetupResponse &
    ApiErrorBody

  if (!res.ok) {
    throw new Error(data.error || data.detail || 'Failed to process resume')
  }

  return data
}
