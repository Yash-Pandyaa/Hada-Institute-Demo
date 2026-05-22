import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, Save, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Select from '../../components/ui/Select.jsx'
import { slugify } from '../../lib/utils.js'
import { useCategoriesStore } from '../../stores/useCategoriesStore.js'
import { useProductsStore } from '../../stores/useProductsStore.js'
import { useSubjectsStore } from '../../stores/useSubjectsStore.js'

const blank = {
  title: '',
  slug: '',
  description: '',
  price: 199,
  discountedPrice: '',
  subjectId: 'physics',
  categoryId: 'class-12',
  coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
  fileUrl: '#',
  totalPages: 100,
  language: 'English',
  highlights: ['Chapter-wise summary'],
  isFeatured: false,
  isPublished: true,
  rating: 4.5,
  reviewCount: 0,
}

export default function AdminProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, add, update } = useProductsStore()
  const subjects = useSubjectsStore((state) => state.items)
  const categories = useCategoriesStore((state) => state.items)
  const existing = id ? items.find((item) => item.id === id) : null
  const [form, setForm] = useState(existing || blank)

  useEffect(() => {
    document.title = id ? 'Edit Product | Hada Admin' : 'New Product | Hada Admin'
  }, [id])

  const change = (field, value) => {
    if (field === 'title') setForm({ ...form, title: value, slug: slugify(value) })
    else setForm({ ...form, [field]: value })
  }

  const save = (event) => {
    event.preventDefault()
    const subject = subjects.find((item) => item.id === form.subjectId) || subjects[0]
    const category = categories.find((item) => item.id === form.categoryId) || categories[0]
    const payload = {
      ...form,
      price: Number(form.price),
      discountedPrice: form.discountedPrice ? Number(form.discountedPrice) : null,
      totalPages: Number(form.totalPages),
      subject: { id: subject.id, name: subject.name },
      category: { id: category.id, name: category.name },
      createdAt: form.createdAt || new Date().toISOString().slice(0, 10),
    }
    if (id) update(id, payload)
    else add(payload)
    navigate('/admin/products')
  }

  const updateHighlight = (index, value) => {
    setForm({ ...form, highlights: form.highlights.map((item, itemIndex) => (itemIndex === index ? value : item)) })
  }

  return (
    <form onSubmit={save}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-4xl">{id ? 'Edit Product' : 'New Product'}</h1>
        <Button type="submit"><Save size={17} />Save Product</Button>
      </div>
      <Card className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Title" value={form.title} onChange={(event) => change('title', event.target.value)} required />
          <Input label="Slug" value={form.slug} onChange={(event) => change('slug', event.target.value)} required />
        </div>
        <Input label="Description" textarea value={form.description} onChange={(event) => change('description', event.target.value)} />
        <div className="grid gap-5 md:grid-cols-2">
          <Select label="Subject" value={form.subjectId} onValueChange={(value) => change('subjectId', value)} options={subjects.map((item) => ({ value: item.id, label: item.name }))} />
          <Select label="Category" value={form.categoryId} onValueChange={(value) => change('categoryId', value)} options={categories.map((item) => ({ value: item.id, label: item.name }))} />
          <Input label="Price" type="number" value={form.price} onChange={(event) => change('price', event.target.value)} />
          <Input label="Discounted Price" type="number" value={form.discountedPrice || ''} onChange={(event) => change('discountedPrice', event.target.value)} />
          <Input label="Cover Image URL" value={form.coverImage} onChange={(event) => change('coverImage', event.target.value)} />
          <Input label="File URL" value={form.fileUrl} onChange={(event) => change('fileUrl', event.target.value)} />
          <Input label="Total Pages" type="number" value={form.totalPages} onChange={(event) => change('totalPages', event.target.value)} />
          <Input label="Language" value={form.language} onChange={(event) => change('language', event.target.value)} />
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl">Highlights</h2>
            <Button variant="outline" size="sm" onClick={() => setForm({ ...form, highlights: [...form.highlights, ''] })}><Plus size={15} />Add</Button>
          </div>
          <div className="grid gap-3">
            {form.highlights.map((highlight, index) => (
              <div key={`${highlight}-${index}`} className="flex gap-2">
                <Input value={highlight} onChange={(event) => updateHighlight(index, event.target.value)} />
                <Button variant="danger" onClick={() => setForm({ ...form, highlights: form.highlights.filter((_, itemIndex) => itemIndex !== index) })}><Trash2 size={15} /></Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-[var(--text-2)]"><input type="checkbox" checked={form.isFeatured} onChange={(event) => change('isFeatured', event.target.checked)} />Featured</label>
          <label className="flex items-center gap-2 text-sm text-[var(--text-2)]"><input type="checkbox" checked={form.isPublished} onChange={(event) => change('isPublished', event.target.checked)} />Published</label>
        </div>
      </Card>
    </form>
  )
}
