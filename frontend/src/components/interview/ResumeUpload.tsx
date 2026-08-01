import { useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import {
  FileText,
  LoaderCircle,
  Replace,
  Trash2,
  Upload,
} from 'lucide-react'
import {
  ACCEPTED_RESUME_EXTENSIONS,
  formatFileSize,
  isAcceptedResumeFile,
  MAX_RESUME_BYTES,
  type ResumeMeta,
} from '@/lib/interviewSetup'

type ResumeUploadProps = {
  resumeMeta: ResumeMeta | null
  onFileReady: (file: File) => void
  onRemove: () => void
  error?: string
}

export function ResumeUpload({
  resumeMeta,
  onFileReady,
  onRemove,
  error,
}: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [localError, setLocalError] = useState('')

  async function processFile(file: File) {
    setLocalError('')

    if (!isAcceptedResumeFile(file)) {
      setLocalError('Please upload a PDF or DOCX file.')
      return
    }

    if (file.size > MAX_RESUME_BYTES) {
      setLocalError(
        `File is too large. Maximum size is ${formatFileSize(MAX_RESUME_BYTES)}.`,
      )
      return
    }

    setUploading(true)
    setProgress(0)

    await new Promise<void>((resolve) => {
      let current = 0
      const timer = window.setInterval(() => {
        current += Math.random() * 28 + 12
        if (current >= 100) {
          window.clearInterval(timer)
          setProgress(100)
          resolve()
        } else {
          setProgress(Math.min(current, 92))
        }
      }, 140)
    })

    onFileReady(file)
    setUploading(false)
    setProgress(0)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) void processFile(file)
    e.target.value = ''
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) void processFile(file)
  }

  const displayError = localError || error

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-ink" htmlFor="resume-upload">
          Resume
        </label>
        <span className="text-xs font-medium text-ink-soft">Required</span>
      </div>

      <input
        ref={inputRef}
        id="resume-upload"
        type="file"
        accept={ACCEPTED_RESUME_EXTENSIONS.join(',')}
        className="sr-only"
        onChange={handleChange}
      />

      {!resumeMeta || uploading ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => !uploading && inputRef.current?.click()}
          onKeyDown={(e) => {
            if (!uploading && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              inputRef.current?.click()
            }
          }}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={[
            'rounded-2xl border border-dashed px-5 py-8 text-center transition-colors',
            'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30',
            dragOver
              ? 'border-brand-400 bg-brand-50'
              : displayError
                ? 'border-danger/50 bg-danger/10'
                : 'border-border bg-surface hover:border-brand-400 hover:bg-brand-50/50',
            uploading ? 'pointer-events-none' : '',
          ].join(' ')}
        >
          {uploading ? (
            <div className="mx-auto max-w-xs">
              <LoaderCircle
                className="mx-auto animate-spin text-brand-400"
                size={28}
                aria-hidden
              />
              <p className="mt-3 text-sm font-semibold text-ink">
                Uploading resume…
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-brand-100">
                <div
                  className="h-full rounded-full bg-brand-500 transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-ink-muted">{Math.round(progress)}%</p>
            </div>
          ) : (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">
                <Upload size={22} aria-hidden />
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">
                Drag & drop your resume, or{' '}
                <span className="text-brand-400">browse</span>
              </p>
              <p className="mt-1.5 text-xs text-ink-muted">
                PDF or DOCX · Max {formatFileSize(MAX_RESUME_BYTES)}
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-400">
              <FileText size={20} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">
                {resumeMeta.name}
              </p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {formatFileSize(resumeMeta.size)} · Ready to use
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-brand-400 hover:text-brand-400"
                >
                  <Replace size={13} aria-hidden />
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocalError('')
                    onRemove()
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:border-danger/50 hover:text-danger"
                >
                  <Trash2 size={13} aria-hidden />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {displayError ? (
        <p className="mt-1.5 text-xs text-danger">{displayError}</p>
      ) : (
        <p className="mt-1.5 text-xs text-ink-soft">
          Supported formats: PDF, DOCX · Maximum file size:{' '}
          {formatFileSize(MAX_RESUME_BYTES)}
        </p>
      )}
    </div>
  )
}
