import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, JOBS, type Job } from '../data/jobs'
import JobCard from '../components/JobCard'
import JobDetail from '../components/JobDetail'
import { useAuth } from '../features/auth/hooks/useAuth'

interface JobsPageProps {
  onNavigateHome?: () => void
}

export default function JobsPage({ onNavigateHome }: JobsPageProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [selected, setSelected] = useState<Job | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return JOBS.filter((job) => {
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q)
      const matchesCategory = !category || job.category === category
      return matchesQuery && matchesCategory
    }).sort((a, b) => Number(b.pinned) - Number(a.pinned))
  }, [query, category])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line bg-ink-soft px-[18px] pb-[22px] pt-7 sm:px-[clamp(20px,5vw,56px)]">
        <div className="flex items-baseline gap-3">
          <h1 className="m-0">
            {onNavigateHome ? (
              <button
                type="button"
                className="cursor-pointer border-none bg-none p-0 font-display text-[28px] font-bold tracking-[-0.01em] text-inherit hover:opacity-90"
                onClick={onNavigateHome}
                aria-label="Go to OxyTalent home"
              >
                OxyTalent<span className="text-brass-bright">.</span>
              </button>
            ) : (
              <span className="font-display text-[28px] font-bold tracking-[-0.01em]">
                OxyTalent<span className="text-brass-bright">.</span>
              </span>
            )}
          </h1>
          <span className="font-mono text-xs tracking-[0.02em] text-muted">board — updated daily</span>
        </div>
        <span className="font-mono text-[13px] text-brass-bright">{filtered.length} open roles</span>
        <div className="flex flex-wrap items-center gap-2.5 self-center">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[12.5px] text-muted">Hi, {user?.fullName.split(' ')[0]}</span>
              <button
                type="button"
                className="rounded-md border border-line bg-transparent px-3.5 py-2 text-[13px] font-semibold text-paper hover:border-rust hover:text-rust"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="whitespace-nowrap rounded-md border border-line px-4 py-2 text-[13px] font-semibold text-paper no-underline hover:border-brass hover:text-brass-bright"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="whitespace-nowrap rounded-md border border-brass bg-brass px-4 py-2 text-[13px] font-semibold text-ink no-underline hover:bg-brass-bright hover:border-brass-bright"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-7 px-[18px] pb-12 pt-5 sm:px-[clamp(20px,5vw,56px)] sm:pt-[clamp(20px,4vw,44px)]">
        <div className="flex flex-col gap-4">
          <div className="relative max-w-[420px]">
            <label
              htmlFor="search"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-brass"
            >
              Search the board
            </label>
            <input
              id="search"
              type="text"
              placeholder="Title, company, or location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-0 border-b border-muted bg-transparent px-1 pb-2.5 pt-2 font-display text-xl text-paper transition-colors duration-200 placeholder:font-medium placeholder:text-muted focus:border-brass-bright focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by category">
            <button
              className={`clip-chip cursor-pointer border px-3.5 py-[7px] font-mono text-xs tracking-[0.02em] transition-all duration-150 ${
                category === null
                  ? 'border-brass bg-brass font-semibold text-ink'
                  : 'border-line bg-transparent text-muted hover:border-brass hover:text-paper'
              }`}
              aria-pressed={category === null}
              onClick={() => setCategory(null)}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`clip-chip cursor-pointer border px-3.5 py-[7px] font-mono text-xs tracking-[0.02em] transition-all duration-150 ${
                  category === c
                    ? 'border-brass bg-brass font-semibold text-ink'
                    : 'border-line bg-transparent text-muted hover:border-brass hover:text-paper'
                }`}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="font-mono text-muted py-10">No roles match that search — try clearing a filter.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-x-[22px] gap-y-6">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} onSelect={setSelected} />
            ))}
          </div>
        )}
      </main>

      {selected && <JobDetail job={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
