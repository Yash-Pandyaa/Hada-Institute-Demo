import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, ToggleLeft, ToggleRight } from 'lucide-react'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'
import DataTable from '../../components/ui/DataTable.jsx'
import PriceDisplay from '../../components/ui/PriceDisplay.jsx'
import { useProductsStore } from '../../stores/useProductsStore.js'

export default function AdminProductsPage() {
  const navigate = useNavigate()
  const { items, remove, togglePublished } = useProductsStore()
  const [target, setTarget] = useState(null)

  const columns = [
    { key: 'cover', label: 'Cover', render: (row) => <img src={row.coverImage} alt={row.title} className="h-12 w-16 rounded object-cover" /> },
    { key: 'title', label: 'Title', accessor: 'title', sortable: true },
    { key: 'subject', label: 'Subject', render: (row) => row.subject.name, sortable: true, sortValue: (row) => row.subject.name },
    { key: 'category', label: 'Category', render: (row) => row.category.name },
    { key: 'price', label: 'Price', render: (row) => <PriceDisplay price={row.price} discountedPrice={row.discountedPrice} /> },
    { key: 'published', label: 'Published', render: (row) => <button type="button" onClick={() => togglePublished(row.id)} className="text-[var(--gold-light)]">{row.isPublished ? <ToggleRight /> : <ToggleLeft />}</button> },
    { key: 'featured', label: 'Featured', render: (row) => row.isFeatured ? <Badge>Featured</Badge> : <Badge variant="muted">No</Badge> },
  ]

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl">Products</h1>
        <Link to="/admin/products/new"><Button><Plus size={17} />Add Product</Button></Link>
      </div>
      <DataTable columns={columns} data={items} onEdit={(row) => navigate(`/admin/products/${row.id}`)} onDelete={(row) => setTarget(row)} />
      <ConfirmDialog isOpen={Boolean(target)} onClose={() => setTarget(null)} title="Delete product" description={`Delete ${target?.title}?`} onConfirm={() => { remove(target.id); setTarget(null) }} />
    </div>
  )
}
