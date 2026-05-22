import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { BookOpen, ClipboardList, User } from 'lucide-react'
import { useAuthStore } from '../stores/useAuthStore.js'

const links = [
  ['Library', '/account/library', BookOpen],
  ['Orders', '/account/orders', ClipboardList],
  ['Profile', '/account/profile', User],
]

export default function AccountLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  if (!isLoggedIn) return <Navigate to="/auth/sign-in" replace />

  const linkClass = ({ isActive }) => (
    `flex items-center gap-3 rounded-md px-4 py-3 text-sm transition ${isActive ? 'bg-[var(--gold-subtle)] text-[var(--gold-light)]' : 'text-[var(--text-2)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'}`
  )

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-[240px_1fr] md:px-6">
      <aside className="h-max rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
        <NavLink to="/account" end className={linkClass}><User size={17} />Overview</NavLink>
        {links.map(([label, href, Icon]) => <NavLink key={href} to={href} className={linkClass}><Icon size={17} />{label}</NavLink>)}
      </aside>
      <section className="min-w-0">
        <Outlet />
      </section>
    </div>
  )
}
