import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Slider from '@radix-ui/react-slider'
import { AnimatePresence, motion } from 'framer-motion'
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import Button from '../components/ui/Button.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import { useProductsStore } from '../stores/useProductsStore.js'
import { useSubjectsStore } from '../stores/useSubjectsStore.js'
import { useCategoriesStore } from '../stores/useCategoriesStore.js'

function FilterPanel({ subjects, categories, selectedSubjects, selectedCategories, setSelectedSubjects, setSelectedCategories, price, setPrice }) {
  const toggle = (value, list, setter) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
  }
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-lg"><Filter size={18} />Subjects</h3>
        <div className="grid gap-2">
          {subjects.map((subject) => (
            <label key={subject.id} className="flex items-center gap-3 text-sm text-[var(--text-2)]">
              <input type="checkbox" checked={selectedSubjects.includes(subject.id)} onChange={() => toggle(subject.id, selectedSubjects, setSelectedSubjects)} />
              {subject.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-lg">Categories</h3>
        <div className="grid gap-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-3 text-sm text-[var(--text-2)]">
              <input type="checkbox" checked={selectedCategories.includes(category.id)} onChange={() => toggle(category.id, selectedCategories, setSelectedCategories)} />
              {category.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg">Price Range</h3>
        <Slider.Root value={price} min={0} max={500} step={10} onValueChange={setPrice} className="relative flex h-5 items-center">
          <Slider.Track className="relative h-1 grow rounded-full bg-[var(--border-light)]">
            <Slider.Range className="absolute h-full rounded-full bg-[var(--gold)]" />
          </Slider.Track>
          <Slider.Thumb className="block h-5 w-5 rounded-full border border-[var(--gold)] bg-[var(--surface)] outline-none" />
        </Slider.Root>
        <div className="mt-3 flex justify-between text-sm text-[var(--text-2)]">
          <span>₹0</span>
          <span>Up to ₹{price[0]}</span>
        </div>
      </div>
    </div>
  )
}

export default function MarketplacePage() {
  const allProducts = useProductsStore((state) => state.items)
  const subjects = useSubjectsStore((state) => state.items)
  const categories = useCategoriesStore((state) => state.items)
  const [search, setSearch] = useState('')
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [price, setPrice] = useState([500])
  const [sort, setSort] = useState('newest')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    document.title = 'Marketplace | Hada Institute'
  }, [])

  const products = allProducts.filter((item) => item.isPublished)
  let filtered = products.filter((product) => (
    product.title.toLowerCase().includes(search.toLowerCase())
    && (!selectedSubjects.length || selectedSubjects.includes(product.subjectId))
    && (!selectedCategories.length || selectedCategories.includes(product.categoryId))
    && (product.discountedPrice || product.price) <= price[0]
  ))

  filtered = [...filtered].sort((a, b) => {
    const left = a.discountedPrice || a.price
    const right = b.discountedPrice || b.price
    if (sort === 'price-low') return left - right
    if (sort === 'price-high') return right - left
    if (sort === 'popular') return b.reviewCount - a.reviewCount
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  const panel = (
    <FilterPanel
      subjects={subjects}
      categories={categories}
      selectedSubjects={selectedSubjects}
      selectedCategories={selectedCategories}
      setSelectedSubjects={setSelectedSubjects}
      setSelectedCategories={setSelectedCategories}
      price={price}
      setPrice={setPrice}
    />
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <SectionHeader title="Notes Marketplace" subtitle="Search, filter, and build your exam-ready digital library" />
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden h-max rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 lg:block">
          {panel}
        </aside>
        <section>
          <div className="mb-6 grid gap-4 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]" size={18} />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search notes by title..." className="pl-10" />
            </div>
            <Select
              value={sort}
              onValueChange={setSort}
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'price-low', label: 'Price Low-High' },
                { value: 'price-high', label: 'Price High-Low' },
                { value: 'popular', label: 'Most Popular' },
              ]}
            />
            <Button variant="outline" className="md:hidden" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={17} />Filters</Button>
          </div>
          <p className="mb-5 text-sm text-[var(--text-2)]">Showing {filtered.length} of {products.length} notes</p>
          <AnimatePresence mode="popLayout">
            {filtered.length ? (
              <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
              </motion.div>
            ) : (
              <EmptyState title="No notes match your filters" description="Try a broader subject, higher price range, or a shorter search term." />
            )}
          </AnimatePresence>
        </section>
      </div>

      <Dialog.Root open={filtersOpen} onOpenChange={setFiltersOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70" />
          <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 max-h-[82vh] overflow-y-auto rounded-t-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="mb-5 flex items-center justify-between">
              <Dialog.Title className="text-2xl">Filters</Dialog.Title>
              <Dialog.Close><X /></Dialog.Close>
            </div>
            {panel}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
