import type { Job } from '../data/jobs'

function timeAgo(dateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  return new Date(dateStr).toLocaleDateString()
}

interface Props {
  job: Job
  onSelect: (job: Job) => void
}

export default function JobCard({ job, onSelect }: Props) {
  return (
    <button
      className={`card${job.pinned ? ' card--pinned' : ''}`}
      onClick={() => onSelect(job)}
      aria-label={`View details for ${job.title} at ${job.company}`}
    >
      <span className="card__pin" aria-hidden="true" />
      <div className="card__ref">#{job.refCode}</div>
      <h3 className="card__title">{job.title}</h3>
      <div className="card__company">{job.company}</div>

      <div className="card__row">
        <span className="tag tag--signal">{job.category}</span>
        <span className="tag">{job.type}</span>
        <span className="tag">{job.remote ? 'Remote' : job.location}</span>
      </div>

      <div className="card__footer">
        <span className="card__salary">{job.salary}</span>
        <span className="card__posted">{timeAgo(job.posted)}</span>
      </div>
    </button>
  )
}
