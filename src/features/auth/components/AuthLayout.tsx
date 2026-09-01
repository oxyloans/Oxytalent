import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  /** Small heading shown above the panel's title, e.g. "New here?" */
  eyebrow?: string
}

const STATS = [
  { value: '48K+', label: 'active job listings' },
  { value: '6.2K', label: 'hiring companies' },
  { value: '92%', label: 'profile response rate' },
]

export function AuthLayout({ children, eyebrow }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-paper nav:grid-cols-[minmax(340px,42%)_minmax(380px,1fr)]">
      <aside className="relative flex min-w-0 flex-col justify-between bg-ink px-5 py-7 text-paper nav:p-[clamp(28px,4vw,56px)] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_18%_12%,rgba(201,162,75,0.14),transparent_40%),radial-gradient(circle_at_85%_90%,rgba(95,168,160,0.12),transparent_45%)] after:content-['']">
        <Link to="/" className="z-[1] font-display text-2xl font-bold tracking-[-0.01em] text-paper no-underline">
          OxyTalent<span className="text-brass-bright">.</span>
        </Link>

        <div className="z-[1] my-6 nav:my-auto nav:py-12">
          {eyebrow && (
            <p className="mb-[18px] font-mono text-xs tracking-[0.04em] text-brass-bright">{eyebrow}</p>
          )}
          <h1 className="mb-[18px] max-w-[15ch] font-display text-[26px] font-bold leading-[1.14] nav:text-[clamp(30px,3.4vw,42px)]">
            Your next role is
            <br />
            closer than you think.
          </h1>
          <p className="mb-6 max-w-[38ch] text-base leading-[1.6] text-paper/[0.72] nav:mb-10">
            One profile. Every recruiter who's hiring for what you do best.
          </p>

          <dl className="flex flex-wrap gap-x-[clamp(16px,2vw,32px)] gap-y-[clamp(20px,3vw,44px)]">
            {STATS.map((stat) => (
              <div key={stat.label} className="min-w-[92px]">
                <dt className="font-display text-[26px] font-bold text-brass-bright">{stat.value}</dt>
                <dd className="mt-1 text-[13px] text-paper/[0.62]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="z-[1] text-[13px] text-paper/50">
          Trouble signing in?{' '}
          <a href="mailto:support@oxytalent.example" className="text-signal underline underline-offset-2">
            support@oxytalent.example
          </a>
        </p>
      </aside>

      <main className="flex min-w-0 items-center justify-center p-6 nav:p-[clamp(24px,5vw,56px)_clamp(20px,4vw,48px)]">
        <div className="w-full max-w-[440px]">{children}</div>
      </main>
    </div>
  )
}
