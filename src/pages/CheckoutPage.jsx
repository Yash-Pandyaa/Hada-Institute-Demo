import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CreditCard, ShieldCheck } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Input from '../components/ui/Input.jsx'
import { formatPrice } from '../lib/utils.js'
import { useAuthStore } from '../stores/useAuthStore.js'
import { useCartStore } from '../stores/useCartStore.js'
import { useOrdersStore } from '../stores/useOrdersStore.js'
import { useUserStore } from '../stores/useUserStore.js'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const authUser = useAuthStore((state) => state.user)
  const { items, couponCode, discountedTotal, getSubtotal, clearCart } = useCartStore()
  const addOrder = useOrdersStore((state) => state.addOrder)
  const completePurchase = useUserStore((state) => state.completePurchase)
  const [step, setStep] = useState(1)
  const [contact, setContact] = useState({ name: authUser?.name || '', email: authUser?.email || '', phone: '' })
  const subtotal = getSubtotal()
  const total = discountedTotal || subtotal

  useEffect(() => {
    document.title = 'Checkout | Hada Institute'
  }, [])

  if (!items.length) {
    return <div className="mx-auto max-w-5xl px-4 py-16"><EmptyState title="Nothing to checkout" description="Add a note to cart before starting checkout." actionLabel="Browse Notes" onAction={() => navigate('/marketplace')} /></div>
  }

  const placeOrder = () => {
    addOrder({ items, total, couponCode, customer: contact })
    completePurchase(items.map((item) => item.product.id))
    clearCart()
    navigate('/checkout/success')
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="text-center text-5xl">Checkout</h1>
      <div className="mx-auto mt-6 flex max-w-xl justify-between">
        {[1, 2, 3].map((item) => <span key={item} className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= item ? 'bg-[var(--gold)] text-[#12100a]' : 'bg-[var(--surface)] text-[var(--text-2)]'}`}>{item}</span>)}
      </div>
      <Card className="mt-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step-1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="text-3xl">Contact Info</h2>
              <div className="mt-6 grid gap-4">
                <Input label="Name" value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} />
                <Input label="Email" type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} />
                <Input label="Phone" value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} />
              </div>
              <Button className="mt-6" onClick={() => setStep(2)}>Review Order</Button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="text-3xl">Review Order</h2>
              <div className="mt-5 divide-y divide-[var(--border)]">
                {items.map((item) => <div key={item.product.id} className="flex justify-between py-3 text-sm"><span>{item.product.title} x {item.quantity}</span><span>{formatPrice((item.product.discountedPrice || item.product.price) * item.quantity)}</span></div>)}
              </div>
              {couponCode && <p className="mt-4 text-sm text-green-300">Coupon applied: {couponCode}</p>}
              <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--surface-2)] p-5">
                <div className="flex items-center gap-3 text-[var(--gold-light)]"><CreditCard />Razorpay Demo</div>
                <p className="mt-2 text-sm text-[var(--text-2)]">Payment integration coming soon - this is a demo checkout.</p>
                <button disabled className="mt-4 w-full rounded-md border border-[var(--border-light)] py-3 text-[var(--text-3)]">Pay {formatPrice(total)}</button>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Continue</Button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="step-3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="text-center">
              <ShieldCheck className="mx-auto text-[var(--gold-light)]" size={54} />
              <h2 className="mt-4 text-3xl">Confirm Demo Order</h2>
              <p className="mx-auto mt-3 max-w-xl text-[var(--text-2)]">This will save a completed mock order, add these notes to your library, and clear the cart.</p>
              <p className="mt-5 text-3xl font-bold text-[var(--gold-light)]">{formatPrice(total)}</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={placeOrder}>Place Demo Order</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}
