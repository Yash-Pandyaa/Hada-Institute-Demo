import Card from '../../components/ui/Card.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { formatDate, formatPrice } from '../../lib/utils.js'
import { useOrdersStore } from '../../stores/useOrdersStore.js'

export default function OrdersPage() {
  const allOrders = useOrdersStore((state) => state.items)
  const orders = allOrders.filter((order) => order.userId === '1')
  return (
    <div>
      <h1 className="text-5xl">Order History</h1>
      <Card className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-[var(--text-3)]"><tr><th className="py-3">Order ID</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-[var(--border)]">
                <td className="py-3 font-mono text-xs">{order.id}</td>
                <td>{order.items.map((item) => item.title).join(', ')}</td>
                <td>{formatPrice(order.total)}</td>
                <td><StatusBadge status={order.status} /></td>
                <td>{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!orders.length && <p className="py-8 text-center text-[var(--text-2)]">No orders yet.</p>}
      </Card>
    </div>
  )
}
