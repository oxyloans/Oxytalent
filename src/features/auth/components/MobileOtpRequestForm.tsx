import { useState, type FormEvent } from 'react'
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
// @ts-ignore
import 'react-phone-number-input/style.css'
import { AuthAlert } from './AuthAlert'
import { AUTH_FORM, AUTH_SUBMIT, AUTH_LINK_BTN_CENTER } from './authClasses'

interface MobileOtpRequestFormProps {
  /** mobile = national number without the dial code, countryCode = e.g. "+91" */
  onSubmit: (payload: { mobile: string; countryCode: string }) => Promise<void>
  onSwitchToEmail: () => void
}

// Wrapper classes reproduce the same bordered-box look as FormField, since
// react-phone-number-input renders its own internal markup we style via
// Tailwind's arbitrary descendant-selector variants instead of a plain
// <input>. The library's own stylesheet (imported above) is required for
// the flag icons/dropdown to lay out correctly — that part genuinely can't
// be replicated with utility classes, everything else here is Tailwind.
const PHONE_WRAPPER =
  'flex items-stretch rounded-[7px] border-[1.5px] bg-white pl-3.5 transition-colors duration-150 focus-within:border-brass'
const PHONE_WRAPPER_ERROR = 'border-rust'
const PHONE_WRAPPER_OK = 'border-ink/[0.16]'
const PHONE_INPUT_CLASSES =
  '[&_.PhoneInputCountry]:mr-2.5 [&_.PhoneInputCountry]:gap-1.5 ' +
  '[&_.PhoneInputCountrySelect]:cursor-pointer [&_.PhoneInputCountrySelect]:text-ink ' +
  '[&_.PhoneInputCountrySelect]:font-body ' +
  '[&_.PhoneInputCountrySelectArrow]:opacity-60 ' +
  '[&_.PhoneInputInput]:min-w-0 [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:border-none ' +
  '[&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:py-[13px] [&_.PhoneInputInput]:pr-3.5 ' +
  '[&_.PhoneInputInput]:font-body [&_.PhoneInputInput]:text-[14.5px] [&_.PhoneInputInput]:text-ink ' +
  '[&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:placeholder:text-ink/[0.38]'

export function MobileOtpRequestForm({ onSubmit, onSwitchToEmail }: MobileOtpRequestFormProps) {
  const [value, setValue] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isComplete = !!value && isValidPhoneNumber(value)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!value) {
      setError('Mobile number is required')
      return
    }
    if (!isValidPhoneNumber(value)) {
      setError('Enter a valid mobile number')
      return
    }

    const phoneNumber = parsePhoneNumber(value)
    if (!phoneNumber) {
      setError('Enter a valid mobile number')
      return
    }

    setError(null)
    setFormError(null)
    setIsSubmitting(true)
    try {
      await onSubmit({
        mobile: phoneNumber.nationalNumber,
        countryCode: `+${phoneNumber.countryCallingCode}`,
      })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={AUTH_FORM} onSubmit={handleSubmit} noValidate>
      {formError && <AuthAlert tone="error">{formError}</AuthAlert>}

      <div className="flex flex-col gap-[7px]">
        <label htmlFor="mobile-otp-input" className="text-[13.5px] font-semibold text-ink">
          Mobile Number<span className="ml-0.5 text-rust">*</span>
        </label>
        <div className={`${PHONE_WRAPPER} ${error ? PHONE_WRAPPER_ERROR : PHONE_WRAPPER_OK}`}>
          <PhoneInput
            id="mobile-otp-input"
            className={PHONE_INPUT_CLASSES}
            defaultCountry="IN"
            international
            placeholder="Enter your mobile number"
            value={value}
            onChange={setValue}
            aria-invalid={!!error}
            aria-describedby={error ? 'mobile-otp-error' : 'mobile-otp-hint'}
          />
        </div>
        {error ? (
          <p id="mobile-otp-error" className="m-0 text-[12.5px] text-rust" role="alert">
            {error}
          </p>
        ) : (
          <p id="mobile-otp-hint" className="m-0 text-[12.5px] text-muted-on-paper">
            You will receive an OTP on this number
          </p>
        )}
      </div>

      <button type="submit" className={AUTH_SUBMIT} disabled={isSubmitting || !isComplete}>
        {isSubmitting ? 'Sending OTP…' : 'Get OTP'}
      </button>

      <div className="relative my-1.5 flex items-center gap-3 text-[12.5px] text-muted-on-paper before:h-px before:flex-1 before:bg-ink/[0.14] before:content-[''] after:h-px after:flex-1 after:bg-ink/[0.14] after:content-['']">
        or
      </div>

      <button type="button" className={AUTH_LINK_BTN_CENTER} onClick={onSwitchToEmail}>
        Use Email to Login
      </button>
    </form>
  )
}



















