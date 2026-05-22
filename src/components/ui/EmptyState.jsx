import { SearchX } from 'lucide-react'
import Button from './Button.jsx'

export default function EmptyState({ icon: Icon = SearchX, title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--border-light)] bg-[var(--surface)] p-10 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold-subtle)] text-[var(--gold-light)]">
        <Icon size={30} />
      </div>
      <h3 className="text-2xl">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-[var(--text-2)]">{description}</p>
      {actionLabel && <Button className="mt-6" onClick={onAction}>{actionLabel}</Button>}
    </div>
  )
}
