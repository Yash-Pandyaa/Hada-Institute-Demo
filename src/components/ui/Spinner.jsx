export default function Spinner({ className = 'h-8 w-8' }) {
  return (
    <span
      className={`${className} inline-block animate-spin rounded-full border-2 border-[var(--border-light)] border-t-[var(--gold)]`}
      aria-label="Loading"
    />
  )
}
