import { Link } from 'react-router-dom'
import { BookOpen, Mail, ReceiptIndianRupee, ShoppingBag } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import StatsCard from '../../components/ui/StatsCard.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { formatDate, formatPrice } from '../../lib/utils.js'
import { useProductsStore } from '../../stores/useProductsStore.js'
import { useOrdersStore } from '../../stores/useOrdersStore.js'
import { useMessagesStore } from '../../stores/useMessagesStore.js'

export default function AdminDashboard() {
  const products = useProductsStore((state) => state.items)
  const orders = useOrdersStore((state) => state.items)
  const messages = useMessagesStore((state) => state.items)
  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0)
  const unread = messages.filter((message) => !message.isRead)

  return (
    <div>
      <h1 className="text-4xl">Dashboard</h1>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard icon={BookOpen} label="Total Products" count={products.length} />
        <StatsCard icon={ShoppingBag} label="Total Orders" count={orders.length} />
        <StatsCard icon={ReceiptIndianRupee} label="Total Revenue" count={formatPrice(revenue)} />
        <StatsCard icon={Mail} label="Unread Messages" count={unread.length} />
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="text-2xl">Recent Orders</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-[var(--text-3)]"><tr><th className="py-2">Order</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>{orders.slice(0, 5).map((order) => <tr key={order.id} className="border-t border-[var(--border)]"><td className="py-3 font-mono text-xs">{order.id}</td><td>{formatPrice(order.total)}</td><td><StatusBadge status={order.status} /></td><td>{formatDate(order.createdAt)}</td></tr>)}</tbody>
            </table>
            {!orders.length && <p className="py-5 text-[var(--text-2)]">No orders yet.</p>}
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl">Recent Unread Messages</h2>
          <div className="mt-4 grid gap-3">
            {unread.slice(0, 5).map((message) => <div key={message.id} className="rounded-md bg-[var(--surface-2)] p-3"><p className="font-semibold">{message.name}</p><p className="text-sm text-[var(--text-2)]">{message.message}</p></div>)}
            {!unread.length && <p className="py-5 text-[var(--text-2)]">No unread messages.</p>}
          </div>
        </Card>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/admin/products/new"><Button>Add Product</Button></Link>
        <Link to="/admin/blog"><Button variant="outline">Add Blog Post</Button></Link>
        <Link to="/admin/banners"><Button variant="outline">Add Banner</Button></Link>
      </div>
    </div>
  )
}
