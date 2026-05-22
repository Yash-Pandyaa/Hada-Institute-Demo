import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'
import CrudModal from '../../components/ui/CrudModal.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import Input from '../../components/ui/Input.jsx'
import { useBannersStore } from '../../stores/useBannersStore.js'

const blank = { title: '', subtitle: '', ctaText: 'Browse Notes', ctaLink: '/marketplace', bgGradient: 'linear-gradient(135deg, #18182A, #3a2d12)', isActive: true }

export default function AdminBannersPage() {
  const { items, add, update, remove, toggle } = useBannersStore()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(blank)
  const [editing, setEditing] = useState(null)
  const [target, setTarget] = useState(null)

  const save = (event) => {
    event.preventDefault()
    if (editing) update(editing.id, form)
    else add(form)
    setOpen(false)
    setEditing(null)
    setForm(blank)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl">Banners</h1>
        <Button onClick={() => { setForm(blank); setEditing(null); setOpen(true) }}><Plus size={17} />Add Banner</Button>
      </div>
      <DataTable
        columns={[
          { key: 'title', label: 'Title', accessor: 'title', sortable: true },
          { key: 'subtitle', label: 'Subtitle', accessor: 'subtitle' },
          { key: 'ctaText', label: 'CTA', accessor: 'ctaText' },
          { key: 'active', label: 'Active', render: (row) => <button type="button" onClick={() => toggle(row.id)} className="text-[var(--gold-light)]">{row.isActive ? 'Active' : 'Paused'}</button> },
        ]}
        data={items}
        onEdit={(row) => { setEditing(row); setForm(row); setOpen(true) }}
        onDelete={(row) => setTarget(row)}
      />
      <CrudModal title={editing ? 'Edit Banner' : 'Add Banner'} isOpen={open} onClose={() => setOpen(false)}>
        <form onSubmit={save} className="grid gap-4">
          <Input label="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
          <Input label="Subtitle" value={form.subtitle} onChange={(event) => setForm({ ...form, subtitle: event.target.value })} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="CTA Text" value={form.ctaText} onChange={(event) => setForm({ ...form, ctaText: event.target.value })} />
            <Input label="CTA Link" value={form.ctaLink} onChange={(event) => setForm({ ...form, ctaLink: event.target.value })} />
          </div>
          <Input label="BG Gradient" value={form.bgGradient} onChange={(event) => setForm({ ...form, bgGradient: event.target.value })} />
          <label className="flex items-center gap-2 text-sm text-[var(--text-2)]"><input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} />Active</label>
          <div className="rounded-lg p-5" style={{ background: form.bgGradient }}>
            <h3 className="text-2xl">{form.title || 'Banner Preview'}</h3>
            <p className="text-[var(--text-2)]">{form.subtitle || 'Subtitle preview'}</p>
          </div>
          <Button type="submit">Save Banner</Button>
        </form>
      </CrudModal>
      <ConfirmDialog isOpen={Boolean(target)} onClose={() => setTarget(null)} title="Delete banner" description={`Delete ${target?.title}?`} onConfirm={() => { remove(target.id); setTarget(null) }} />
    </div>
  )
}
