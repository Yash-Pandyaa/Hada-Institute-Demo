import { useState } from 'react'
import { Download } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import AdminToast from '../../components/ui/AdminToast.jsx'
import { useProductsStore } from '../../stores/useProductsStore.js'
import { useUserStore } from '../../stores/useUserStore.js'

export default function LibraryPage() {
  const [open, setOpen] = useState(false)
  const purchasedIds = useUserStore((state) => state.purchasedIds)
  const allProducts = useProductsStore((state) => state.items)
  const products = allProducts.filter((product) => purchasedIds.includes(product.id))

  return (
    <div>
      <h1 className="text-5xl">My Library</h1>
      <p className="mt-3 text-[var(--text-2)]">Purchased notes are ready for mock download.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id} className="grid gap-4 sm:grid-cols-[120px_1fr]">
            <img src={product.coverImage} alt={product.title} className="h-28 w-full rounded-md object-cover" />
            <div>
              <h2 className="text-2xl">{product.title}</h2>
              <p className="mt-1 text-sm text-[var(--text-2)]">{product.subject.name} - {product.totalPages} pages</p>
              <Button className="mt-4" onClick={() => setOpen(true)}><Download size={16} />Download</Button>
            </div>
          </Card>
        ))}
      </div>
      <AdminToast open={open} onOpenChange={setOpen} title="Demo download" description="In production, your file would download here." />
    </div>
  )
}
