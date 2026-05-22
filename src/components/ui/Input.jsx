import { cn } from '../../lib/utils.js'

export default function Input({ label, error, className = '', textarea = false, ...props }) {
  const Control = textarea ? 'textarea' : 'input'
  return (
    <label className="block space-y-2 text-left">
      {label && <span className="text-sm font-medium text-[var(--text-2)]">{label}</span>}
      <Control
        className={cn(
          'w-full rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-[var(--text-3)] focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-glow)]',
          textarea && 'min-h-32 resize-y',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-300">{error}</span>}
    </label>
  )
}
