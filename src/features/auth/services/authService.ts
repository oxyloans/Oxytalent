import { mockDb } from './mockDatabase'
import {
  AuthError,
  type AuthSession,
  type EmailLoginPayload,
  type RegisterPayload,
  type RequestOtpPayload,
  type ResetPasswordPayload,
  type UserProfile,
  type VerifyOtpPayload,
} from '../types/auth.types'

const SESSION_KEY = 'oxytalent_session_v1'
const SIMULATED_LATENCY_MS = 500

function delay<T>(value: T, ms = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function issueSession(user: UserProfile): AuthSession {
  const session: AuthSession = {
    user,
    // A real backend issues a signed JWT here; this is a demo stand-in.
    token: `demo.${btoa(user.id)}.${Date.now()}`,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

/**
 * Public auth API. Every method returns a Promise and throws AuthError
 * on failure, matching how a real REST client (e.g. axios wrapper)
 * would behave — so this file is the only one that needs to change
 * when a real backend exists.
 */
export const authService = {
  /** Step 1 of registration: validate + reserve the account, then trigger an OTP to the mobile number. */
  async startRegistration(payload: RegisterPayload): Promise<void> {
    await delay(null)
    if (mockDb.findByEmail(payload.email)) {
      throw new AuthError('An account already exists with this email', 'email')
    }
    if (mockDb.findByMobile(payload.mobile)) {
      throw new AuthError('An account already exists with this mobile number', 'mobile')
    }
    mockDb.issueOtp(payload.mobile, 'register')
  },

  /** Step 2 of registration: verify the OTP, then actually create the account and sign the user in. */
  async completeRegistration(
    payload: RegisterPayload,
    otp: string
  ): Promise<AuthSession> {
    await delay(null)
    const result = mockDb.verifyOtp(payload.mobile, 'register', otp)
    if (!result.ok) throw new AuthError(result.reason, 'otp')

    const user = mockDb.createUser(payload)
    return issueSession(user)
  },

  async loginWithPassword(payload: EmailLoginPayload): Promise<AuthSession> {
    await delay(null)
    const user = mockDb.verifyPassword(payload.email, payload.password)
    if (!user) throw new AuthError('Incorrect email or password', 'form')
    return issueSession(user)
  },

  /** Step 1 of OTP login: send the code, but only if the mobile number is registered. */
  async requestLoginOtp(payload: RequestOtpPayload): Promise<void> {
    await delay(null)
    const user = mockDb.findByMobile(payload.mobile)
    if (!user) {
      throw new AuthError(
        'This mobile number is not registered. Please create an account first.',
        'mobile'
      )
    }
    mockDb.issueOtp(payload.mobile, payload.purpose)
  },

  /** Step 2 of OTP login: verify and sign in. */
  async verifyLoginOtp(payload: VerifyOtpPayload): Promise<AuthSession> {
    await delay(null)
    const result = mockDb.verifyOtp(payload.mobile, payload.purpose, payload.otp)
    if (!result.ok) throw new AuthError(result.reason, 'otp')
    const user = mockDb.findByMobile(payload.mobile)
    if (!user) throw new AuthError('Account not found', 'form')
    return issueSession(mockDb.toPublicProfile(user))
  },

  async requestPasswordReset(mobile: string, countryCode: string): Promise<void> {
    await delay(null)
    const user = mockDb.findByMobile(mobile)
    if (!user) throw new AuthError('This mobile number is not registered', 'mobile')
    mockDb.issueOtp(mobile, 'reset-password')
    void countryCode
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    await delay(null)
    const result = mockDb.verifyOtp(payload.mobile, 'reset-password', payload.otp)
    if (!result.ok) throw new AuthError(result.reason, 'otp')
    mockDb.updatePassword(payload.mobile, payload.newPassword)
  },

  async resendOtp(mobile: string, purpose: RequestOtpPayload['purpose']): Promise<void> {
    await delay(null, 300)
    mockDb.issueOtp(mobile, purpose)
  },

  logout(): void {
    localStorage.removeItem(SESSION_KEY)
  },

  getStoredSession(): AuthSession | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (!raw) return null
      const session = JSON.parse(raw) as AuthSession
      if (new Date(session.expiresAt).getTime() < Date.now()) {
        localStorage.removeItem(SESSION_KEY)
        return null
      }
      return session
    } catch {
      return null
    }
  },
}
