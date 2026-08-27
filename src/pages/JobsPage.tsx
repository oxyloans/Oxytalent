import { useMemo, useState } from 'react'
import { CATEGORIES, JOBS, type Job } from '../data/jobs'
import JobCard from '../components/JobCard'
import JobDetail from '../components/JobDetail'
import '../App.css'

interface JobsPageProps {
  onNavigateHome?: () => void
}

export default function JobsPage({ onNavigateHome }: JobsPageProps) {
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
    <div className="app">
      <header className="header">
        <div className="header__mark">
          <h1>
            {onNavigateHome ? (
              <button
                type="button"
                className="header__logo-btn"
                onClick={onNavigateHome}
                aria-label="Go to OxyTalent home"
              >
                OxyTalent<span className="dot">.</span>
              </button>
            ) : (
              <>
                OxyTalent<span className="dot">.</span>
              </>
            )}
          </h1>
          <span className="header__meta">board — updated daily</span>
        </div>
        <span className="header__count">{filtered.length} open roles</span>
      </header>

      <main className="board">
        <div className="filters">
          <div className="filters__search">
            <label htmlFor="search">Search the board</label>
            <input
              id="search"
              type="text"
              placeholder="Title, company, or location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="chips" role="group" aria-label="Filter by category">
            <button
              className="chip"
              aria-pressed={category === null}
              onClick={() => setCategory(null)}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className="chip"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="empty">No roles match that search — try clearing a filter.</p>
        ) : (
          <div className="grid">
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
