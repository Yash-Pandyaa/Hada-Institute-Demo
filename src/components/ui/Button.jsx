import { cn } from '../../lib/utils.js'

const variants = {
  primary: 'border border-[var(--gold)] bg-[var(--gold)] text-[#12100a] shadow-[0_0_32px_var(--gold-glow)] hover:bg-[var(--gold-light)]',
  outline: 'border border-[var(--gold-dark)] bg-transparent text-[var(--gold-light)] hover:bg-[var(--gold-subtle)]',
  ghost: 'border border-transparent bg-transparent text-[var(--text-2)] hover:text-[var(--gold-light)] hover:bg-[var(--gold-subtle)]',
  danger: 'border border-[var(--error)] bg-[rgba(192,57,43,0.14)] text-red-200 hover:bg-[rgba(192,57,43,0.24)]',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
}

export default function Button({ children, variant = 'primary', size = 'md', className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
