import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'
import CrudModal from '../../components/ui/CrudModal.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import Input from '../../components/ui/Input.jsx'
import StarRating from '../../components/ui/StarRating.jsx'
import { useTestimonialsStore } from '../../stores/useTestimonialsStore.js'

const blank = { studentName: '', course: '', rating: 5, text: '', avatarInitial: 'S' }

export default function AdminTestimonialsPage() {
  const { items, add, update, remove } = useTestimonialsStore()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(blank)
  const [editing, setEditing] = useState(null)
  const [target, setTarget] = useState(null)

  const save = (event) => {
    event.preventDefault()
    const payload = { ...form, rating: Number(form.rating), avatarInitial: form.avatarInitial || form.studentName.slice(0, 1).toUpperCase() }
    if (editing) update(editing.id, payload)
    else add(payload)
    setOpen(false)
    setEditing(null)
    setForm(blank)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl">Testimonials</h1>
        <Button onClick={() => { setEditing(null); setForm(blank); setOpen(true) }}><Plus size={17} />Add Testimonial</Button>
      </div>
      <DataTable
        columns={[
          { key: 'name', label: 'Name', accessor: 'studentName', sortable: true },
          { key: 'course', label: 'Course', accessor: 'course' },
          { key: 'rating', label: 'Rating', render: (row) => <StarRating rating={row.rating} /> },
        ]}
        data={items}
        onEdit={(row) => { setEditing(row); setForm(row); setOpen(true) }}
        onDelete={(row) => setTarget(row)}
      />
      <CrudModal title={editing ? 'Edit Testimonial' : 'Add Testimonial'} isOpen={open} onClose={() => setOpen(false)}>
        <form onSubmit={save} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Student Name" value={form.studentName} onChange={(event) => setForm({ ...form, studentName: event.target.value })} required />
            <Input label="Course" value={form.course} onChange={(event) => setForm({ ...form, course: event.target.value })} />
            <Input label="Rating" type="number" min="1" max="5" value={form.rating} onChange={(event) => setForm({ ...form, rating: event.target.value })} />
            <Input label="Avatar Initial" value={form.avatarInitial} onChange={(event) => setForm({ ...form, avatarInitial: event.target.value.toUpperCase().slice(0, 1) })} />
          </div>
          <Input label="Testimonial Text" textarea value={form.text} onChange={(event) => setForm({ ...form, text: event.target.value })} />
          <Button type="submit">Save Testimonial</Button>
        </form>
      </CrudModal>
      <ConfirmDialog isOpen={Boolean(target)} onClose={() => setTarget(null)} title="Delete testimonial" description={`Delete testimonial from ${target?.studentName}?`} onConfirm={() => { remove(target.id); setTarget(null) }} />
    </div>
  )
}
