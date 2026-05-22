import DataTable from '../../components/ui/DataTable.jsx'
import { formatDate } from '../../lib/utils.js'
import { seedUsers } from '../../data/users.js'
import { useOrdersStore } from '../../stores/useOrdersStore.js'
import { useUserStore } from '../../stores/useUserStore.js'

export default function AdminUsersPage() {
  const orders = useOrdersStore((state) => state.items)
  const profile = useUserStore((state) => state.profile)
  const purchasedIds = useUserStore((state) => state.purchasedIds)
  const users = [{ ...seedUsers[0], ...profile, purchasedProductIds: purchasedIds }]
  return (
    <div>
      <h1 className="mb-6 text-4xl">Users</h1>
      <DataTable
        columns={[
          { key: 'name', label: 'Name', accessor: 'name', sortable: true },
          { key: 'email', label: 'Email', accessor: 'email' },
          { key: 'orders', label: 'Orders Count', render: () => orders.length },
          { key: 'library', label: 'Library Count', render: (row) => row.purchasedProductIds.length },
          { key: 'joined', label: 'Joined', render: (row) => formatDate(row.joinedAt) },
        ]}
        data={users}
      />
    </div>
  )
}
