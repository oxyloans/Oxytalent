import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FormField } from './FormField'
import { PasswordField } from './PasswordField'
import { AuthAlert } from './AuthAlert'
import { AUTH_FORM, AUTH_SUBMIT, AUTH_LINK_BTN_CENTER } from './authClasses'
import { validateEmail } from '../utils/validators'
import type { EmailLoginPayload } from '../types/auth.types'

interface EmailPasswordLoginFormProps {
  onSubmit: (payload: EmailLoginPayload) => Promise<void>
  onSwitchToOtp: () => void
}

export function EmailPasswordLoginForm({ onSubmit, onSwitchToOtp }: EmailPasswordLoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const emailErr = validateEmail(email)
    const passwordErr = password ? null : 'Password is required'
    setEmailError(emailErr)
    setPasswordError(passwordErr)
    if (emailErr || passwordErr) return

    setFormError(null)
    setIsSubmitting(true)
    try {
      await onSubmit({ email, password })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={AUTH_FORM} onSubmit={handleSubmit} noValidate>
      {formError && <AuthAlert tone="error">{formError}</AuthAlert>}

      <FormField
        label="Email ID / Username"
        required
        type="email"
        placeholder="Enter Email ID / Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        autoComplete="email"
      />

      <div>
        <PasswordField
          label="Password"
          required
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          autoComplete="current-password"
        />
        <Link to="/forgot-password" className="mt-1.5 block text-right text-[12.5px] text-signal no-underline hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button type="submit" className={AUTH_SUBMIT} disabled={isSubmitting}>
        {isSubmitting ? 'Logging in…' : 'Login'}
      </button>

      <button type="button" className={AUTH_LINK_BTN_CENTER} onClick={onSwitchToOtp}>
        Use OTP to Login
      </button>
    </form>
  )
}
