import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Atom, BookOpen, Calculator, ChevronDown, ChevronLeft, ChevronRight, Download, FlaskConical, Landmark, Map, ShoppingCart, Sparkles, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import ProductCard from '../components/ui/ProductCard.jsx'
import Card from '../components/ui/Card.jsx'
import StarRating from '../components/ui/StarRating.jsx'
import CountUp from '../components/animations/CountUp.jsx'
import SplitTextReveal from '../components/animations/SplitTextReveal.jsx'
import StaggerReveal from '../components/animations/StaggerReveal.jsx'
import MagneticButton from '../components/animations/MagneticButton.jsx'
import { gsap } from '../lib/gsap.js'
import { useProductsStore } from '../stores/useProductsStore.js'
import { useSubjectsStore } from '../stores/useSubjectsStore.js'
import { useTestimonialsStore } from '../stores/useTestimonialsStore.js'
import { useBlogStore } from '../stores/useBlogStore.js'

const HeroCanvas = lazy(() => import('../components/three/HeroCanvas.jsx'))

const iconMap = { Atom, FlaskConical, Calculator, BookOpen, Landmark, Map }

export default function HomePage() {
  const allProducts = useProductsStore((state) => state.items)
  const subjects = useSubjectsStore((state) => state.items)
  const testimonials = useTestimonialsStore((state) => state.items)
  const allPosts = useBlogStore((state) => state.items)
  const products = allProducts.filter((item) => item.isFeatured && item.isPublished)
  const posts = allPosts.filter((post) => post.isPublished).slice(0, 3)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const lineRef = useRef(null)
  const testimonialRef = useRef(null)

  useEffect(() => {
    document.title = 'Hada Institute | Premium Study Notes'
    const tween = gsap.fromTo(lineRef.current, { drawSVG: '0%' }, {
      drawSVG: '100%',
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: lineRef.current, start: 'top 84%' },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((index) => (index + 1) % testimonials.length)
      if (testimonialRef.current) {
        gsap.fromTo(testimonialRef.current, { y: 18, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' })
      }
    }, 4000)
    return () => window.clearInterval(timer)
  }, [testimonials.length])

  const testimonial = testimonials[activeTestimonial] || testimonials[0]

  return (
    <div>
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[var(--bg)]" />}>
          <HeroCanvas />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[rgba(7,7,13,0.35)] to-[var(--bg)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:px-6">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold-dark)] bg-[var(--gold-subtle)] px-4 py-2 text-sm text-[var(--gold-light)]">
              <Sparkles size={16} />Digital notes built for exam momentum
            </div>
            <h1 className="text-5xl font-semibold leading-tight md:text-7xl">
              <SplitTextReveal type="words">Master Every Subject with Premium Study Notes</SplitTextReveal>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-2)] md:text-xl"
            >
              Browse educator-curated PDFs for CBSE boards, JEE, NEET, and UPSC. Add notes to cart, complete demo checkout, and keep everything in your library.
            </motion.p>
            <div className="mt-9 flex flex-wrap gap-4">
              <MagneticButton className="rounded-md border border-[var(--gold)] bg-[var(--gold)] px-7 py-4 font-semibold text-[#12100a] shadow-[0_0_35px_var(--gold-glow)]">
                <Link to="/marketplace">Browse Notes</Link>
              </MagneticButton>
              <MagneticButton className="rounded-md border border-[var(--gold-dark)] px-7 py-4 font-semibold text-[var(--gold-light)]">
                <Link to="/marketplace">Browse Free Samples</Link>
              </MagneticButton>
            </div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--gold-light)]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown />
        </motion.div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-5">
        <StaggerReveal className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 md:px-6 hide-scrollbar">
          {subjects.map((subject) => {
            const Icon = iconMap[subject.icon] || BookOpen
            return (
              <Link key={subject.id} to={`/categories?subject=${subject.slug}`} className="flex min-w-max items-center gap-3 rounded-full border border-[var(--border-light)] bg-[var(--surface-2)] px-5 py-3 text-sm transition hover:border-[var(--gold-dark)] hover:text-[var(--gold-light)]">
                <Icon size={18} />
                {subject.name}
                <span className="text-[var(--text-3)]">{subject.productCount} notes</span>
              </Link>
            )
          })}
        </StaggerReveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader title="Featured Notes" subtitle="Handpicked by our educators" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/marketplace" className="text-[var(--gold-light)]">View All Notes {'->'}</Link>
        </div>
      </section>

      <section className="bg-[var(--bg-2)] py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader title="How It Works" subtitle="A simple three-step flow from discovery to download" />
          <div className="relative">
            <svg className="pointer-events-none absolute left-0 top-12 hidden h-20 w-full md:block" viewBox="0 0 900 120" fill="none">
              <path ref={lineRef} d="M70 60 C250 10 330 110 450 60 C570 10 650 110 830 60" stroke="#D4A843" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <StaggerReveal className="grid gap-6 md:grid-cols-3">
              {[
                [BookOpen, 'Browse Notes', 'Filter by subject, category, price, and exam goal.'],
                [ShoppingCart, 'Add to Cart', 'Build a focused revision pack and apply demo coupons.'],
                [Download, 'Download Instantly', 'Your purchased notes appear in the mock library after checkout.'],
              ].map(([Icon, title, description], index) => (
                <Card key={title} className="relative text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)] font-bold text-[#12100a]">{index + 1}</div>
                  <Icon className="mx-auto text-[var(--gold-light)]" size={30} />
                  <h3 className="mt-4 text-2xl">{title}</h3>
                  <p className="mt-2 text-[var(--text-2)]">{description}</p>
                </Card>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-20 md:grid-cols-4 md:px-6">
        {[
          ['Students', 10000, '+'],
          ['Notes', 500, '+'],
          ['Subjects', 50, '+'],
          ['Rating', 4.8, '★'],
        ].map(([label, end, suffix]) => (
          <Card key={label} className="text-center">
            <p className="text-5xl font-bold text-[var(--gold-light)]"><CountUp end={end} suffix={suffix} decimals={label === 'Rating' ? 1 : 0} /></p>
            <p className="mt-2 text-[var(--text-2)]">{label}</p>
          </Card>
        ))}
      </section>

      <section className="bg-[var(--surface)] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <SectionHeader title="Student Wins" subtitle="Realistic stories from students using Hada notes" />
          {testimonial && (
            <Card className="min-h-72 p-8" ref={testimonialRef}>
              <div ref={testimonialRef}>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold)] text-2xl font-bold text-[#12100a]">{testimonial.avatarInitial}</div>
                <StarRating rating={testimonial.rating} className="justify-center" />
                <p className="mx-auto mt-5 max-w-2xl text-xl leading-8 text-[var(--text)]">"{testimonial.text}"</p>
                <h3 className="mt-5 text-2xl">{testimonial.studentName}</h3>
                <p className="text-[var(--text-2)]">{testimonial.course}</p>
              </div>
            </Card>
          )}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button type="button" className="rounded-full border border-[var(--border-light)] p-2" onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}><ChevronLeft size={18} /></button>
            {testimonials.map((item, index) => (
              <button key={item.id} type="button" className={`h-2 rounded-full transition-all ${index === activeTestimonial ? 'w-8 bg-[var(--gold)]' : 'w-2 bg-[var(--border-light)]'}`} onClick={() => setActiveTestimonial(index)} />
            ))}
            <button type="button" className="rounded-full border border-[var(--border-light)] p-2" onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}><ChevronRight size={18} /></button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader title="Latest Study Guides" subtitle="Revision strategy, exam craft, and notes workflows" />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden p-0">
              <img src={post.coverImage} alt={post.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <span className="text-xs uppercase tracking-wide text-[var(--gold-light)]">{post.category}</span>
                <h3 className="mt-2 text-2xl">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--text-2)]">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="mt-4 inline-block text-[var(--gold-light)]">Read More</Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 md:px-6">
        <div className="mx-auto max-w-7xl rounded-lg border border-[var(--gold-dark)] bg-[linear-gradient(135deg,rgba(212,168,67,0.12),rgba(18,18,30,0.95))] p-10 text-center md:p-16">
          <h2 className="gold-text text-5xl font-semibold">Start Learning Today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-2)]">Create a free account, collect your notes library, and make revision feel organised.</p>
          <Link to="/auth/sign-up" className="mt-8 inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-7 py-4 font-semibold text-[#12100a]"><UserPlus size={18} />Create Free Account</Link>
        </div>
      </section>
    </div>
  )
}
