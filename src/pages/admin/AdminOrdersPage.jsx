import DataTable from '../../components/ui/DataTable.jsx'
import Select from '../../components/ui/Select.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { formatDate, formatPrice } from '../../lib/utils.js'
import { useOrdersStore } from '../../stores/useOrdersStore.js'

export default function AdminOrdersPage() {
  const { items, updateStatus } = useOrdersStore()
  return (
    <div>
      <h1 className="mb-6 text-4xl">Orders</h1>
      <DataTable
        columns={[
          { key: 'id', label: 'Order ID', accessor: 'id', sortable: true },
          { key: 'customer', label: 'Customer', render: (row) => row.customer?.name || 'Demo Student' },
          { key: 'items', label: 'Items', render: (row) => row.items.map((item) => item.title).join(', ') },
          { key: 'total', label: 'Total', render: (row) => formatPrice(row.total) },
          { key: 'status', label: 'Status', render: (row) => <div className="flex items-center gap-2"><StatusBadge status={row.status} /><Select value={row.status} onValueChange={(value) => updateStatus(row.id, value)} options={[{ value: 'Pending', label: 'Pending' }, { value: 'Completed', label: 'Completed' }, { value: 'Refunded', label: 'Refunded' }]} /></div> },
          { key: 'date', label: 'Date', render: (row) => formatDate(row.createdAt) },
        ]}
        data={items}
      />
    </div>
  )
}
