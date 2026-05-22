import { cn } from '../../lib/utils.js'

const variants = {
  gold: 'border-[var(--gold-dark)] bg-[var(--gold-subtle)] text-[var(--gold-light)]',
  success: 'border-green-700/50 bg-green-500/10 text-green-200',
  error: 'border-red-700/50 bg-red-500/10 text-red-200',
  muted: 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-2)]',
  outline: 'border-[var(--border-light)] bg-transparent text-[var(--text)]',
}

export default function Badge({ children, variant = 'gold', className = '' }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  )
}
