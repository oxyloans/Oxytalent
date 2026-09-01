import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../features/auth/components/AuthLayout'
import { FormField } from '../../features/auth/components/FormField'
import { PasswordField } from '../../features/auth/components/PasswordField'
import { OtpVerifyPanel } from '../../features/auth/components/OtpVerifyPanel'
import { AuthAlert } from '../../features/auth/components/AuthAlert'
import {
  AUTH_FORM,
  AUTH_SUBMIT,
  AUTH_CARD_TITLE,
  AUTH_CARD_SUBTITLE,
  AUTH_BACK,
  AUTH_FOOTER,
  AUTH_FOOTER_LINK,
} from '../../features/auth/components/authClasses'
import { authService } from '../../features/auth/services/authService'
import { sanitizeMobileInput, validateMobile, validatePassword } from '../../features/auth/utils/validators'

type Step = 'request' | 'verify' | 'reset' | 'done'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('request')
  const [mobile, setMobile] = useState('')
  const [mobileError, setMobileError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verifiedOtp, setVerifiedOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const handleRequestSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const err = validateMobile(mobile)
    setMobileError(err)
    if (err) return
    setFormError(null)
    setIsSubmitting(true)
    try {
      await authService.requestPasswordReset(mobile, '+91')
      setStep('verify')
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  // OtpVerifyPanel normally logs the user in on verify; here we just want to
  // *confirm* the code, so we keep it locally and move to the reset step.
  const handleVerify = async (otp: string) => {
    setVerifiedOtp(otp)
    setStep('reset')
  }

  const handleResend = async () => {
    await authService.resendOtp(mobile, 'reset-password')
  }

  const handleResetSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const err = validatePassword(newPassword)
    setPasswordError(err)
    if (err) return
    setIsSubmitting(true)
    setFormError(null)
    try {
      await authService.resetPassword({ mobile, countryCode: '+91', otp: verifiedOtp, newPassword })
      setStep('done')
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Something went wrong')
      setStep('verify')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout eyebrow="Reset access">
      {step === 'request' && (
        <>
          <h2 className={AUTH_CARD_TITLE}>Forgot password?</h2>
          <p className={AUTH_CARD_SUBTITLE}>
            Enter the mobile number linked to your account and we&apos;ll send you a code to reset your password.
          </p>
          <form className={AUTH_FORM} onSubmit={handleRequestSubmit} noValidate>
            {formError && <AuthAlert tone="error">{formError}</AuthAlert>}
            <FormField
              label="Mobile Number"
              required
              type="tel"
              inputMode="numeric"
              prefix="+91"
              placeholder="Enter your 10 digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(sanitizeMobileInput(e.target.value))}
              error={mobileError}
            />
            <button type="submit" className={AUTH_SUBMIT} disabled={isSubmitting || mobile.length !== 10}>
              {isSubmitting ? 'Sending OTP…' : 'Send OTP'}
            </button>
          </form>
        </>
      )}

      {step === 'verify' && (
        <>
          <button type="button" className={AUTH_BACK} onClick={() => setStep('request')}>
            ← Back
          </button>
          <h2 className={AUTH_CARD_TITLE}>Enter the code</h2>
          <OtpVerifyPanel
            countryCode="+91"
            mobile={mobile}
            onVerify={handleVerify}
            onResend={handleResend}
            onEditNumber={() => setStep('request')}
            submitLabel="Continue"
          />
        </>
      )}

      {step === 'reset' && (
        <>
          <h2 className={AUTH_CARD_TITLE}>Set a new password</h2>
          <form className={AUTH_FORM} onSubmit={handleResetSubmit} noValidate>
            {formError && <AuthAlert tone="error">{formError}</AuthAlert>}
            <PasswordField
              label="New password"
              required
              placeholder="(Minimum 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={passwordError}
              autoComplete="new-password"
            />
            <button type="submit" className={AUTH_SUBMIT} disabled={isSubmitting}>
              {isSubmitting ? 'Saving…' : 'Reset password'}
            </button>
          </form>
        </>
      )}

      {step === 'done' && (
        <>
          <h2 className={AUTH_CARD_TITLE}>Password updated</h2>
          <AuthAlert tone="success">Your password has been reset. You can now log in with your new password.</AuthAlert>
          <button type="button" className={`${AUTH_SUBMIT} mt-[18px]`} onClick={() => navigate('/login')}>
            Back to login
          </button>
        </>
      )}

      {step !== 'done' && (
        <p className={AUTH_FOOTER}>
          Remembered your password? <Link to="/login" className={AUTH_FOOTER_LINK}>Login</Link>
        </p>
      )}
    </AuthLayout>
  )
}
