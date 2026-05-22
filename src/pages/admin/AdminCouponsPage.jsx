import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'
import CrudModal from '../../components/ui/CrudModal.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import Input from '../../components/ui/Input.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { useCouponsStore } from '../../stores/useCouponsStore.js'

const blank = { code: '', discountPercent: 10, maxUses: 100, usedCount: 0, expiresAt: '2026-12-31', isActive: true }

export default function AdminCouponsPage() {
  const { items, add, update, remove } = useCouponsStore()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(blank)
  const [editing, setEditing] = useState(null)
  const [target, setTarget] = useState(null)
  const [error, setError] = useState('')

  const save = (event) => {
    event.preventDefault()
    if (form.code !== form.code.toUpperCase() || Number(form.discountPercent) < 1 || Number(form.discountPercent) > 100) {
      setError('Code must be uppercase and discount must be between 1 and 100.')
      return
    }
    const payload = { ...form, discountPercent: Number(form.discountPercent), maxUses: Number(form.maxUses), usedCount: Number(form.usedCount) }
    if (editing) update(editing.id, payload)
    else add(payload)
    setOpen(false)
    setEditing(null)
    setForm(blank)
    setError('')
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl">Coupons</h1>
        <Button onClick={() => { setEditing(null); setForm(blank); setOpen(true) }}><Plus size={17} />Add Coupon</Button>
      </div>
      <DataTable
        columns={[
          { key: 'code', label: 'Code', accessor: 'code', sortable: true },
          { key: 'discount', label: 'Discount %', accessor: 'discountPercent' },
          { key: 'active', label: 'Is Active', render: (row) => <StatusBadge status={row.isActive ? 'Active' : 'Inactive'} /> },
        ]}
        data={items}
        onEdit={(row) => { setEditing(row); setForm(row); setOpen(true) }}
        onDelete={(row) => setTarget(row)}
      />
      <CrudModal title={editing ? 'Edit Coupon' : 'Add Coupon'} isOpen={open} onClose={() => setOpen(false)}>
        <form onSubmit={save} className="grid gap-4">
          <Input label="Code" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value.toUpperCase() })} error={error} />
          <Input label="Discount %" type="number" value={form.discountPercent} onChange={(event) => setForm({ ...form, discountPercent: event.target.value })} />
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="Max Uses" type="number" value={form.maxUses} onChange={(event) => setForm({ ...form, maxUses: event.target.value })} />
            <Input label="Used Count" type="number" value={form.usedCount} onChange={(event) => setForm({ ...form, usedCount: event.target.value })} />
            <Input label="Expires At" value={form.expiresAt} onChange={(event) => setForm({ ...form, expiresAt: event.target.value })} />
          </div>
          <label className="flex items-center gap-2 text-sm text-[var(--text-2)]"><input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} />Active</label>
          <Button type="submit">Save Coupon</Button>
        </form>
      </CrudModal>
      <ConfirmDialog isOpen={Boolean(target)} onClose={() => setTarget(null)} title="Delete coupon" description={`Delete ${target?.code}?`} onConfirm={() => { remove(target.id); setTarget(null) }} />
    </div>
  )
}
