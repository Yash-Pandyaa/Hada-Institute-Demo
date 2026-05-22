import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import { formatDate } from '../lib/utils.js'
import { useBlogStore } from '../stores/useBlogStore.js'

export default function BlogPage() {
  const allPosts = useBlogStore((state) => state.items)
  const posts = allPosts.filter((post) => post.isPublished)
  const [category, setCategory] = useState('All')
  const categories = ['All', ...Array.from(new Set(posts.map((post) => post.category)))]
  const filtered = category === 'All' ? posts : posts.filter((post) => post.category === category)

  useEffect(() => {
    document.title = 'Blog | Hada Institute'
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <SectionHeader title="Study Blog" subtitle="Exam strategy, revision systems, and subject guidance" />
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((item) => (
          <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm ${category === item ? 'border-[var(--gold)] bg-[var(--gold-subtle)] text-[var(--gold-light)]' : 'border-[var(--border)] text-[var(--text-2)]'}`}>{item}</button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`}>
            <Card className="h-full overflow-hidden p-0">
              <img src={post.coverImage} alt={post.title} className="h-52 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-[var(--text-3)]">
                  <span>{post.category}</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <h2 className="mt-3 text-2xl leading-tight">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--text-2)]">{post.excerpt}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
