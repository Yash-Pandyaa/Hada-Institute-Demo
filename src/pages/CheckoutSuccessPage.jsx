import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import { formatPrice } from '../lib/utils.js'
import { useOrdersStore } from '../stores/useOrdersStore.js'

export default function CheckoutSuccessPage() {
  const lastOrder = useOrdersStore((state) => state.lastOrder)
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-12">
      <Card className="w-full text-center">
        <motion.svg width="96" height="96" viewBox="0 0 96 96" className="mx-auto text-green-300" initial="hidden" animate="visible">
          <motion.circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="5" fill="none" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }} transition={{ duration: 0.6 }} />
          <motion.path d="M30 50 L43 63 L68 35" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }} transition={{ delay: 0.35, duration: 0.5 }} />
        </motion.svg>
        <h1 className="mt-5 text-5xl">Order Placed Successfully!</h1>
        {lastOrder && <p className="mt-4 text-[var(--text-2)]">Order {lastOrder.id} for {formatPrice(lastOrder.total)} is now in your mock order history.</p>}
        <Link to="/account/library"><Button className="mt-7">Go to My Library</Button></Link>
      </Card>
    </div>
  )
}
