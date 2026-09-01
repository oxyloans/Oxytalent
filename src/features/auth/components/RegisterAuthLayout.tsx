import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface RegisterAuthLayoutProps {
  children: ReactNode
  /** Small heading shown above the panel's title, e.g. "New here?" */
  eyebrow?: string
}

const STEPS = [
  {
    number: '01',
    title: 'Create your profile',
    text: 'Add your basic details and a resume so recruiters can find you.',
  },
  {
    number: '02',
    title: 'Get matched',
    text: 'We surface roles that fit your skills, location and experience.',
  },
  {
    number: '03',
    title: 'Apply in one click',
    text: 'No repeat forms — your profile applies for you, every time.',
  },
]

export function RegisterAuthLayout({ children, eyebrow }: RegisterAuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-paper nav:grid-cols-[minmax(340px,42%)_minmax(380px,1fr)]">
      <aside className="relative flex min-w-0 flex-col justify-start gap-6 bg-ink px-5 py-7 text-paper nav:gap-[clamp(32px,6vh,64px)] nav:p-[clamp(28px,4vw,56px)] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_18%_12%,rgba(201,162,75,0.14),transparent_40%),radial-gradient(circle_at_85%_90%,rgba(95,168,160,0.12),transparent_45%)] after:content-['']">
        <Link to="/" className="z-[1] font-display text-2xl font-bold tracking-[-0.01em] text-paper no-underline">
          OxyTalent<span className="text-brass-bright">.</span>
        </Link>

        <div className="z-[1]">
          {eyebrow && (
            <p className="mb-[18px] font-mono text-xs tracking-[0.04em] text-brass-bright">{eyebrow}</p>
          )}
          <h1 className="mb-[18px] max-w-[15ch] font-display text-[26px] font-bold leading-[1.14] nav:text-[clamp(30px,3.4vw,42px)]">
            Get hired faster
            <br />
            with one good profile.
          </h1>
          <p className="mb-6 max-w-[38ch] text-base leading-[1.6] text-paper/[0.72] nav:mb-10">
            Tell us a bit about yourself once — we'll do the matching every time after.
          </p>

          <ol className="flex list-none flex-col gap-[22px] p-0">
            {STEPS.map((step) => (
              <li key={step.number} className="flex items-start gap-4">
                <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full border border-line font-mono text-[13px] text-brass-bright">
                  {step.number}
                </span>
                <div>
                  <p className="mb-1 font-display text-[15px] font-bold text-paper">{step.title}</p>
                  <p className="max-w-[34ch] text-[13px] leading-[1.55] text-paper/[0.62]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="z-[1] mt-auto pt-0 text-[13px] text-paper/50 nav:pt-6">
          Trouble signing up?{' '}
          <a href="mailto:support@oxytalent.example" className="text-signal underline underline-offset-2">
            support@oxytalent.example
          </a>
        </p>
      </aside>

      <main className="flex min-w-0 items-start justify-center p-6 pt-6 nav:p-[clamp(24px,5vw,56px)_clamp(20px,4vw,48px)] nav:pt-[clamp(40px,6vw,72px)] nav:pb-[clamp(40px,6vw,72px)]">
        <div className="w-full max-w-[440px]">{children}</div>
      </main>
    </div>
  )
}
