/**
 * Domain types for the auth feature.
 *
 * These types describe the CONTRACT between the frontend and whatever
 * backend eventually serves it. Keeping them isolated here means the
 * mock service (services/authService.ts) and a future real API client
 * can both implement the same shapes without touching UI code.
 */

export type WorkStatus = 'experienced' | 'fresher'

export interface UserProfile {
  id: string
  fullName: string
  email: string
  mobile: string // stored without the country code, e.g. "9876543210"
  countryCode: string // e.g. "+91"
  workStatus: WorkStatus
  resumeFileName?: string
  createdAt: string
}

/** What the client holds after a successful login/registration. */
export interface AuthSession {
  user: UserProfile
  token: string
  expiresAt: string
}

export interface RegisterPayload {
  fullName: string
  email: string
  password: string
  mobile: string
  countryCode: string
  workStatus: WorkStatus
  resumeFileName?: string
}

export interface EmailLoginPayload {
  email: string
  password: string
}

export interface RequestOtpPayload {
  mobile: string
  countryCode: string
  /** Distinguishes "verify a new signup" from "log an existing user in". */
  purpose: 'register' | 'login' | 'reset-password'
}

export interface VerifyOtpPayload {
  mobile: string
  countryCode: string
  otp: string
  purpose: 'register' | 'login' | 'reset-password'
}

export interface ResetPasswordPayload {
  mobile: string
  countryCode: string
  otp: string
  newPassword: string
}

/**
 * A uniform error shape so forms can key on `field` to highlight the
 * right input, the same way a real API's 422 response would.
 */
export class AuthError extends Error {
  field?: keyof RegisterPayload | keyof EmailLoginPayload | 'otp' | 'form'

  constructor(message: string, field?: AuthError['field']) {
    super(message)
    this.name = 'AuthError'
    this.field = field
  }
}
