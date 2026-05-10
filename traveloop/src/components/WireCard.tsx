import type { ReactNode } from 'react'

type WireCardVariant = 'solid' | 'dashed' | 'soft'

type WireCardProps = {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  children?: ReactNode
  variant?: WireCardVariant
}

const variantClasses: Record<WireCardVariant, string> = {
  solid: 'border border-slate-200 bg-white',
  dashed: 'border border-dashed border-slate-300 bg-slate-50',
  soft: 'border border-slate-100 bg-white/70',
}

function WireCard({
  title,
  description,
  eyebrow,
  actions,
  children,
  variant = 'solid',
}: WireCardProps) {
  return (
    <section
      className={`rounded-2xl p-5 shadow-sm backdrop-blur ${variantClasses[variant]}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">
              {eyebrow}
            </p>
          ) : null}
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          {description ? (
            <p className="text-sm text-slate-600">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
      {children ? <div className="mt-4 space-y-3">{children}</div> : null}
    </section>
  )
}

export default WireCard
