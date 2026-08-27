import { useState, FormEvent } from 'react'
import './LandingPage.css'

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

export default function LandingPage({ onNavigateJobs }: LandingPageProps) {
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
    <div className="lp">
      {/* ---------- Header ---------- */}
      <header className="lp-header">
        <div className="lp-header__inner">
          <a href="/" className="lp-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            OxyTalent<span className="lp-logo__dot">.</span>
          </a>

          <nav className="lp-nav" aria-label="Primary">
            <a href="/" className="lp-nav__link lp-nav__link--active">Home</a>
            <button type="button" className="lp-nav__link" onClick={goJobs}>Jobs</button>
            <a href="#companies" className="lp-nav__link">Companies</a>
            <a href="#about" className="lp-nav__link">About</a>
            <a href="#contact" className="lp-nav__link">Contact</a>
          </nav>

          <div className="lp-header__actions">
            <a href="#login" className="lp-btn lp-btn--ghost">Login</a>
            <a href="#signup" className="lp-btn lp-btn--outline">Sign Up</a>
            <button type="button" className="lp-btn lp-btn--primary" onClick={goJobs}>
              Find Jobs
            </button>
          </div>

          <button
            type="button"
            className={`lp-burger${menuOpen ? ' lp-burger--open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`lp-mobile-menu${menuOpen ? ' lp-mobile-menu--open' : ''}`}>
          <a href="/" className="lp-mobile-menu__link" onClick={closeMenu}>Home</a>
          <button type="button" className="lp-mobile-menu__link" onClick={goJobs}>Jobs</button>
          <a href="#companies" className="lp-mobile-menu__link" onClick={closeMenu}>Companies</a>
          <a href="#about" className="lp-mobile-menu__link" onClick={closeMenu}>About</a>
          <a href="#contact" className="lp-mobile-menu__link" onClick={closeMenu}>Contact</a>
          <div className="lp-mobile-menu__actions">
            <a href="#login" className="lp-btn lp-btn--ghost" onClick={closeMenu}>Login</a>
            <a href="#signup" className="lp-btn lp-btn--outline" onClick={closeMenu}>Sign Up</a>
            <button type="button" className="lp-btn lp-btn--primary" onClick={goJobs}>
              Find Jobs
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className="lp-hero">
          <div className="lp-hero__content">
            <p className="lp-eyebrow">Modern talent platform</p>
            <h1 className="lp-hero__title">
              Find the Right Opportunity.<br />
              <span className="lp-hero__accent">Build Your Future.</span>
            </h1>
            <p className="lp-hero__sub">
              Discover meaningful jobs, connect with great companies, and take the next step in your career with OxyTalent.
            </p>
            <div className="lp-hero__ctas">
              <button type="button" className="lp-btn lp-btn--primary lp-btn--lg" onClick={goJobs}>
                Explore Jobs
              </button>
              <a href="#employers" className="lp-btn lp-btn--outline lp-btn--lg">
                I&apos;m Hiring
              </a>
            </div>
          </div>

          <div className="lp-hero__visual" aria-hidden="true">
            <div className="lp-hero-card">
              <div className="lp-hero-card__top">
                <span className="lp-hero-card__badge">Open role</span>
                <span className="lp-hero-card__ref">#REF-014</span>
              </div>
              <h3 className="lp-hero-card__title">Senior Frontend Engineer</h3>
              <p className="lp-hero-card__company">Northgate Analytics · Remote</p>
              <div className="lp-hero-card__tags">
                <span>Engineering</span>
                <span>Full-time</span>
                <span>$140k – $175k</span>
              </div>
              <div className="lp-hero-card__bar">
                <span className="lp-hero-card__dot" />
                <span className="lp-hero-card__dot" />
                <span className="lp-hero-card__line" />
              </div>
            </div>
            <div className="lp-hero-card lp-hero-card--offset">
              <div className="lp-hero-card__top">
                <span className="lp-hero-card__badge lp-hero-card__badge--signal">Pinned</span>
                <span className="lp-hero-card__ref">#REF-021</span>
              </div>
              <h3 className="lp-hero-card__title">Product Designer</h3>
              <p className="lp-hero-card__company">Lumen Studio · Austin, TX</p>
              <div className="lp-hero-card__tags">
                <span>Design</span>
                <span>Full-time</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Search ---------- */}
        <section className="lp-search" aria-labelledby="search-heading">
          <div className="lp-search__inner">
            <h2 id="search-heading" className="lp-search__title">Search your next opportunity</h2>
            <form className="lp-search__form" onSubmit={handleSearch}>
              <div className="lp-search__field">
                <label htmlFor="lp-keyword">Job title / keyword</label>
                <input
                  id="lp-keyword"
                  type="text"
                  placeholder="Job title, skills or keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="lp-search__field">
                <label htmlFor="lp-location">Location</label>
                <input
                  id="lp-location"
                  type="text"
                  placeholder="City, remote, or region"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button type="submit" className="lp-btn lp-btn--primary lp-btn--search">
                Search Jobs
              </button>
            </form>
          </div>
        </section>

        {/* ---------- Trusted companies ---------- */}
        <section className="lp-companies" id="companies" aria-labelledby="companies-heading">
          <h2 id="companies-heading" className="lp-section-title">Trusted by growing companies</h2>
          <div className="lp-companies__grid">
            {COMPANIES.map((name) => (
              <div key={name} className="lp-company">
                <span className="lp-company__mark" aria-hidden="true">
                  {name.charAt(0)}
                </span>
                <span className="lp-company__name">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Why OxyTalent ---------- */}
        <section className="lp-why" id="about" aria-labelledby="why-heading">
          <div className="lp-section-head">
            <p className="lp-eyebrow">Why OxyTalent</p>
            <h2 id="why-heading" className="lp-section-title">Built for candidates and hiring teams</h2>
          </div>
          <div className="lp-features">
            {FEATURES.map((f) => (
              <article key={f.title} className="lp-feature">
                <div className="lp-feature__icon">{f.icon}</div>
                <h3 className="lp-feature__title">{f.title}</h3>
                <p className="lp-feature__text">{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <section className="lp-how" aria-labelledby="how-heading">
          <div className="lp-section-head">
            <p className="lp-eyebrow">How it works</p>
            <h2 id="how-heading" className="lp-section-title">Three steps to your next role</h2>
          </div>
          <ol className="lp-steps">
            {STEPS.map((s) => (
              <li key={s.num} className="lp-step">
                <span className="lp-step__num">{s.num}</span>
                <h3 className="lp-step__title">{s.title}</h3>
                <p className="lp-step__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Employer CTA ---------- */}
        <section className="lp-employer" id="employers" aria-labelledby="employer-heading">
          <div className="lp-employer__inner">
            <div>
              <h2 id="employer-heading" className="lp-employer__title">Looking for great talent?</h2>
              <p className="lp-employer__text">
                Connect with skilled candidates and find the people who can help your business grow.
              </p>
            </div>
            <a href="#post-job" className="lp-btn lp-btn--primary lp-btn--lg">
              Post a Job
            </a>
          </div>
        </section>

        {/* ---------- Job seeker CTA ---------- */}
        <section className="lp-cta" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="lp-cta__title">
            Your next opportunity could be closer than you think.
          </h2>
          <button type="button" className="lp-btn lp-btn--primary lp-btn--lg" onClick={goJobs}>
            Explore Jobs
          </button>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="lp-footer" id="contact">
        <div className="lp-footer__inner">
          <div className="lp-footer__brand">
            <div className="lp-logo">
              OxyTalent<span className="lp-logo__dot">.</span>
            </div>
            <p className="lp-footer__tagline">Connecting talent with opportunity.</p>
          </div>

          <div className="lp-footer__cols">
            <div className="lp-footer__col">
              <h4>For Job Seekers</h4>
              <button type="button" onClick={goJobs}>Find Jobs</button>
              <a href="#about">Career Opportunities</a>
              <a href="#signup">Sign Up</a>
            </div>
            <div className="lp-footer__col">
              <h4>For Employers</h4>
              <a href="#post-job">Post a Job</a>
              <a href="#employers">Find Talent</a>
              <a href="#login">Employer Login</a>
            </div>
            <div className="lp-footer__col">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms</a>
            </div>
          </div>
        </div>
        <div className="lp-footer__bottom">
          <p>© {new Date().getFullYear()} OxyTalent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
