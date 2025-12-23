import { type ReactNode } from 'react'

interface ButtonProps {
  size: 'sm' | 'md' | 'lg'
  children: ReactNode
  onClick: () => void
  className?: string
}

const Button = ({ size, children, onClick, className }: ButtonProps) => {
  const sizeClass = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-4 py-2 text-lg',
  }

  return (
    <button className={`${sizeClass[size]} ${className} bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button