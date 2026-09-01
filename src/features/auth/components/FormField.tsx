import { InputHTMLAttributes, forwardRef } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | null
  hint?: string
  prefix?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, prefix, id, className, ...inputProps }, ref) => {
    const fieldId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`
    return (
      <div className="flex flex-col gap-[7px]">
        <label htmlFor={fieldId} className="text-[13.5px] font-semibold text-ink">
          {label}
          {inputProps.required && <span className="ml-0.5 text-rust">*</span>}
        </label>
        <div
          className={`flex items-stretch rounded-[7px] border-[1.5px] bg-white transition-colors duration-150 focus-within:border-brass ${
            prefix ? 'items-center' : ''
          } ${error ? 'border-rust' : 'border-ink/[0.16]'}`}
        >
          {prefix && <span className="py-0 pl-3.5 pr-0 font-mono text-[14.5px] text-muted-on-paper">{prefix}</span>}
          <input
            id={fieldId}
            ref={ref}
            className={`min-w-0 flex-1 border-none bg-transparent px-3.5 py-[13px] font-body text-[14.5px] text-ink outline-none placeholder:text-ink/[0.38] ${className ?? ''}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
            {...inputProps}
          />
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
)

FormField.displayName = 'FormField'
