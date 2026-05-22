import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Tabs from '@radix-ui/react-tabs'
import { CheckCircle2, Download, FileText, Languages, ShieldCheck, ShoppingCart } from 'lucide-react'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import PriceDisplay from '../components/ui/PriceDisplay.jsx'
import ProductCard from '../components/ui/ProductCard.jsx'
import StarRating from '../components/ui/StarRating.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import MagneticButton from '../components/animations/MagneticButton.jsx'
import ParallaxSection from '../components/animations/ParallaxSection.jsx'
import { useProductsStore } from '../stores/useProductsStore.js'
import { useCartStore } from '../stores/useCartStore.js'

export default function NoteDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const products = useProductsStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const product = products.find((item) => item.slug === slug)

  useEffect(() => {
    document.title = product ? `${product.title} | Hada Institute` : 'Note Not Found | Hada Institute'
  }, [product])

  if (!product) {
    return <div className="mx-auto max-w-5xl px-4 py-16"><EmptyState title="Note not found" description="The note you are looking for may have been unpublished." actionLabel="Browse Marketplace" onAction={() => navigate('/marketplace')} /></div>
  }

  const related = products.filter((item) => item.subjectId === product.subjectId && item.id !== product.id && item.isPublished).slice(0, 4)
  const finalPrice = product.discountedPrice || product.price
  const savings = product.discountedPrice ? product.price - product.discountedPrice : 0

  const buyNow = () => {
    addItem(product)
    navigate('/checkout')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section>
          <ParallaxSection speed={0.18} className="overflow-hidden rounded-lg border border-[var(--border)]">
            <img src={product.coverImage} alt={product.title} className="h-[420px] w-full object-cover" />
          </ParallaxSection>
          <div className="mt-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>{product.subject.name}</Badge>
              <Badge variant="muted">{product.category.name}</Badge>
            </div>
            <h1 className="text-5xl font-semibold">{product.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--text-2)]">{product.description}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--text-2)]">
              <span className="flex items-center gap-2"><FileText size={17} />{product.totalPages} pages</span>
              <span className="flex items-center gap-2"><Languages size={17} />{product.language}</span>
              <span className="flex items-center gap-2"><Download size={17} />Digital PDF</span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <StarRating rating={product.rating} showValue />
              <span className="text-sm text-[var(--text-2)]">{product.reviewCount} student reviews</span>
            </div>
          </div>

          <Tabs.Root defaultValue="description" className="mt-10">
            <Tabs.List className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-3">
              {['description', 'inside', 'reviews'].map((tab) => (
                <Tabs.Trigger key={tab} value={tab} className="rounded-md px-4 py-2 text-sm capitalize text-[var(--text-2)] data-[state=active]:bg-[var(--gold-subtle)] data-[state=active]:text-[var(--gold-light)]">{tab === 'inside' ? "What's Inside" : tab}</Tabs.Trigger>
              ))}
            </Tabs.List>
            <Tabs.Content value="description" className="py-6 text-[var(--text-2)]">
              <p className="max-w-3xl leading-8">{product.description} Designed for rapid revision, these notes balance conceptual clarity with exam-oriented recall.</p>
            </Tabs.Content>
            <Tabs.Content value="inside" className="py-6">
              <div className="grid gap-3 md:grid-cols-2">
                {product.highlights.map((item) => <div key={item} className="flex items-center gap-3 rounded-md bg-[var(--surface)] p-4 text-[var(--text-2)]"><CheckCircle2 className="text-[var(--gold-light)]" size={18} />{item}</div>)}
              </div>
            </Tabs.Content>
            <Tabs.Content value="reviews" className="py-6">
              <Card>
                <StarRating rating={product.rating} />
                <p className="mt-3 text-[var(--text-2)]">Students rate this note highly for clarity, exam relevance, and concise revision structure.</p>
              </Card>
            </Tabs.Content>
          </Tabs.Root>
        </section>

        <aside>
          <Card className="sticky top-24">
            <p className="text-sm uppercase tracking-wide text-[var(--text-3)]">Purchase Note</p>
            <PriceDisplay className="mt-3" price={product.price} discountedPrice={product.discountedPrice} />
            {savings > 0 && <p className="mt-2 text-sm text-green-300">You save ₹{savings} on this note.</p>}
            <div className="mt-6 grid gap-3">
              <MagneticButton className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--gold)] font-semibold text-[#12100a]" onClick={() => addItem(product)}>
                <ShoppingCart size={18} />Add to Cart
              </MagneticButton>
              <Button variant="outline" onClick={buyNow}>Buy Now - ₹{finalPrice}</Button>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-md bg-[var(--surface-2)] p-4 text-sm text-[var(--text-2)]">
              <ShieldCheck className="text-[var(--gold-light)]" />
              Instant Download after Payment
            </div>
          </Card>
        </aside>
      </div>

      <section className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl">Related Notes</h2>
          <Link to="/marketplace" className="text-[var(--gold-light)]">View all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {related.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </div>
  )
}
