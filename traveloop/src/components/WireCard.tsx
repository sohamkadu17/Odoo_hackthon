import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type WireCardVariant = 'solid' | 'dashed' | 'soft'

type WireCardProps = {
  title?: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  children?: ReactNode
  variant?: WireCardVariant
  className?: string
  noPadding?: boolean
}

const variantClasses: Record<WireCardVariant, string> = {
  solid: 'border border-gray-200 bg-white',
  dashed: 'border border-dashed border-gray-300 bg-gray-50/70',
  soft: 'border border-gray-100 bg-white/80',
}

function WireCard({
  title,
  description,
  eyebrow,
  actions,
  children,
  variant = 'solid',
  className = '',
  noPadding = false,
}: WireCardProps) {
  return (
    <motion.section
      className={`rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md ${variantClasses[variant]} ${noPadding ? '' : 'p-6'} ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {(title || actions) && (
        <div className={`flex flex-wrap items-start justify-between gap-3 ${noPadding ? 'px-6 pt-6' : ''}`}>
          <div className="space-y-1">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                {eyebrow}
              </p>
            )}
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 shrink-0">{actions}</div>
          )}
        </div>
      )}
      {children && (
        <div className={`${(title || actions) ? 'mt-5' : ''} ${noPadding ? 'px-6 pb-6' : ''} space-y-4`}>
          {children}
        </div>
      )}
    </motion.section>
  )
}

export default WireCard
