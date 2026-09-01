/**
 * ---------------------------------------------------------------------
 *  MOCK DATABASE — DEV/DEMO ONLY, NOT A REAL BACKEND
 * ---------------------------------------------------------------------
 * This repo currently has no server. To make the auth flows usable and
 * demoable end-to-end, this module simulates a users table with
 * localStorage and simulates OTP delivery by printing it to the
 * console instead of sending a real SMS.
 *
 * Passwords are hashed with a trivial non-cryptographic digest purely
 * so a plain-text password never sits in localStorage. This is NOT a
 * security measure. Before going to production:
 *   - Move user storage to a real database behind an API.
 *   - Hash passwords server-side with bcrypt/argon2 + a per-user salt.
 *   - Send OTPs through a real SMS/WhatsApp gateway (e.g. MSG91, Twilio).
 *   - Never trust or validate OTPs on the client.
 *
 * Every other file in features/auth/ talks to `authService.ts`, not to
 * this file directly — so replacing this module with real `fetch`
 * calls is the only change needed to go live.
 * ---------------------------------------------------------------------
 */

import type { UserProfile, WorkStatus } from '../types/auth.types'

const USERS_KEY = 'oxytalent_mock_users_v1'
const OTP_KEY = 'oxytalent_mock_otps_v1'

interface StoredUser extends UserProfile {
  passwordHash: string
}

interface StoredOtp {
  code: string
  purpose: string
  expiresAt: number
  attemptsLeft: number
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as StoredUser[]) : []
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function readOtps(): Record<string, StoredOtp> {
  try {
    const raw = sessionStorage.getItem(OTP_KEY)
    return raw ? (JSON.parse(raw) as Record<string, StoredOtp>) : {}
  } catch {
    return {}
  }
}

function writeOtps(otps: Record<string, StoredOtp>): void {
  sessionStorage.setItem(OTP_KEY, JSON.stringify(otps))
}

/** Deterministic, non-cryptographic string digest. Demo only — see header. */
function weakHash(value: string): string {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return `h${hash}`
}

function otpKeyFor(mobile: string, purpose: string): string {
  return `${mobile}:${purpose}`
}

export const mockDb = {
  findByEmail(email: string): StoredUser | undefined {
    return readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())
  },

  findByMobile(mobile: string): StoredUser | undefined {
    return readUsers().find((u) => u.mobile === mobile)
  },

  createUser(input: {
    fullName: string
    email: string
    password: string
    mobile: string
    countryCode: string
    workStatus: WorkStatus
    resumeFileName?: string
  }): UserProfile {
    const users = readUsers()
    const user: StoredUser = {
      id: crypto.randomUUID(),
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      mobile: input.mobile,
      countryCode: input.countryCode,
      workStatus: input.workStatus,
      resumeFileName: input.resumeFileName,
      createdAt: new Date().toISOString(),
      passwordHash: weakHash(input.password),
    }
    users.push(user)
    writeUsers(users)
    const { passwordHash: _drop, ...publicProfile } = user
    return publicProfile
  },

  updatePassword(mobile: string, newPassword: string): void {
    const users = readUsers()
    const idx = users.findIndex((u) => u.mobile === mobile)
    if (idx === -1) return
    users[idx] = { ...users[idx], passwordHash: weakHash(newPassword) }
    writeUsers(users)
  },

  verifyPassword(email: string, password: string): UserProfile | null {
    const user = readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!user) return null
    if (user.passwordHash !== weakHash(password)) return null
    const { passwordHash: _drop, ...publicProfile } = user
    return publicProfile
  },

  toPublicProfile(user: StoredUser): UserProfile {
    const { passwordHash: _drop, ...publicProfile } = user
    return publicProfile
  },

  /** Generates and "sends" (console.logs) a 6-digit OTP. Returns nothing to the caller by design. */
  issueOtp(mobile: string, purpose: string): void {
    const code = String(Math.floor(100000 + Math.random() * 900000))
    const otps = readOtps()
    otps[otpKeyFor(mobile, purpose)] = {
      code,
      purpose,
      expiresAt: Date.now() + 5 * 60 * 1000,
      attemptsLeft: 5,
    }
    writeOtps(otps)
    // eslint-disable-next-line no-console
    console.info(
      `%c[Mock SMS] OTP for +${mobile} (${purpose}): ${code} (valid 5 min)`,
      'color:#5fa8a0;font-weight:bold;'
    )
  },

  verifyOtp(mobile: string, purpose: string, code: string): { ok: true } | { ok: false; reason: string } {
    const otps = readOtps()
    const key = otpKeyFor(mobile, purpose)
    const entry = otps[key]
    if (!entry) return { ok: false, reason: 'Request a new OTP first' }
    if (Date.now() > entry.expiresAt) {
      delete otps[key]
      writeOtps(otps)
      return { ok: false, reason: 'OTP expired, request a new one' }
    }
    if (entry.attemptsLeft <= 0) {
      delete otps[key]
      writeOtps(otps)
      return { ok: false, reason: 'Too many attempts, request a new OTP' }
    }
    if (entry.code !== code) {
      entry.attemptsLeft -= 1
      otps[key] = entry
      writeOtps(otps)
      return { ok: false, reason: `Incorrect OTP, ${entry.attemptsLeft} attempt(s) left` }
    }
    delete otps[key]
    writeOtps(otps)
    return { ok: true }
  },
}
