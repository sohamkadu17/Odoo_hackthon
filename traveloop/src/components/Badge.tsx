import type { ReactNode } from 'react'

type BadgeTone = 'slate' | 'emerald' | 'amber' | 'rose' | 'sky'

type BadgeProps = {
  tone?: BadgeTone
  children: ReactNode
}

const toneClasses: Record<BadgeTone, string> = {
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  emerald: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-100 text-amber-700 ring-amber-200',
  rose: 'bg-rose-100 text-rose-700 ring-rose-200',
  sky: 'bg-sky-100 text-sky-700 ring-sky-200',
}

function Badge({ tone = 'slate', children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        toneClasses[tone]
      }`}
    >
      {children}
    </span>
  )
}

export default Badge
