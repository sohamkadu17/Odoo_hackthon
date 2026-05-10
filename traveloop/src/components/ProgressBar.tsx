type ProgressBarTone = 'blue' | 'cyan' | 'indigo' | 'amber' | 'green' | 'red' | 'teal'

type ProgressBarProps = {
  value: number
  label?: string
  tone?: ProgressBarTone
  showValue?: boolean
}

const toneClasses: Record<ProgressBarTone, string> = {
  blue: 'bg-blue-500',
  cyan: 'bg-cyan-500',
  indigo: 'bg-indigo-500',
  amber: 'bg-amber-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  teal: 'bg-teal-500',
}

const trackClasses: Record<ProgressBarTone, string> = {
  blue: 'bg-blue-100',
  cyan: 'bg-cyan-100',
  indigo: 'bg-indigo-100',
  amber: 'bg-amber-100',
  green: 'bg-green-100',
  red: 'bg-red-100',
  teal: 'bg-teal-100',
}

function ProgressBar({ value, label, tone = 'blue', showValue = true }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-gray-900">{clampedValue}%</span>
          )}
        </div>
      )}
      <div
        className={`h-2 rounded-full ${trackClasses[tone]}`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full ${toneClasses[tone]} transition-all duration-700 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
