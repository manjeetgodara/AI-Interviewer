const TOKEN_KEY = 'merra_token'
const USER_KEY = 'merra_user'

export type AuthUser = {
  id: string
  fullName: string
  email: string
  createdAt: string
}

export type AuthResponse = {
  user: AuthUser
  token: string
}

type ApiErrorBody = {
  error?: string
  detail?: string
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }

  const token = getToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(path, { ...options, headers })
  const data = (await res.json().catch(() => ({}))) as T & ApiErrorBody

  if (!res.ok) {
    throw new Error(data.error || data.detail || 'Something went wrong')
  }

  return data
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function setSession(auth: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, auth.token)
  localStorage.setItem(USER_KEY, JSON.stringify(auth.user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function signup(input: {
  fullName: string
  email: string
  password: string
}) {
  return request<AuthResponse>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function signin(input: { email: string; password: string }) {
  return request<AuthResponse>('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function fetchMe() {
  return request<{ user: AuthUser }>('/api/auth/me')
}
