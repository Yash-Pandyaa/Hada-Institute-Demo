import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Input from '../components/ui/Input.jsx'
import PriceDisplay from '../components/ui/PriceDisplay.jsx'
import { formatPrice } from '../lib/utils.js'
import { useCartStore } from '../stores/useCartStore.js'
import { useCouponsStore } from '../stores/useCouponsStore.js'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, removeItem, updateQty, applyDiscount, couponCode, discountAmount, discountedTotal, getSubtotal } = useCartStore()
  const validate = useCouponsStore((state) => state.validate)
  const [code, setCode] = useState(couponCode)
  const [message, setMessage] = useState('')
  const subtotal = getSubtotal()

  useEffect(() => {
    document.title = 'Cart | Hada Institute'
  }, [])

  const apply = () => {
    const coupon = validate(code)
    applyDiscount(coupon)
    setMessage(coupon ? `${coupon.code} applied for ${coupon.discountPercent}% off.` : 'Coupon is invalid, expired, or inactive.')
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        <EmptyState icon={ShoppingCart} title="Your cart is empty" description="Browse premium notes and add the ones you want to revise from." actionLabel="Browse Notes" onAction={() => navigate('/marketplace')} />
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1fr_360px]">
      <section>
        <h1 className="mb-6 text-5xl">Cart</h1>
        <div className="grid gap-4">
          {items.map(({ product, quantity }) => (
            <Card key={product.id} className="grid gap-4 md:grid-cols-[120px_1fr_auto]">
              <img src={product.coverImage} alt={product.title} className="h-28 w-full rounded-md object-cover md:w-28" />
              <div>
                <h2 className="text-2xl">{product.title}</h2>
                <p className="mt-1 text-sm text-[var(--text-2)]">{product.subject.name} - {product.category.name}</p>
                <PriceDisplay className="mt-3" price={product.price} discountedPrice={product.discountedPrice} />
              </div>
              <div className="flex items-center gap-2 md:flex-col md:items-end">
                <div className="flex items-center rounded-md border border-[var(--border)]">
                  <button type="button" className="p-2" onClick={() => updateQty(product.id, quantity - 1)}><Minus size={15} /></button>
                  <span className="px-3">{quantity}</span>
                  <button type="button" className="p-2" onClick={() => updateQty(product.id, quantity + 1)}><Plus size={15} /></button>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeItem(product.id)}><Trash2 size={15} />Remove</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <aside>
        <Card className="sticky top-24">
          <h2 className="text-3xl">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-[var(--text-2)]">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--text-2)]">Discount</span><span className="text-green-300">-{formatPrice(discountAmount)}</span></div>
            <div className="border-t border-[var(--border)] pt-3 text-lg font-bold flex justify-between"><span>Total</span><span>{formatPrice(discountedTotal || subtotal)}</span></div>
          </div>
          <div className="mt-6 grid gap-3">
            <Input label="Coupon Code" value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="HADA20" />
            <Button variant="outline" onClick={apply}>Apply Coupon</Button>
            {message && <p className="text-sm text-[var(--text-2)]">{message}</p>}
          </div>
          <Link to="/checkout" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-[var(--gold)] font-semibold text-[#12100a]">Proceed to Checkout</Link>
        </Card>
      </aside>
    </div>
  )
}
