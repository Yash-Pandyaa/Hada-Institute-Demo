import { useState } from 'react'
import Button from '../../components/ui/Button.jsx'
import CrudModal from '../../components/ui/CrudModal.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { formatDate } from '../../lib/utils.js'
import { useMessagesStore } from '../../stores/useMessagesStore.js'

export default function AdminMessagesPage() {
  const { items, markRead, markUnread } = useMessagesStore()
  const [selected, setSelected] = useState(null)
  return (
    <div>
      <h1 className="mb-6 text-4xl">Contact Messages</h1>
      <DataTable
        columns={[
          { key: 'name', label: 'Name', accessor: 'name', sortable: true },
          { key: 'email', label: 'Email', accessor: 'email' },
          { key: 'phone', label: 'Phone', accessor: 'phone' },
          { key: 'preview', label: 'Preview', render: (row) => row.message.slice(0, 70) },
          { key: 'read', label: 'Read?', render: (row) => <StatusBadge status={row.isRead ? 'Read' : 'Unread'} /> },
          { key: 'date', label: 'Date', render: (row) => formatDate(row.createdAt) },
        ]}
        data={items}
        onEdit={(row) => setSelected(row)}
      />
      <CrudModal title={selected?.name || 'Message'} isOpen={Boolean(selected)} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <p className="text-sm text-[var(--text-2)]">{selected.email} - {selected.phone}</p>
            <p className="mt-5 rounded-md bg-[var(--surface-2)] p-4 leading-7">{selected.message}</p>
            <div className="mt-5 flex gap-3">
              <Button onClick={() => { markRead(selected.id); setSelected({ ...selected, isRead: true }) }}>Mark as Read</Button>
              <Button variant="outline" onClick={() => { markUnread(selected.id); setSelected({ ...selected, isRead: false }) }}>Mark as Unread</Button>
            </div>
          </div>
        )}
      </CrudModal>
    </div>
  )
}
