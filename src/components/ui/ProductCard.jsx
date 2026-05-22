import { Link } from 'react-router-dom'
import { Eye, FileText, Languages, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import Badge from './Badge.jsx'
import Button from './Button.jsx'
import PriceDisplay from './PriceDisplay.jsx'
import StarRating from './StarRating.jsx'
import HoverTilt from '../animations/HoverTilt.jsx'
import { useCartStore } from '../../stores/useCartStore.js'

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <HoverTilt className="h-full">
      <motion.article
        layout
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[rgba(18,18,30,0.86)] transition duration-300 hover:border-[var(--gold-dark)] hover:shadow-[0_0_35px_var(--gold-glow)]"
      >
        <Link to={`/notes/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
          <img src={product.coverImage} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge>{product.subject.name}</Badge>
            <Badge variant="muted">{product.category.name}</Badge>
          </div>
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <StarRating rating={product.rating} />
            <span className="text-xs text-[var(--text-3)]">{product.reviewCount} reviews</span>
          </div>
          <Link to={`/notes/${product.slug}`} className="mt-3">
            <h3 className="line-clamp-2 text-2xl leading-tight transition group-hover:text-[var(--gold-light)]">{product.title}</h3>
          </Link>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--text-2)]">{product.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--text-2)]">
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface-2)] px-3 py-1"><FileText size={13} />{product.totalPages} pages</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface-2)] px-3 py-1"><Languages size={13} />{product.language}</span>
          </div>
          <div className="mt-auto pt-5">
            <PriceDisplay price={product.price} discountedPrice={product.discountedPrice} />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => addItem(product)}><ShoppingCart size={16} />Cart</Button>
              <Link to={`/notes/${product.slug}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[var(--gold)] bg-[var(--gold)] px-4 text-sm font-semibold text-[#12100a] transition hover:bg-[var(--gold-light)]">
                <Eye size={16} />Details
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    </HoverTilt>
  )
}
