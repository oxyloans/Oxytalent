import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

interface LandingPageProps {
  onNavigateJobs: () => void
}

const COMPANIES = [
  'Northgate Analytics',
  'Lumen Studio',
  'Aether Labs',
  'Forge Collective',
  'Horizon Systems',
  'Parcel & Co',
]

const FEATURES = [
  {
    title: 'Discover Better Opportunities',
    text: 'Find jobs aligned with your skills and career goals through a curated, searchable board.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: 'Connect With Great Companies',
    text: 'Discover employers looking for talented people like you — from startups to established teams.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Simple Job Search',
    text: 'Search and explore opportunities through an easy-to-use platform built for clarity and speed.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 4v16" />
      </svg>
    ),
  },
  {
    title: 'Grow Your Career',
    text: 'Take the next step toward meaningful career opportunities with roles that match your trajectory.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Search',
    text: 'Explore jobs based on your skills, interests, and location.',
  },
  {
    num: '02',
    title: 'Apply',
    text: 'Review opportunities and apply to the jobs that match your goals.',
  },
  {
    num: '03',
    title: 'Get Hired',
    text: 'Connect with employers and move forward in your career.',
  },
]

// Shared button classes — kept as constants so every lp-btn variant/size
// combination below stays visually consistent without repeating the string.
const BTN_BASE =
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-transparent px-[18px] py-2.5 font-display text-sm font-semibold tracking-[0.01em] no-underline transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
const BTN_PRIMARY = 'border-brass bg-brass text-ink hover:border-brass-bright hover:bg-brass-bright'
const BTN_OUTLINE = 'border-paper/[0.28] bg-transparent text-paper hover:border-brass-bright hover:text-brass-bright'
const BTN_GHOST = 'bg-transparent px-3 text-muted hover:text-paper'
const BTN_LG = 'rounded-xl px-[26px] py-3.5 text-[15px]'
const BTN_SEARCH = 'self-stretch px-6 py-3.5'
const btn = (...parts: string[]) => [BTN_BASE, ...parts].join(' ')

const NAV_LINK =
  'cursor-pointer rounded-lg border-none bg-none px-3 py-2 font-body text-sm font-medium text-muted no-underline transition-colors duration-150 hover:bg-paper/[0.06] hover:text-paper'
const NAV_LINK_ACTIVE = 'text-paper'

