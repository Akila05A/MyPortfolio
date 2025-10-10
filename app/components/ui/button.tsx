import React from 'react'
import classNames from 'classnames'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const baseClasses =
    'px-6 py-2 font-semibold rounded-lg transition-colors duration-300'

  const variantClasses =
    variant === 'outline'
      ? 'border border-purple-400 text-purple-400 hover:bg-purple-900/30'
      : 'bg-purple-500 text-white hover:bg-purple-400'

  return (
    <button className={classNames(baseClasses, variantClasses, className)} {...props}>
      {children}
    </button>
  )
}
