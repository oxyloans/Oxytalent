const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MOBILE_RE = /^[6-9]\d{9}$/ // Indian mobile numbers: 10 digits, starts 6-9

export function validateFullName(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Full name is required'
  if (trimmed.length < 2) return 'Enter your full name'
  if (!/^[a-zA-Z][a-zA-Z .'-]*$/.test(trimmed)) return 'Name can only contain letters'
  return null
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'Email ID is required'
  if (!EMAIL_RE.test(trimmed)) return 'Enter a valid email address'
  return null
}

export function validatePassword(value: string): string | null {
  if (!value) return 'Password is required'
  if (value.length < 6) return 'Minimum 6 characters'
  if (value.length > 64) return 'Password is too long'
  return null
}

export function validateMobile(value: string): string | null {
  const digitsOnly = value.replace(/\D/g, '')
  if (!digitsOnly) return 'Mobile number is required'
  if (!MOBILE_RE.test(digitsOnly)) return 'Enter a valid 10 digit mobile number'
  return null
}

export function validateOtp(value: string): string | null {
  if (!value) return 'Enter the OTP'
  if (!/^\d{6}$/.test(value)) return 'OTP must be 6 digits'
  return null
}

export function sanitizeMobileInput(value: string): string {
  return value.replace(/\D/g, '').slice(0, 10)
}

export function sanitizeOtpInput(value: string): string {
  return value.replace(/\D/g, '').slice(0, 6)
}
