const DEFAULT_AFTER_AUTH = '/'

/** Safe in-app path from sign-in/sign-up location state. */
export function getPostAuthRedirect(from: unknown): string {
  if (typeof from !== 'string') return DEFAULT_AFTER_AUTH
  if (!from.startsWith('/') || from.startsWith('//')) return DEFAULT_AFTER_AUTH
  return from
}
