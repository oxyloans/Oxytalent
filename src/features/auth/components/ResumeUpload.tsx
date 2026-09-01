import { useRef, useState } from 'react'

const ACCEPTED_EXTENSIONS = ['.doc', '.docx', '.pdf', '.rtf']
const MAX_SIZE_BYTES = 2 * 1024 * 1024 // 2 MB

interface ResumeUploadProps {
  onFileSelected: (file: File | null) => void
  error?: string | null
}

export function ResumeUpload({ onFileSelected, error: externalError }: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  const handleFile = (file: File | null) => {
    if (!file) {
      setFileName(null)
      onFileSelected(null)
      return
    }
    const extension = `.${file.name.split('.').pop()?.toLowerCase()}`
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      setLocalError('Upload a DOC, DOCX, PDF or RTF file')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setLocalError('File must be under 2 MB')
      return
    }
    setLocalError(null)
    setFileName(file.name)
    onFileSelected(file)
  }

  return (
    <div className="flex flex-col gap-[7px]">
      <span className="text-[13.5px] font-semibold text-ink">Resume</span>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-[20px] border-none bg-rust px-5 py-[9px] text-[13px] font-bold text-paper hover:opacity-[0.92]"
          onClick={() => inputRef.current?.click()}
        >
          Upload Resume
        </button>
        <span className="text-xs text-muted-on-paper">{fileName ?? 'DOC, DOCx, PDF, RTF | Max: 2 MB'}</span>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.join(',')}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </div>
      <p className="m-0 text-[12.5px] text-muted-on-paper">
        Recruiters prefer candidates who have a resume on their profile
      </p>
      {(localError || externalError) && (
        <p className="m-0 text-[12.5px] text-rust" role="alert">
          {localError ?? externalError}
        </p>
      )}
    </div>
  )
}
