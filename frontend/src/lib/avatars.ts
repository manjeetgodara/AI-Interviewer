import coral from '@/assets/avatars/coral.svg'
import amber from '@/assets/avatars/amber.svg'
import lime from '@/assets/avatars/lime.svg'
import sky from '@/assets/avatars/sky.svg'
import indigo from '@/assets/avatars/indigo.svg'
import rose from '@/assets/avatars/rose.svg'
import teal from '@/assets/avatars/teal.svg'
import slate from '@/assets/avatars/slate.svg'

export const AVATAR_IDS = [
  'coral',
  'amber',
  'lime',
  'sky',
  'indigo',
  'rose',
  'teal',
  'slate',
] as const

export type AvatarId = (typeof AVATAR_IDS)[number]

export const DEFAULT_AVATAR: AvatarId = 'coral'

export type AvatarOption = {
  id: AvatarId
  label: string
  src: string
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'coral', label: 'Coral', src: coral },
  { id: 'amber', label: 'Amber', src: amber },
  { id: 'lime', label: 'Lime', src: lime },
  { id: 'sky', label: 'Sky', src: sky },
  { id: 'indigo', label: 'Indigo', src: indigo },
  { id: 'rose', label: 'Rose', src: rose },
  { id: 'teal', label: 'Teal', src: teal },
  { id: 'slate', label: 'Slate', src: slate },
]

export function isAvatarId(value: unknown): value is AvatarId {
  return (
    typeof value === 'string' &&
    (AVATAR_IDS as readonly string[]).includes(value)
  )
}

export function getAvatarOption(id: string | null | undefined): AvatarOption {
  const match = AVATAR_OPTIONS.find((avatar) => avatar.id === id)
  return match ?? AVATAR_OPTIONS[0]
}
