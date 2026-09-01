import type { WorkStatus } from '../types/auth.types'

interface WorkStatusToggleProps {
  value: WorkStatus | null
  onChange: (value: WorkStatus) => void
  error?: string | null
}

const OPTIONS: { value: WorkStatus; title: string; text: string; icon: string }[] = [
  {
    value: 'experienced',
    title: "I'm experienced",
    text: 'I have work experience (excluding internships)',
    icon: '💼',
  },
  {
    value: 'fresher',
    title: "I'm a fresher",
    text: "I am a student / haven't worked after graduation",
    icon: '🎓',
  },
]

export function WorkStatusToggle({ value, onChange, error }: WorkStatusToggleProps) {
  return (
    <div className="flex flex-col gap-[7px]">
      <span className="text-[13.5px] font-semibold text-ink">
        Work status<span className="ml-0.5 text-rust">*</span>
      </span>
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2" role="radiogroup" aria-label="Work status">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={value === opt.value}
            className={`relative flex flex-col gap-1 rounded-lg border-[1.5px] bg-white py-3.5 pl-3.5 pr-10 text-left transition-colors duration-150 ${
              value === opt.value ? 'border-brass bg-brass/[0.08]' : 'border-ink/[0.16]'
            }`}
            onClick={() => onChange(opt.value)}
          >
            <span className="text-[13.5px] font-bold text-ink">{opt.title}</span>
            <span className="text-xs leading-[1.4] text-muted-on-paper">{opt.text}</span>
            <span className="absolute right-3 top-3 text-base" aria-hidden="true">
              {opt.icon}
            </span>
          </button>
        ))}
      </div>
      {error && (
        <p className="m-0 text-[12.5px] text-rust" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
