import type { ReactNode } from 'react'

type BadgeTone = 'gray' | 'blue' | 'indigo' | 'cyan' | 'teal' | 'amber' | 'red' | 'green' | 'purple'

type BadgeProps = {
  tone?: BadgeTone
  children: ReactNode
  dot?: boolean
  className?: string
}

const toneClasses: Record<BadgeTone, string> = {
  gray: 'bg-gray-100 text-gray-700 ring-gray-200',
  blue: 'bg-blue-100 text-blue-700 ring-blue-200',
  indigo: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
  cyan: 'bg-cyan-100 text-cyan-700 ring-cyan-200',
  teal: 'bg-teal-100 text-teal-700 ring-teal-200',
  amber: 'bg-amber-100 text-amber-700 ring-amber-200',
  red: 'bg-red-100 text-red-700 ring-red-200',
  green: 'bg-green-100 text-green-700 ring-green-200',
  purple: 'bg-purple-100 text-purple-700 ring-purple-200',
}

const dotColors: Record<BadgeTone, string> = {
  gray: 'bg-gray-400',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  cyan: 'bg-cyan-500',
  teal: 'bg-teal-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
}

function Badge({ tone = 'gray', children, dot = false, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${toneClasses[tone]} ${className}`}
    >
      {dot && (
        <span className={`h-1.5 w-1.5 rounded-full ${dotColors[tone]}`} />
      )}
      {children}
    </span>
  )
}

export default Badge
