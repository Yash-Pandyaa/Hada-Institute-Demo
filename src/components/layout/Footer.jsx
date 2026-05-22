import { Link } from 'react-router-dom'
import { BookOpen, Globe, Mail, MapPin, Phone, Share2, Video } from 'lucide-react'
import { useSubjectsStore } from '../../stores/useSubjectsStore.js'

export default function Footer() {
  const subjects = useSubjectsStore((state) => state.items)
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-2)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--gold-subtle)] text-[var(--gold-light)]"><BookOpen /></span>
            <span className="font-display text-xl font-semibold">Hada Institute</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--text-2)]">Premium digital study notes for board exams, JEE, NEET, and UPSC preparation.</p>
          <div className="mt-5 flex gap-3 text-[var(--gold-light)]">
            <Globe size={18} />
            <Share2 size={18} />
            <Video size={18} />
          </div>
        </div>
        <div>
          <h3 className="text-lg">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-sm text-[var(--text-2)]">
            {['Marketplace', 'Categories', 'Blog', 'FAQ', 'About', 'Contact'].map((label) => (
              <Link key={label} to={label === 'FAQ' ? '/faq' : `/${label.toLowerCase()}`}>{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg">Popular Subjects</h3>
          <div className="mt-4 grid gap-2 text-sm text-[var(--text-2)]">
            {subjects.slice(0, 6).map((subject) => <Link key={subject.id} to={`/categories?subject=${subject.slug}`}>{subject.name}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="text-lg">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-[var(--text-2)]">
            <span className="flex gap-2"><MapPin size={16} />Indore, Madhya Pradesh</span>
            <span className="flex gap-2"><Phone size={16} />+91 98765 43210</span>
            <span className="flex gap-2"><Mail size={16} />hello@hadainstitute.in</span>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-4 py-5 text-center text-sm text-[var(--text-3)]">
        <span>Copyright 2026 Hada Institute.</span>
        <span className="mx-2">|</span>
        <Link to="/privacy">Privacy</Link>
        <span className="mx-2">|</span>
        <Link to="/terms">Terms</Link>
      </div>
    </footer>
  )
}
