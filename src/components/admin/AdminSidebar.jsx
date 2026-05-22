import { NavLink, useNavigate } from 'react-router-dom'
import { BookOpen, Boxes, ChartNoAxesCombined, FileText, Image, LayoutDashboard, LogOut, Mail, ReceiptIndianRupee, Shapes, ShoppingBag, Star, TicketPercent, Users } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore.js'
import { useMessagesStore } from '../../stores/useMessagesStore.js'

const groups = [
  ['Content', [
    ['Products', '/admin/products', BookOpen],
    ['Subjects', '/admin/subjects', Shapes],
    ['Categories', '/admin/categories', Boxes],
    ['Blog', '/admin/blog', FileText],
    ['Banners', '/admin/banners', Image],
  ]],
  ['Commerce', [
    ['Orders', '/admin/orders', ShoppingBag],
    ['Payments', '/admin/payments', ReceiptIndianRupee],
    ['Coupons', '/admin/coupons', TicketPercent],
  ]],
  ['People', [
    ['Users', '/admin/users', Users],
    ['Messages', '/admin/messages', Mail],
    ['Testimonials', '/admin/testimonials', Star],
  ]],
]

export default function AdminSidebar() {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const messages = useMessagesStore((state) => state.items)
  const unread = messages.filter((item) => !item.isRead).length

  const linkClass = ({ isActive }) => (
    `flex items-center gap-3 border-l-2 px-4 py-2.5 text-sm transition ${isActive ? 'border-[var(--gold)] bg-[var(--gold-subtle)] text-[var(--gold-light)]' : 'border-transparent text-[var(--text-2)] hover:text-[var(--text)]'}`
  )

  return (
    <aside className="sticky top-0 hidden h-screen border-r border-[var(--border)] bg-[var(--surface)] p-4 lg:block">
      <NavLink to="/admin" className="mb-6 flex items-center gap-3 px-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--gold-subtle)] text-[var(--gold-light)]"><LayoutDashboard size={20} /></span>
        <span className="font-display text-xl">Hada Admin</span>
      </NavLink>
      <NavLink to="/admin" end className={linkClass}><ChartNoAxesCombined size={17} />Dashboard</NavLink>
      {groups.map(([group, links]) => (
        <div key={group} className="mt-6">
          <p className="mb-2 px-4 text-xs uppercase tracking-wide text-[var(--text-3)]">{group}</p>
          <div className="grid gap-1">
            {links.map(([label, href, Icon]) => (
              <NavLink key={href} to={href} className={linkClass}>
                <Icon size={17} />
                <span>{label}</span>
                {label === 'Messages' && unread > 0 && <span className="ml-auto rounded-full bg-[var(--gold)] px-2 text-xs font-bold text-[#12100a]">{unread}</span>}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => { logout(); navigate('/') }}
        className="mt-8 flex w-full items-center gap-3 border-l-2 border-transparent px-4 py-2.5 text-sm text-[var(--text-2)] hover:text-[var(--gold-light)]"
      >
        <LogOut size={17} />Logout
      </button>
    </aside>
  )
}
