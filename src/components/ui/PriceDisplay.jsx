import Badge from './Badge.jsx'
import { formatPrice } from '../../lib/utils.js'

export default function PriceDisplay({ price, discountedPrice, className = '' }) {
  const active = discountedPrice || price
  const savings = discountedPrice ? Math.round(((price - discountedPrice) / price) * 100) : 0
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-2xl font-bold text-[var(--gold-light)]">{formatPrice(active)}</span>
      {discountedPrice && <span className="text-sm text-[var(--text-3)] line-through">{formatPrice(price)}</span>}
      {discountedPrice && <Badge variant="success">Save {savings}%</Badge>}
    </div>
  )
}
