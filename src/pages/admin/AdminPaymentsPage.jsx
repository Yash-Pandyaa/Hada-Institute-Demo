import DataTable from '../../components/ui/DataTable.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { formatDate, formatPrice } from '../../lib/utils.js'
import { useOrdersStore } from '../../stores/useOrdersStore.js'

export default function AdminPaymentsPage() {
  const orders = useOrdersStore((state) => state.items)
  return (
    <div>
      <h1 className="mb-6 text-4xl">Payments</h1>
      <DataTable
        columns={[
          { key: 'id', label: 'Payment Ref', accessor: 'id', sortable: true },
          { key: 'amount', label: 'Amount', render: (row) => formatPrice(row.total) },
          { key: 'method', label: 'Payment Method', render: () => 'Razorpay Demo' },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          { key: 'date', label: 'Date', render: (row) => formatDate(row.createdAt) },
        ]}
        data={orders}
      />
    </div>
  )
}