export default function LandingPage({ onNavigateJobs }: LandingPageProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    onNavigateJobs()
  }

  const closeMenu = () => setMenuOpen(false)

  const goJobs = () => {
    closeMenu()
    onNavigateJobs()
  }

  return (
    <div className="min-h-screen bg-ink font-body text-paper">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-50 border-b border-line bg-ink/[0.92] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-7 px-5 py-4 sm:px-[clamp(20px,4vw,40px)]">
          <a
            href="/"
            className="flex-shrink-0 font-display text-[22px] font-bold tracking-[-0.02em] text-paper no-underline"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            OxyTalent<span className="text-brass-bright">.</span>
          </a>

          <nav className="ml-2 hidden flex-1 items-center gap-1 nav:flex" aria-label="Primary">
            <a href="/" className={`${NAV_LINK} ${NAV_LINK_ACTIVE}`}>Home</a>
            <button type="button" className={NAV_LINK} onClick={goJobs}>Jobs</button>
            <a href="#companies" className={NAV_LINK}>Companies</a>
            <a href="#about" className={NAV_LINK}>About</a>
            <a href="#contact" className={NAV_LINK}>Contact</a>
          </nav>

          <div className="ml-auto hidden items-center gap-2 nav:flex">
            {isAuthenticated ? (
              <>
                <span className={btn(BTN_GHOST, 'cursor-default')} aria-hidden="true">
                  Hi, {user?.fullName.split(' ')[0]}
                </span>
                <button type="button" className={btn(BTN_OUTLINE)} onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={btn(BTN_GHOST)}>Login</Link>
                <Link to="/register" className={btn(BTN_OUTLINE)}>Sign Up</Link>
              </>
            )}
            <button type="button" className={btn(BTN_PRIMARY)} onClick={goJobs}>
              Find Jobs
            </button>
          </div>

          <button
            type="button"
            className="ml-auto flex h-10 w-10 flex-col justify-center gap-[5px] border-none bg-none p-2 nav:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-full rounded-sm bg-paper transition-transform duration-200 ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span className={`block h-0.5 w-full rounded-sm bg-paper transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span
              className={`block h-0.5 w-full rounded-sm bg-paper transition-transform duration-200 ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="flex flex-col border-t border-line bg-ink-soft px-5 pb-6 pt-2">
            <a href="/" className="border-b border-line px-1 py-3.5 text-base font-medium text-paper no-underline" onClick={closeMenu}>
              Home
            </a>
            <button
              type="button"
              className="border-b border-line bg-none px-1 py-3.5 text-left text-base font-medium text-paper"
              onClick={goJobs}
            >
              Jobs
            </button>
            <a href="#companies" className="border-b border-line px-1 py-3.5 text-base font-medium text-paper no-underline" onClick={closeMenu}>
              Companies
            </a>
            <a href="#about" className="border-b border-line px-1 py-3.5 text-base font-medium text-paper no-underline" onClick={closeMenu}>
              About
            </a>
            <a href="#contact" className="border-b border-line px-1 py-3.5 text-base font-medium text-paper no-underline" onClick={closeMenu}>
              Contact
            </a>
            <div className="mt-5 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <button
                  type="button"
                  className={btn(BTN_OUTLINE, 'w-full')}
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className={btn(BTN_GHOST, 'w-full')} onClick={closeMenu}>Login</Link>
                  <Link to="/register" className={btn(BTN_OUTLINE, 'w-full')} onClick={closeMenu}>Sign Up</Link>
                </>
              )}
              <button type="button" className={btn(BTN_PRIMARY, 'w-full')} onClick={goJobs}>
                Find Jobs
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-8 px-5 pb-10 pt-10 sm:px-[clamp(20px,4vw,40px)] nav:grid-cols-2 nav:gap-[clamp(32px,5vw,64px)] nav:pb-[clamp(40px,6vw,64px)] nav:pt-[clamp(48px,8vw,88px)]">
          <div className="order-2 nav:order-1">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-brass-bright">Modern talent platform</p>
            <h1 className="mb-5 font-display text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.15] tracking-[-0.02em] text-paper">
              Find the Right Opportunity.<br />
              <span className="text-brass-bright">Build Your Future.</span>
            </h1>
            <p className="mb-8 max-w-[440px] text-[17px] leading-[1.6] text-muted">
              Discover meaningful jobs, connect with great companies, and take the next step in your career with OxyTalent.
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className={btn(BTN_PRIMARY, BTN_LG)} onClick={goJobs}>
                Explore Jobs
              </button>
              <a href="#employers" className={btn(BTN_OUTLINE, BTN_LG)}>
                I&apos;m Hiring
              </a>
            </div>
          </div>

          <div className="relative order-1 flex min-h-[280px] items-center justify-center nav:order-2 nav:min-h-[320px]" aria-hidden="true">
            <div className="relative z-[2] w-[min(100%,300px)] rounded-2xl border border-line bg-ink-soft p-[22px_24px] shadow-hero-card">
              <div className="mb-3.5 flex items-center justify-between">
                <span className="rounded bg-brass px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.06em] text-ink">Open role</span>
                <span className="font-mono text-xs text-muted">#REF-014</span>
              </div>
              <h3 className="mb-1.5 font-display text-lg font-semibold text-paper">Senior Frontend Engineer</h3>
              <p className="mb-3.5 text-[13px] text-muted">Northgate Analytics · Remote</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded border border-line px-2 py-[3px] font-mono text-[11px] text-muted">Engineering</span>
                <span className="rounded border border-line px-2 py-[3px] font-mono text-[11px] text-muted">Full-time</span>
                <span className="rounded border border-line px-2 py-[3px] font-mono text-[11px] text-muted">$140k – $175k</span>
              </div>
              <div className="mt-[18px] flex items-center gap-1.5 border-t border-line pt-3.5">
                <span className="h-2 w-2 rounded-full bg-signal opacity-70" />
                <span className="h-2 w-2 rounded-full bg-signal opacity-70" />
                <span className="h-[3px] flex-1 rounded-sm bg-gradient-to-r from-brass from-40% to-transparent opacity-50" />
              </div>
            </div>
            <div className="absolute bottom-3 right-0 z-[1] hidden w-[min(100%,260px)] translate-x-[8%] translate-y-[8%] scale-[0.94] rounded-2xl border border-line bg-ink-soft p-[22px_24px] opacity-90 shadow-hero-card-offset nav:block">
              <div className="mb-3.5 flex items-center justify-between">
                <span className="rounded bg-signal px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.06em] text-ink">Pinned</span>
                <span className="font-mono text-xs text-muted">#REF-021</span>
              </div>
              <h3 className="mb-1.5 font-display text-lg font-semibold text-paper">Product Designer</h3>
              <p className="mb-3.5 text-[13px] text-muted">Lumen Studio · Austin, TX</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded border border-line px-2 py-[3px] font-mono text-[11px] text-muted">Design</span>
                <span className="rounded border border-line px-2 py-[3px] font-mono text-[11px] text-muted">Full-time</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Search ---------- */}
        <section className="px-5 pb-[clamp(48px,7vw,80px)] sm:px-[clamp(20px,4vw,40px)]" aria-labelledby="search-heading">
          <div className="mx-auto max-w-[1120px] rounded-[20px] border border-line bg-ink-soft p-[clamp(24px,4vw,36px)] shadow-search">
            <h2 id="search-heading" className="mb-5 font-display text-xl font-semibold text-paper">
              Search your next opportunity
            </h2>
            <form className="grid grid-cols-1 items-end gap-4 nav:grid-cols-[1fr_1fr_auto]" onSubmit={handleSearch}>
              <div className="flex flex-col gap-2">
                <label htmlFor="lp-keyword" className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Job title / keyword
                </label>
                <input
                  id="lp-keyword"
                  type="text"
                  placeholder="Job title, skills or keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full rounded-[10px] border border-line bg-ink px-4 py-[13px] font-body text-[15px] text-paper transition-colors duration-200 placeholder:text-muted focus:border-brass-bright focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lp-location" className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Location
                </label>
                <input
                  id="lp-location"
                  type="text"
                  placeholder="City, remote, or region"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-[10px] border border-line bg-ink px-4 py-[13px] font-body text-[15px] text-paper transition-colors duration-200 placeholder:text-muted focus:border-brass-bright focus:outline-none"
                />
              </div>
              <button type="submit" className={btn(BTN_PRIMARY, BTN_SEARCH, 'w-full nav:w-auto')}>
                Search Jobs
              </button>
            </form>
          </div>
        </section>

        {/* ---------- Trusted companies ---------- */}
        <section
          className="mx-auto max-w-[1120px] px-5 pb-[clamp(56px,8vw,96px)] text-center sm:px-[clamp(20px,4vw,40px)]"
          id="companies"
          aria-labelledby="companies-heading"
        >
          <h2 id="companies-heading" className="mb-9 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-paper">
            Trusted by growing companies
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 nav:grid-cols-3">
            {COMPANIES.map((name) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-xl border border-line bg-ink-soft px-[18px] py-4 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brass/35 motion-reduce:hover:translate-y-0"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brass/[0.15] font-display text-[15px] font-bold text-brass-bright"
                >
                  {name.charAt(0)}
                </span>
                <span className="text-left text-sm font-medium text-paper">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Why OxyTalent ---------- */}
        <section className="mx-auto max-w-[1120px] px-5 pb-[clamp(56px,8vw,96px)] sm:px-[clamp(20px,4vw,40px)]" id="about" aria-labelledby="why-heading">
          <div className="mb-[clamp(32px,5vw,48px)] text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-brass-bright">Why OxyTalent</p>
            <h2 id="why-heading" className="font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-paper">
              Built for candidates and hiring teams
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 nav:grid-cols-2">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl border border-line bg-ink-soft p-[28px_26px] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-brass/30 hover:shadow-feature motion-reduce:hover:translate-y-0"
              >
                <div className="mb-[18px] flex h-12 w-12 items-center justify-center rounded-xl bg-brass/[0.12] text-brass-bright">
                  {f.icon}
                </div>
                <h3 className="mb-2.5 font-display text-lg font-semibold text-paper">{f.title}</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-muted">{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <section className="mx-auto max-w-[1120px] px-5 pb-[clamp(56px,8vw,96px)] sm:px-[clamp(20px,4vw,40px)]" aria-labelledby="how-heading">
          <div className="mb-[clamp(32px,5vw,48px)] text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-brass-bright">How it works</p>
            <h2 id="how-heading" className="font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] text-paper">
              Three steps to your next role
            </h2>
          </div>
          <ol className="grid list-none grid-cols-1 gap-6 nav:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.num} className="rounded-2xl border border-line bg-ink-soft p-[28px_24px] text-left">
                <span className="mb-3.5 block font-mono text-[13px] tracking-[0.08em] text-brass-bright">{s.num}</span>
                <h3 className="mb-2.5 font-display text-xl font-semibold text-paper">{s.title}</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Employer CTA ---------- */}
        <section className="px-5 pb-[clamp(40px,6vw,64px)] sm:px-[clamp(20px,4vw,40px)]" id="employers" aria-labelledby="employer-heading">
          <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-8 rounded-[20px] border border-line bg-gradient-to-br from-ink-soft to-[rgba(35,47,61,0.95)] p-[clamp(32px,5vw,48px)]">
            <div>
              <h2 id="employer-heading" className="mb-2.5 font-display text-[clamp(22px,3vw,28px)] font-bold text-paper">
                Looking for great talent?
              </h2>
              <p className="m-0 max-w-[480px] text-base leading-[1.55] text-muted">
                Connect with skilled candidates and find the people who can help your business grow.
              </p>
            </div>
            <a href="#post-job" className={btn(BTN_PRIMARY, BTN_LG, 'w-full sm:w-auto')}>
              Post a Job
            </a>
          </div>
        </section>

        {/* ---------- Job seeker CTA ---------- */}
        <section className="mx-auto max-w-[720px] px-5 pb-[clamp(64px,9vw,112px)] text-center sm:px-[clamp(20px,4vw,40px)]" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="mb-7 font-display text-[clamp(24px,3.5vw,34px)] font-bold leading-[1.25] tracking-[-0.02em] text-paper">
            Your next opportunity could be closer than you think.
          </h2>
          <button type="button" className={btn(BTN_PRIMARY, BTN_LG, 'w-full sm:w-auto')} onClick={goJobs}>
            Explore Jobs
          </button>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-line bg-ink-soft px-5 pb-6 pt-[clamp(40px,6vw,56px)] sm:px-[clamp(20px,4vw,40px)]" id="contact">
        <div className="mx-auto mb-10 grid max-w-[1120px] grid-cols-1 gap-8 nav:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="font-display text-[22px] font-bold tracking-[-0.02em] text-paper">
              OxyTalent<span className="text-brass-bright">.</span>
            </div>
            <p className="mt-3 max-w-[220px] text-sm text-muted">Connecting talent with opportunity.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <h4 className="mb-4 font-display text-[13px] font-semibold uppercase tracking-[0.06em] text-paper">For Job Seekers</h4>
              <button type="button" className="mb-2.5 block bg-none p-0 text-left font-body text-sm text-muted transition-colors duration-150 hover:text-brass-bright" onClick={goJobs}>
                Find Jobs
              </button>
              <a href="#about" className="mb-2.5 block text-sm text-muted no-underline transition-colors duration-150 hover:text-brass-bright">Career Opportunities</a>
              <a href="#signup" className="mb-2.5 block text-sm text-muted no-underline transition-colors duration-150 hover:text-brass-bright">Sign Up</a>
            </div>
            <div>
              <h4 className="mb-4 font-display text-[13px] font-semibold uppercase tracking-[0.06em] text-paper">For Employers</h4>
              <a href="#post-job" className="mb-2.5 block text-sm text-muted no-underline transition-colors duration-150 hover:text-brass-bright">Post a Job</a>
              <a href="#employers" className="mb-2.5 block text-sm text-muted no-underline transition-colors duration-150 hover:text-brass-bright">Find Talent</a>
              <a href="#login" className="mb-2.5 block text-sm text-muted no-underline transition-colors duration-150 hover:text-brass-bright">Employer Login</a>
            </div>
            <div>
              <h4 className="mb-4 font-display text-[13px] font-semibold uppercase tracking-[0.06em] text-paper">Company</h4>
              <a href="#about" className="mb-2.5 block text-sm text-muted no-underline transition-colors duration-150 hover:text-brass-bright">About</a>
              <a href="#contact" className="mb-2.5 block text-sm text-muted no-underline transition-colors duration-150 hover:text-brass-bright">Contact</a>
              <a href="#privacy" className="mb-2.5 block text-sm text-muted no-underline transition-colors duration-150 hover:text-brass-bright">Privacy Policy</a>
              <a href="#terms" className="mb-2.5 block text-sm text-muted no-underline transition-colors duration-150 hover:text-brass-bright">Terms</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1120px] border-t border-line pt-5">
          <p className="m-0 text-[13px] text-muted">© {new Date().getFullYear()} OxyTalent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
