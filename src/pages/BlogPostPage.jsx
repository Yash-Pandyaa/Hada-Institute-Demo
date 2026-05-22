import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { formatDate } from '../lib/utils.js'
import { useBlogStore } from '../stores/useBlogStore.js'

export default function BlogPostPage() {
  const { slug } = useParams()
  const allPosts = useBlogStore((state) => state.items)
  const posts = allPosts.filter((post) => post.isPublished)
  const post = posts.find((item) => item.slug === slug)
  const related = posts.filter((item) => item.slug !== slug).slice(0, 3)

  useEffect(() => {
    document.title = post ? `${post.title} | Hada Institute` : 'Post Not Found | Hada Institute'
  }, [post])

  if (!post) return <div className="mx-auto max-w-5xl px-4 py-16"><EmptyState title="Post not found" description="This article may have been moved or unpublished." /></div>

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <img src={post.coverImage} alt={post.title} className="h-[420px] w-full rounded-lg object-cover" />
      <div className="mx-auto mt-8 max-w-3xl">
        <p className="text-sm uppercase tracking-wide text-[var(--gold-light)]">{post.category} - {formatDate(post.publishedAt)} - {post.author}</p>
        <h1 className="mt-3 text-5xl leading-tight">{post.title}</h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-[var(--text-2)]">
          {post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
      <section className="mt-14">
        <h2 className="mb-5 text-3xl">Related Posts</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <Link key={item.id} to={`/blog/${item.slug}`}>
              <Card className="h-full">
                <p className="text-xs text-[var(--gold-light)]">{item.category}</p>
                <h3 className="mt-2 text-xl">{item.title}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
