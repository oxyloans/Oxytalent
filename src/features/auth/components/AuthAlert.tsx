import type { ReactNode } from 'react'

interface AuthAlertProps {
  tone: 'error' | 'success' | 'info'
  children: ReactNode
}

const TONE_CLASSES: Record<AuthAlertProps['tone'], string> = {
  error: 'bg-rust/10 border-rust/30 text-[#8f4231]',
  success: 'bg-signal/[0.12] border-signal/[0.32] text-[#2f6b64]',
  info: 'bg-brass/[0.12] border-brass/[0.32] text-[#7a5f21]',
}

export function AuthAlert({ tone, children }: AuthAlertProps) {
  return (
    <div
      className={`rounded-[7px] border px-3.5 py-[11px] text-[13px] leading-[1.5] ${TONE_CLASSES[tone]}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      {children}
    </div>
  )
}
