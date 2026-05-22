import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Atom, BookOpen, Calculator, FlaskConical, Landmark, Map } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import ProductCard from '../components/ui/ProductCard.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import StaggerReveal from '../components/animations/StaggerReveal.jsx'
import { useSubjectsStore } from '../stores/useSubjectsStore.js'
import { useProductsStore } from '../stores/useProductsStore.js'

const iconMap = { Atom, FlaskConical, Calculator, BookOpen, Landmark, Map }

export default function CategoriesPage() {
  const subjects = useSubjectsStore((state) => state.items)
  const allProducts = useProductsStore((state) => state.items)
  const products = allProducts.filter((item) => item.isPublished)
  const [searchParams] = useSearchParams()
  const selectedSlug = searchParams.get('subject')
  const selectedSubject = subjects.find((subject) => subject.slug === selectedSlug)
  const filtered = selectedSubject ? products.filter((product) => product.subjectId === selectedSubject.id) : products

  useEffect(() => {
    document.title = 'Subjects and Categories | Hada Institute'
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <SectionHeader title="Browse by Subject" subtitle="Choose a subject and jump into the most relevant notes" />
      <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => {
          const Icon = iconMap[subject.icon] || BookOpen
          const active = selectedSubject?.id === subject.id
          return (
            <Link key={subject.id} to={`/categories?subject=${subject.slug}`}>
              <Card className={`h-full ${active ? 'border-[var(--gold)] shadow-[0_0_30px_var(--gold-glow)]' : ''}`}>
                <Icon className="text-[var(--gold-light)]" size={32} />
                <h3 className="mt-4 text-2xl">{subject.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-2)]">{subject.description}</p>
                <p className="mt-4 text-sm text-[var(--gold-light)]">{subject.productCount} notes available</p>
              </Card>
            </Link>
          )
        })}
      </StaggerReveal>
      <section className="mt-14">
        <h2 className="mb-6 text-3xl">{selectedSubject ? `${selectedSubject.name} Notes` : 'All Notes'}</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  )
}
