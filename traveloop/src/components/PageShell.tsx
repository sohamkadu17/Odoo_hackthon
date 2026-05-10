import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type PageShellProps = {
  title: string
  subtitle?: string
  actions?: ReactNode
  children?: ReactNode
  eyebrow?: string
}

function PageShell({ title, subtitle, actions, children, eyebrow }: PageShellProps) {
  return (
    <motion.div
      className="space-y-8 page-animate"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Page header */}
      <header className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                {eyebrow}
              </p>
            )}
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
            {subtitle && (
              <p className="max-w-2xl text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {actions}
            </div>
          )}
        </div>
      </header>

      {/* Page content */}
      <div className="grid gap-6">{children}</div>
    </motion.div>
  )
}

export default PageShell
