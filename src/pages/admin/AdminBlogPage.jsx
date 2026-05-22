import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'
import CrudModal from '../../components/ui/CrudModal.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import Input from '../../components/ui/Input.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { formatDate, slugify } from '../../lib/utils.js'
import { useBlogStore } from '../../stores/useBlogStore.js'

const blank = { title: '', slug: '', excerpt: '', content: '', coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&q=80', author: 'Hada Faculty Team', category: 'Study Skills', isPublished: true }

export default function AdminBlogPage() {
  const { items, add, update, remove } = useBlogStore()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(blank)
  const [editing, setEditing] = useState(null)
  const [target, setTarget] = useState(null)

  const save = (event) => {
    event.preventDefault()
    const payload = { ...form, content: String(form.content).split('\n').filter(Boolean), publishedAt: form.publishedAt || new Date().toISOString() }
    if (editing) update(editing.id, payload)
    else add(payload)
    setOpen(false)
    setEditing(null)
    setForm(blank)
  }

  const edit = (row) => {
    setEditing(row)
    setForm({ ...row, content: Array.isArray(row.content) ? row.content.join('\n') : row.content })
    setOpen(true)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl">Blog Posts</h1>
        <Button onClick={() => { setEditing(null); setForm(blank); setOpen(true) }}><Plus size={17} />Add Blog Post</Button>
      </div>
      <DataTable
        columns={[
          { key: 'title', label: 'Title', accessor: 'title', sortable: true },
          { key: 'published', label: 'Published', render: (row) => <StatusBadge status={row.isPublished ? 'Published' : 'Draft'} /> },
          { key: 'created', label: 'Created At', render: (row) => formatDate(row.publishedAt) },
        ]}
        data={items}
        onEdit={edit}
        onDelete={(row) => setTarget(row)}
      />
      <CrudModal title={editing ? 'Edit Blog Post' : 'Add Blog Post'} isOpen={open} onClose={() => setOpen(false)}>
        <form onSubmit={save} className="grid gap-4">
          <Input label="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value, slug: slugify(event.target.value) })} required />
          <Input label="Slug" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} />
          <Input label="Excerpt" textarea value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} />
          <Input label="Content" textarea value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Cover Image URL" value={form.coverImage} onChange={(event) => setForm({ ...form, coverImage: event.target.value })} />
            <Input label="Author" value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} />
          </div>
          <Input label="Category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
          <label className="flex items-center gap-2 text-sm text-[var(--text-2)]"><input type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} />Published</label>
          <Button type="submit">Save Post</Button>
        </form>
      </CrudModal>
      <ConfirmDialog isOpen={Boolean(target)} onClose={() => setTarget(null)} title="Delete post" description={`Delete ${target?.title}?`} onConfirm={() => { remove(target.id); setTarget(null) }} />
    </div>
  )
}
