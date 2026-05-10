import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconRight?: ReactNode
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-sm hover:shadow-md',
  secondary:
    'border border-gray-300 hover:bg-gray-100 active:bg-gray-200 text-gray-700 bg-white rounded-xl',
  danger:
    'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-xl shadow-sm hover:shadow-md',
  ghost:
    'border border-gray-200 hover:bg-gray-100 active:bg-gray-200 text-gray-700 bg-transparent rounded-xl',
  outline:
    'border border-dashed border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-600 bg-transparent rounded-xl',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

function Button({
  variant = 'primary',
  size = 'md',
  className,
  icon,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ''}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  )
}

export default Button
