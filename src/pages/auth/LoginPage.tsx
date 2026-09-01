import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../features/auth/components/AuthLayout'
import { EmailPasswordLoginForm } from '../../features/auth/components/EmailPasswordLoginForm'
import { MobileOtpRequestForm } from '../../features/auth/components/MobileOtpRequestForm'
import { OtpVerifyPanel } from '../../features/auth/components/OtpVerifyPanel'
import {
  AUTH_CARD_TITLE,
  AUTH_BACK,
  AUTH_FOOTER,
  AUTH_FOOTER_LINK,
} from '../../features/auth/components/authClasses'
import { authService } from '../../features/auth/services/authService'
import { useAuth } from '../../features/auth/hooks/useAuth'
import type { EmailLoginPayload } from '../../features/auth/types/auth.types'

type Mode = 'password' | 'otp-request' | 'otp-verify'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setSession } = useAuth()
  const [mode, setMode] = useState<Mode>('password')
  const [pendingMobile, setPendingMobile] = useState('')
  const [pendingCountryCode, setPendingCountryCode] = useState('+91')

  const goToJobs = () => navigate('/jobs', { replace: true })

  const handlePasswordLogin = async (payload: EmailLoginPayload) => {
    const session = await authService.loginWithPassword(payload)
    setSession(session)
    goToJobs()
  }

  const handleRequestOtp = async ({ mobile, countryCode }: { mobile: string; countryCode: string }) => {
    await authService.requestLoginOtp({ mobile, countryCode, purpose: 'login' })
    setPendingMobile(mobile)
    setPendingCountryCode(countryCode)
    setMode('otp-verify')
  }

  const handleVerifyOtp = async (otp: string) => {
    const session = await authService.verifyLoginOtp({
      mobile: pendingMobile,
      countryCode: pendingCountryCode,
      otp,
      purpose: 'login',
    })
    setSession(session)
    goToJobs()
  }

  const handleResendOtp = async () => {
    await authService.resendOtp(pendingMobile, 'login')
  }

  return (
    <AuthLayout eyebrow="Welcome back">
      <h2 className={AUTH_CARD_TITLE}>Login</h2>

      {mode !== 'otp-verify' && (
        <div className="mb-6 flex gap-2 rounded-lg bg-paper-dim p-1" role="tablist" aria-label="Login method">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'password'}
            className={`flex-1 rounded-md border-none px-3 py-[9px] text-[13.5px] font-semibold transition-colors duration-150 ${
              mode === 'password' ? 'bg-ink text-paper' : 'bg-transparent text-muted-on-paper'
            }`}
            onClick={() => setMode('password')}
          >
            Email &amp; Password
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'otp-request'}
            className={`flex-1 rounded-md border-none px-3 py-[9px] text-[13.5px] font-semibold transition-colors duration-150 ${
              mode === 'otp-request' ? 'bg-ink text-paper' : 'bg-transparent text-muted-on-paper'
            }`}
            onClick={() => setMode('otp-request')}
          >
            Mobile OTP
          </button>
        </div>
      )}

      {mode === 'password' && (
        <EmailPasswordLoginForm onSubmit={handlePasswordLogin} onSwitchToOtp={() => setMode('otp-request')} />
      )}

      {mode === 'otp-request' && (
        <MobileOtpRequestForm onSubmit={handleRequestOtp} onSwitchToEmail={() => setMode('password')} />
      )}

      {mode === 'otp-verify' && (
        <>
          <button type="button" className={AUTH_BACK} onClick={() => setMode('otp-request')}>
            ← Back
          </button>
          <OtpVerifyPanel
            countryCode={pendingCountryCode}
            mobile={pendingMobile}
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            onEditNumber={() => setMode('otp-request')}
            submitLabel="Login"
          />
        </>
      )}

      <p className={AUTH_FOOTER}>
        New to OxyTalent? <Link to="/register" className={AUTH_FOOTER_LINK}>Register</Link>
      </p>
    </AuthLayout>
  )
}
