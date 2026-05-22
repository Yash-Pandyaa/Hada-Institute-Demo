import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import Input from '../../components/ui/Input.jsx'
import { slugify } from '../../lib/utils.js'
import { useSubjectsStore } from '../../stores/useSubjectsStore.js'

export default function AdminSubjectsPage() {
  const { items, add, update, remove } = useSubjectsStore()
  const [form, setForm] = useState({ name: '', description: '', icon: 'BookOpen', productCount: 0 })
  const [editing, setEditing] = useState(null)
  const [target, setTarget] = useState(null)

  const submit = (event) => {
    event.preventDefault()
    const payload = { ...form, slug: slugify(form.name), id: editing?.id || slugify(form.name) }
    if (editing) update(editing.id, payload)
    else add(payload)
    setForm({ name: '', description: '', icon: 'BookOpen', productCount: 0 })
    setEditing(null)
  }

  return (
    <div>
      <h1 className="text-4xl">Subjects</h1>
      <Card className="my-6">
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-[1fr_1fr_120px_auto]">
          <Input label="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <Input label="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          <Input label="Count" type="number" value={form.productCount} onChange={(event) => setForm({ ...form, productCount: Number(event.target.value) })} />
          <Button type="submit" className="self-end"><Plus size={16} />{editing ? 'Update' : 'Add'}</Button>
        </form>
      </Card>
      <DataTable
        columns={[
          { key: 'name', label: 'Name', accessor: 'name', sortable: true },
          { key: 'slug', label: 'Slug', accessor: 'slug' },
          { key: 'productCount', label: 'Product Count', accessor: 'productCount' },
        ]}
        data={items}
        onEdit={(row) => { setEditing(row); setForm(row) }}
        onDelete={(row) => setTarget(row)}
      />
      <ConfirmDialog isOpen={Boolean(target)} onClose={() => setTarget(null)} title="Delete subject" description={`Delete ${target?.name}?`} onConfirm={() => { remove(target.id); setTarget(null) }} />
    </div>
  )
}
