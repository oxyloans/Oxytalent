import { useEffect } from 'react'
import type { Job } from '../data/jobs'

interface Props {
  job: Job
  onClose: () => void
}

export default function JobDetail({ job, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="drawer" role="dialog" aria-modal="true" aria-label={job.title}>
        <button className="drawer__close" onClick={onClose}>
          ← Back to board
        </button>

        <div className="drawer__ref">#{job.refCode}</div>
        <h2>{job.title}</h2>
        <div className="drawer__company">
          {job.company} · {job.remote ? 'Remote' : job.location}
        </div>

        <div className="drawer__meta">
          <span className="tag tag--signal">{job.category}</span>
          <span className="tag">{job.type}</span>
        </div>

        <div className="drawer__salary">{job.salary}</div>

        <section>
          <h3>About the role</h3>
          <p>{job.description}</p>
        </section>

        <section>
          <h3>What you'll do</h3>
          <ul>
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>What we're looking for</h3>
          <ul>
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <button
          className="apply-btn"
          onClick={() => alert(`Application flow goes here for "${job.title}".`)}
        >
          Apply for this role
        </button>
      </div>
    </>
  )
}
