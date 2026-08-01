import { AvatarFace } from '@/components/auth/AvatarFace'
import {
  AVATAR_OPTIONS,
  type AvatarId,
} from '@/lib/avatars'

type AvatarPickerProps = {
  value: AvatarId
  onChange: (id: AvatarId) => void
  disabled?: boolean
  label?: string
}

export function AvatarPicker({
  value,
  onChange,
  disabled = false,
  label = 'Choose your avatar',
}: AvatarPickerProps) {
  return (
    <fieldset disabled={disabled} className="min-w-0 border-0 p-0 m-0">
      <legend className="mb-2.5 text-sm font-medium text-ink">{label}</legend>
      <div
        className="grid grid-cols-4 gap-2.5"
        role="radiogroup"
        aria-label="Choose your avatar"
      >
        {AVATAR_OPTIONS.map((avatar) => {
          const selected = avatar.id === value
          return (
            <button
              key={avatar.id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={avatar.label}
              disabled={disabled}
              onClick={() => onChange(avatar.id)}
              className={[
                'inline-flex items-center justify-center rounded-2xl border-2 p-1.5 transition-all cursor-pointer',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
                'disabled:cursor-not-allowed disabled:opacity-50',
                selected
                  ? 'border-brand-600 bg-brand-50 shadow-sm shadow-brand-600/15'
                  : 'border-transparent bg-surface hover:border-border',
              ].join(' ')}
            >
              <AvatarFace avatar={avatar} size={48} />
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
