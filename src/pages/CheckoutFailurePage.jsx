import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'

export default function CheckoutFailurePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-12">
      <Card className="w-full text-center">
        <motion.div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-red-300 text-5xl text-red-300" initial={{ scale: 0.7, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }}>x</motion.div>
        <h1 className="mt-5 text-5xl">Payment Failed</h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--text-2)]">The demo payment could not be completed. You can try checkout again or contact support.</p>
        <div className="mt-7 flex justify-center gap-3">
          <Link to="/checkout"><Button>Try Again</Button></Link>
          <Link to="/contact"><Button variant="outline">Contact Support</Button></Link>
        </div>
      </Card>
    </div>
  )
}
