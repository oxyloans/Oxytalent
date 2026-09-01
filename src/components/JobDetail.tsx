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
      <div className="fixed inset-0 z-10 animate-fade bg-[#0a0e14]/55" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={job.title}
        className="fixed inset-y-0 right-0 z-[11] w-full animate-slide overflow-y-auto bg-paper px-5 pb-[60px] pt-[30px] text-ink shadow-drawer sm:w-[min(480px,100vw)] sm:px-10"
      >
        <button
          className="mb-6 border border-ink/30 bg-transparent px-3 py-1.5 font-mono text-xs text-ink hover:border-ink"
          onClick={onClose}
        >
          ← Back to board
        </button>

        <div className="font-mono text-xs text-muted-on-paper">#{job.refCode}</div>
        <h2 className="mb-1 mt-2 font-display text-[28px] leading-[1.2]">{job.title}</h2>
        <div className="mb-[18px] text-base text-muted-on-paper">
          {job.company} · {job.remote ? 'Remote' : job.location}
        </div>

        <div className="mb-[22px] flex flex-wrap gap-2">
          <span className="bg-signal px-2 py-[3px] font-mono text-[10.5px] tracking-[0.02em] text-[#0e2523]">
            {job.category}
          </span>
          <span className="bg-ink/[0.08] px-2 py-[3px] font-mono text-[10.5px] tracking-[0.02em] text-ink">
            {job.type}
          </span>
        </div>

        <div className="mb-6 mt-1 font-mono text-xl font-semibold">{job.salary}</div>

        <section className="mb-6">
          <h3 className="mb-2.5 font-mono text-xs uppercase tracking-[0.08em] text-muted-on-paper">
            About the role
          </h3>
          <p className="m-0 leading-[1.6]">{job.description}</p>
        </section>

        <section className="mb-6">
          <h3 className="mb-2.5 font-mono text-xs uppercase tracking-[0.08em] text-muted-on-paper">
            What you'll do
          </h3>
          <ul className="m-0 list-disc pl-[18px] leading-[1.7]">
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="mb-2.5 font-mono text-xs uppercase tracking-[0.08em] text-muted-on-paper">
            What we're looking for
          </h3>
          <ul className="m-0 list-disc pl-[18px] leading-[1.7]">
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <button
          className="mt-2 w-full bg-ink px-5 py-[15px] font-display text-base font-semibold text-paper transition-colors duration-150 hover:bg-rust"
          onClick={() => alert(`Application flow goes here for "${job.title}".`)}
        >
          Apply for this role
        </button>
      </div>
    </>
  )
}
