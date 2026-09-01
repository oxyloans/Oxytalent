import { InputHTMLAttributes, useId, useState } from 'react'

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | null
  hint?: string
}

export function PasswordField({ label, error, hint, id, ...inputProps }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const autoId = useId()
  const fieldId = id ?? autoId

  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={fieldId} className="text-[13.5px] font-semibold text-ink">
        {label}
        {inputProps.required && <span className="ml-0.5 text-rust">*</span>}
      </label>
      <div
        className={`flex items-stretch rounded-[7px] border-[1.5px] bg-white transition-colors duration-150 focus-within:border-brass ${
          error ? 'border-rust' : 'border-ink/[0.16]'
        }`}
      >
        <input
          id={fieldId}
          type={visible ? 'text' : 'password'}
          className="min-w-0 flex-1 border-none bg-transparent px-3.5 py-[13px] font-body text-[14.5px] text-ink outline-none placeholder:text-ink/[0.38]"
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          {...inputProps}
        />
        <button
          type="button"
          className="border-none bg-transparent px-4 text-[13px] font-semibold text-signal"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {error ? (
        <p id={`${fieldId}-error`} className="m-0 text-[12.5px] text-rust" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="m-0 text-[12.5px] text-muted-on-paper">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
