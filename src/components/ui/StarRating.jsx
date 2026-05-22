import { Star } from 'lucide-react'

export default function StarRating({ rating = 0, showValue = false, className = '' }) {
  return (
    <div className={`flex items-center gap-1 text-[var(--gold)] ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          fill={star <= Math.round(rating) ? 'currentColor' : 'none'}
          className={star <= Math.round(rating) ? '' : 'text-[var(--text-3)]'}
        />
      ))}
      {showValue && <span className="ml-1 text-sm text-[var(--text-2)]">{rating}</span>}
    </div>
  )
}
