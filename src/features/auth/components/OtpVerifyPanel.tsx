import { useState, type FormEvent } from 'react'
import { OtpInput } from './OtpInput'
import { AuthAlert } from './AuthAlert'
import { AUTH_FORM, AUTH_SUBMIT, AUTH_LINK_BTN } from './authClasses'
import { useCountdown } from '../hooks/useCountdown'
import { sanitizeOtpInput, validateOtp } from '../utils/validators'

interface OtpVerifyPanelProps {
  countryCode: string
  mobile: string
  /** Called with the raw 6-digit code; throw to surface an error. */
  onVerify: (otp: string) => Promise<void>
  onResend: () => Promise<void>
  onEditNumber?: () => void
  submitLabel?: string
}

export function OtpVerifyPanel({
  countryCode,
  mobile,
  onVerify,
  onResend,
  onEditNumber,
  submitLabel = 'Verify & Continue',
}: OtpVerifyPanelProps) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const { remaining, restart, isDone } = useCountdown(30)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationError = validateOtp(otp)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    setIsSubmitting(true)
    try {
      await onVerify(otp)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    setResendMessage(null)
    setError(null)
    try {
      await onResend()
      setOtp('')
      restart()
      setResendMessage('A new OTP has been sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not resend OTP')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <form className={AUTH_FORM} onSubmit={handleSubmit}>
      <p className="mb-0 text-[14.5px] leading-[1.5] text-muted-on-paper">
        Enter the 6-digit code sent to{' '}
        <strong className="text-ink">
          {countryCode} {mobile}
        </strong>
        {onEditNumber && (
          <>
            {' '}
            &middot;{' '}
            <button type="button" className={AUTH_LINK_BTN} onClick={onEditNumber}>
              Edit
            </button>
          </>
        )}
      </p>

      {error && <AuthAlert tone="error">{error}</AuthAlert>}
      {resendMessage && <AuthAlert tone="success">{resendMessage}</AuthAlert>}

      <OtpInput
        value={otp}
        onChange={(v) => setOtp(sanitizeOtpInput(v))}
        error={error}
        disabled={isSubmitting}
      />

      <div className="flex items-center justify-between text-[12.5px] text-muted-on-paper">
        <span>Didn&apos;t get a code? Check your SMS inbox.</span>
        <button type="button" className={AUTH_LINK_BTN} onClick={handleResend} disabled={!isDone || isResending}>
          {isResending ? 'Sending…' : isDone ? 'Resend OTP' : `Resend in ${remaining}s`}
        </button>
      </div>

      <button type="submit" className={AUTH_SUBMIT} disabled={isSubmitting || otp.length !== 6}>
        {isSubmitting ? 'Verifying…' : submitLabel}
      </button>
    </form>
  )
}
