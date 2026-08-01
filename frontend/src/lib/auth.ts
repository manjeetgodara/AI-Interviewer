const TOKEN_KEY = 'merra_token'
const USER_KEY = 'merra_user'

export type AuthUser = {
  id: string
  email: string
  avatar?: string
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
  email: string
  password: string
  avatar: string
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

export function updateAvatar(avatar: string) {
  return request<{ user: AuthUser }>('/api/auth/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({ avatar }),
  })
}

export function setStoredUser(user: AuthUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export type OAuthProvider = 'google'

/** Redirects the browser to the backend OAuth start endpoint. */
export function startOAuth(
  provider: OAuthProvider,
  redirectTo = '/',
  avatar?: string,
) {
  const params = new URLSearchParams({
    redirect: redirectTo,
  })
  if (avatar) params.set('avatar', avatar)
  window.location.assign(`/api/auth/oauth/${provider}?${params.toString()}`)
}

/** Persist an OAuth access token and load the authenticated user. */
export async function completeOAuthLogin(token: string): Promise<AuthResponse> {
  localStorage.setItem(TOKEN_KEY, token)
  try {
    const { user } = await fetchMe()
    const auth = { token, user }
    setSession(auth)
    return auth
  } catch (err) {
    clearSession()
    throw err
  }
}
