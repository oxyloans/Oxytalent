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
      className={`clip-card relative cursor-pointer border-none bg-paper px-5 pb-[18px] pt-[22px] text-left font-body text-ink shadow-card transition-transform duration-[180ms] ease-out hover:-translate-y-1 hover:rotate-0 hover:shadow-card-hover focus-visible:-translate-y-1 focus-visible:rotate-0 focus-visible:shadow-card-hover [&:nth-child(3n+1)]:rotate-[-0.9deg] [&:nth-child(3n+2)]:rotate-[0.7deg] [&:nth-child(3n)]:rotate-[-0.3deg]`}
      onClick={() => onSelect(job)}
      aria-label={`View details for ${job.title} at ${job.company}`}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full shadow-pin ${
          job.pinned
            ? 'bg-[radial-gradient(circle_at_35%_30%,#e58a72,#b4573f_65%,#7c3620_100%)]'
            : 'bg-[radial-gradient(circle_at_35%_30%,#dab766,#c9a24b_65%,#8f6f2c_100%)]'
        }`}
      />
      <div className="font-mono text-[11px] tracking-[0.04em] text-muted-on-paper">#{job.refCode}</div>
      <h3 className="mb-1 mt-1.5 font-display text-[19px] font-semibold leading-[1.25]">{job.title}</h3>
      <div className="mb-3.5 text-sm text-muted-on-paper">{job.company}</div>

      <div className="mb-2.5 flex flex-wrap gap-2">
        <span className="bg-signal px-2 py-[3px] font-mono text-[10.5px] tracking-[0.02em] text-[#0e2523]">
          {job.category}
        </span>
        <span className="bg-ink/[0.08] px-2 py-[3px] font-mono text-[10.5px] tracking-[0.02em] text-ink">
          {job.type}
        </span>
        <span className="bg-ink/[0.08] px-2 py-[3px] font-mono text-[10.5px] tracking-[0.02em] text-ink">
          {job.remote ? 'Remote' : job.location}
        </span>
      </div>

      <div className="mt-3.5 flex items-center justify-between border-t border-dashed border-ink/25 pt-3 font-mono text-xs">
        <span className="font-semibold">{job.salary}</span>
        <span className="text-muted-on-paper">{timeAgo(job.posted)}</span>
      </div>
    </button>
  )
}
