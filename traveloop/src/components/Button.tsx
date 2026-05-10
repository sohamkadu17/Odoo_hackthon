import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'outline'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500'

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md active:bg-emerald-800',
  ghost:
    'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900 hover:shadow-sm',
  outline:
    'border border-dashed border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:shadow-sm',
}

function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className ?? ''}`}
      {...props}
    />
  )
}

export default Button
