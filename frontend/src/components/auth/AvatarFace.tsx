import type { AvatarOption } from '@/lib/avatars'

type AvatarFaceProps = {
  avatar: AvatarOption
  size?: number
  className?: string
}

export function AvatarFace({
  avatar,
  size = 40,
  className = '',
}: AvatarFaceProps) {
  return (
    <img
      src={avatar.src}
      alt=""
      width={size}
      height={size}
      draggable={false}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  )
}
