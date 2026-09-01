import { useState, type FormEvent } from 'react'
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
//@ts-ignore
import 'react-phone-number-input/style.css'
import { FormField } from './FormField'
import { PasswordField } from './PasswordField'
import { WorkStatusToggle } from './WorkStatusToggle'
import { ResumeUpload } from './ResumeUpload'
import { AuthAlert } from './AuthAlert'
import { AUTH_FORM, AUTH_SUBMIT } from './authClasses'
import { validateEmail, validateFullName, validatePassword } from '../utils/validators'
import type { RegisterPayload, WorkStatus } from '../types/auth.types'

interface RegisterDetailsFormProps {
  onSubmit: (payload: RegisterPayload) => Promise<void>
}

type FieldErrors = Partial<Record<keyof RegisterPayload, string>>

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

export function RegisterDetailsForm({ onSubmit }: RegisterDetailsFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined)
  const [workStatus, setWorkStatus] = useState<WorkStatus | null>(null)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [agreedToUpdates, setAgreedToUpdates] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const runValidation = (): FieldErrors => {
    const next: FieldErrors = {}
    const nameErr = validateFullName(fullName)
    const emailErr = validateEmail(email)
    const passwordErr = validatePassword(password)
    if (nameErr) next.fullName = nameErr
    if (emailErr) next.email = emailErr
    if (passwordErr) next.password = passwordErr
    if (!phoneValue) next.mobile = 'Mobile number is required'
    else if (!isValidPhoneNumber(phoneValue)) next.mobile = 'Enter a valid mobile number'
    if (!workStatus) next.workStatus = 'Select whether you are experienced or a fresher'
    return next
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = runValidation()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    const phoneNumber = parsePhoneNumber(phoneValue as string)
    if (!phoneNumber) {
      setErrors((prev) => ({ ...prev, mobile: 'Enter a valid mobile number' }))
      return
    }

    setFormError(null)
    setIsSubmitting(true)
    try {
      await onSubmit({
        fullName,
        email,
        password,
        mobile: phoneNumber.nationalNumber,
        countryCode: `+${phoneNumber.countryCallingCode}`,
        workStatus: workStatus as WorkStatus,
        resumeFileName: resumeFile?.name,
      })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong, please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={AUTH_FORM} onSubmit={handleSubmit} noValidate>
      {formError && <AuthAlert tone="error">{formError}</AuthAlert>}

      <FormField
        label="Full name"
        required
        placeholder="What is your name?"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        error={errors.fullName}
        autoComplete="name"
      />

      <FormField
        label="Email ID"
        required
        type="email"
        placeholder="Tell us your Email ID"
        hint="We'll send relevant jobs and updates to this email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
      />

      <PasswordField
        label="Password"
        required
        placeholder="(Minimum 6 characters)"
        hint="This helps your account stay protected"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="new-password"
      />

      <div className="flex flex-col gap-[7px]">
        <label htmlFor="register-mobile-input" className="text-[13.5px] font-semibold text-ink">
          Mobile number<span className="ml-0.5 text-rust">*</span>
        </label>
        <div className={`${PHONE_WRAPPER} ${errors.mobile ? PHONE_WRAPPER_ERROR : PHONE_WRAPPER_OK}`}>
          <PhoneInput
            id="register-mobile-input"
            className={PHONE_INPUT_CLASSES}
            defaultCountry="IN"
            international
            placeholder="Enter your mobile number"
            value={phoneValue}
            onChange={setPhoneValue}
            autoComplete="tel-national"
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? 'register-mobile-error' : 'register-mobile-hint'}
          />
        </div>
        {errors.mobile ? (
          <p id="register-mobile-error" className="m-0 text-[12.5px] text-rust" role="alert">
            {errors.mobile}
          </p>
        ) : (
          <p id="register-mobile-hint" className="m-0 text-[12.5px] text-muted-on-paper">
            A verification code will be sent to this number
          </p>
        )}
      </div>

      <WorkStatusToggle value={workStatus} onChange={setWorkStatus} error={errors.workStatus} />

      <ResumeUpload onFileSelected={setResumeFile} />

      <label className="flex items-start gap-[9px] text-[12.5px] leading-[1.5] text-muted-on-paper">
        <input
          type="checkbox"
          checked={agreedToUpdates}
          onChange={(e) => setAgreedToUpdates(e.target.checked)}
          className="mt-0.5"
        />
        Send me important updates &amp; promotions via SMS, email, and WhatsApp
      </label>

      <p className="text-xs leading-[1.6] text-muted-on-paper">
        By clicking Register, you agree to the{' '}
        <a href="/terms" className="text-ink underline">Terms and Conditions</a> &amp;{' '}
        <a href="/privacy" className="text-ink underline">Privacy Policy</a> of OxyTalent.
      </p>

      <button type="submit" className={AUTH_SUBMIT} disabled={isSubmitting}>
        {isSubmitting ? 'Creating your profile…' : 'Register now'}
      </button>
    </form>
  )
}
