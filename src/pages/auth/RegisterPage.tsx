import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterAuthLayout } from '../../features/auth/components/RegisterAuthLayout'
import { RegisterDetailsForm } from '../../features/auth/components/RegisterDetailsForm'
import { OtpVerifyPanel } from '../../features/auth/components/OtpVerifyPanel'
import {
  AUTH_CARD_TITLE,
  AUTH_CARD_SUBTITLE,
  AUTH_BACK,
  AUTH_FOOTER,
  AUTH_FOOTER_LINK,
} from '../../features/auth/components/authClasses'
import { authService } from '../../features/auth/services/authService'
import { useAuth } from '../../features/auth/hooks/useAuth'
import type { RegisterPayload } from '../../features/auth/types/auth.types'

type Step = 'details' | 'verify'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { setSession } = useAuth()
  const [step, setStep] = useState<Step>('details')
  const [pendingPayload, setPendingPayload] = useState<RegisterPayload | null>(null)

  const handleDetailsSubmit = async (payload: RegisterPayload) => {
    await authService.startRegistration(payload)
    setPendingPayload(payload)
    setStep('verify')
  }

  const handleVerify = async (otp: string) => {
    if (!pendingPayload) return
    const session = await authService.completeRegistration(pendingPayload, otp)
    setSession(session)
    navigate('/jobs', { replace: true })
  }

  const handleResend = async () => {
    if (!pendingPayload) return
    await authService.resendOtp(pendingPayload.mobile, 'register')
  }

  return (
    <RegisterAuthLayout eyebrow="New here?">
      {step === 'details' ? (
        <>
          <h2 className={AUTH_CARD_TITLE}>Create your OxyTalent profile</h2>
          <p className={AUTH_CARD_SUBTITLE}>Search &amp; apply to jobs from India&apos;s No.1 job platform.</p>
          <RegisterDetailsForm onSubmit={handleDetailsSubmit} />
          <p className={AUTH_FOOTER}>
            Already have a profile? <Link to="/login" className={AUTH_FOOTER_LINK}>Login</Link>
          </p>
        </>
      ) : (
        <>
          <button type="button" className={AUTH_BACK} onClick={() => setStep('details')}>
            ← Back
          </button>
          <h2 className={AUTH_CARD_TITLE}>Verify your mobile number</h2>
          {pendingPayload && (
            <OtpVerifyPanel
              countryCode={pendingPayload.countryCode}
              mobile={pendingPayload.mobile}
              onVerify={handleVerify}
              onResend={handleResend}
              onEditNumber={() => setStep('details')}
              submitLabel="Create my profile"
            />
          )}
        </>
      )}
    </RegisterAuthLayout>
  )
}
