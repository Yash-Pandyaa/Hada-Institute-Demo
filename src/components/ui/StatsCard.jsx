import Card from './Card.jsx'

export default function StatsCard({ icon: Icon, label, count, trend }) {
  return (
    <Card className="flex items-center gap-4">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--gold-subtle)] text-[var(--gold-light)]">
          <Icon size={22} />
        </div>
      )}
      <div>
        <p className="text-sm text-[var(--text-2)]">{label}</p>
        <p className="text-3xl font-bold text-[var(--text)]">{count}</p>
        {trend && <p className="mt-1 text-xs text-green-300">{trend}</p>}
      </div>
    </Card>
  )
}
