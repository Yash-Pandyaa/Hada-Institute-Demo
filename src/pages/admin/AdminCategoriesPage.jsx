import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import Input from '../../components/ui/Input.jsx'
import { slugify } from '../../lib/utils.js'
import { useCategoriesStore } from '../../stores/useCategoriesStore.js'

export default function AdminCategoriesPage() {
  const { items, add, update, remove } = useCategoriesStore()
  const [form, setForm] = useState({ name: '', description: '' })
  const [editing, setEditing] = useState(null)
  const [target, setTarget] = useState(null)

  const submit = (event) => {
    event.preventDefault()
    const payload = { ...form, slug: slugify(form.name), id: editing?.id || slugify(form.name) }
    if (editing) update(editing.id, payload)
    else add(payload)
    setForm({ name: '', description: '' })
    setEditing(null)
  }

  return (
    <div>
      <h1 className="text-4xl">Categories</h1>
      <Card className="my-6">
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <Input label="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <Input label="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          <Button type="submit" className="self-end"><Plus size={16} />{editing ? 'Update' : 'Add'}</Button>
        </form>
      </Card>
      <DataTable
        columns={[
          { key: 'name', label: 'Name', accessor: 'name', sortable: true },
          { key: 'slug', label: 'Slug', accessor: 'slug' },
          { key: 'description', label: 'Description', accessor: 'description' },
        ]}
        data={items}
        onEdit={(row) => { setEditing(row); setForm(row) }}
        onDelete={(row) => setTarget(row)}
      />
      <ConfirmDialog isOpen={Boolean(target)} onClose={() => setTarget(null)} title="Delete category" description={`Delete ${target?.name}?`} onConfirm={() => { remove(target.id); setTarget(null) }} />
    </div>
  )
}
