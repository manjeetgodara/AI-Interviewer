import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  header?: ReactNode
  /** Optional id of element that describes the dialog */
  describedById?: string
}

export function Modal({
  open,
  onClose,
  title,
  children,
  header,
  describedById,
}: ModalProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    const focusTimer = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        ?.focus()
    }, 0)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(focusTimer)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 border-0 bg-ink/45 backdrop-blur-[2px] cursor-pointer"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={describedById}
        className="relative z-10 max-h-[min(90vh,720px)] w-full max-w-md overflow-y-auto rounded-2xl border border-border/80 bg-white p-6 shadow-[0_24px_80px_-20px_rgba(26,24,72,0.35)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink cursor-pointer border-0 bg-transparent"
          aria-label="Close"
        >
          <X size={18} aria-hidden />
        </button>

        {header ? <div className="mb-5 pr-10">{header}</div> : null}

        <h2
          id={titleId}
          className="pr-10 text-2xl font-extrabold tracking-tight text-ink sm:text-[1.65rem]"
        >
          {title}
        </h2>

        <div className="mt-2">{children}</div>
      </div>
    </div>
  )
}
