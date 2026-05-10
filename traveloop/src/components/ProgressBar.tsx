type ProgressBarTone = 'emerald' | 'sky' | 'amber'

type ProgressBarProps = {
  value: number
  label?: string
  tone?: ProgressBarTone
}

const toneClasses: Record<ProgressBarTone, string> = {
  emerald: 'bg-emerald-500',
  sky: 'bg-sky-500',
  amber: 'bg-amber-500',
}

function ProgressBar({ value, label, tone = 'emerald' }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span>{label}</span>
          <span>{clampedValue}%</span>
        </div>
      ) : null}
      <div
        className="h-2 rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full ${toneClasses[tone]}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
