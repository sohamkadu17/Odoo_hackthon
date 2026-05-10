import type { ReactNode } from 'react'

type PageShellProps = {
  title: string
  subtitle?: string
  actions?: ReactNode
  children?: ReactNode
}

function PageShell({ title, subtitle, actions, children }: PageShellProps) {
  return (
    <div className="space-y-8 page-animate">
      <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-600">
                Traveloop
              </p>
              <div className="space-y-2">
                <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="max-w-2xl text-base text-slate-600">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>
            {actions ? (
              <div className="flex flex-wrap items-center gap-3">
                {actions}
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <section className="grid gap-6">{children}</section>
    </div>
  )
}

export default PageShell
