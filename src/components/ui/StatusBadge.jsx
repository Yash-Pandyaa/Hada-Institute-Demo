import Badge from './Badge.jsx'

export default function StatusBadge({ status }) {
  const normalized = String(status || '').toLowerCase()
  if (normalized.includes('complete') || normalized.includes('paid') || normalized.includes('read')) {
    return <Badge variant="success">{status}</Badge>
  }
  if (normalized.includes('fail') || normalized.includes('refund') || normalized.includes('unread')) {
    return <Badge variant="error">{status}</Badge>
  }
  return <Badge variant="muted">{status}</Badge>
}
