import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, LogOut, Menu, ShoppingCart, User, X } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/gsap.js'
import { useCartStore } from '../../stores/useCartStore.js'
import { useAuthStore } from '../../stores/useAuthStore.js'
import Button from '../ui/Button.jsx'

const links = [
  ['Home', '/'],
  ['Marketplace', '/marketplace'],
  ['Subjects', '/categories'],
  ['Blog', '/blog'],
  ['About', '/about'],
  ['Contact', '/contact'],
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [solid, setSolid] = useState(location.pathname !== '/')
  const [open, setOpen] = useState(false)
  const items = useCartStore((state) => state.items)
  const { isLoggedIn, user, logout } = useAuthStore()
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const syncSolid = () => setSolid(location.pathname !== '/' || window.scrollY > 24)
    const frame = window.requestAnimationFrame(syncSolid)
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 80,
      onUpdate: syncSolid,
    })
    gsap.set('.hada-navbar', { y: 0 })
    return () => {
      window.cancelAnimationFrame(frame)
      trigger.kill()
    }
  }, [location.pathname])

  const navClass = ({ isActive }) => (
    `text-sm font-medium transition ${isActive ? 'text-[var(--gold-light)]' : 'text-[var(--text-2)] hover:text-[var(--text)]'}`
  )

  return (
    <header className={`hada-navbar sticky top-0 z-40 border-b transition duration-300 ${solid ? 'border-[var(--border)] bg-[rgba(18,18,30,0.9)] backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--gold-subtle)] text-[var(--gold-light)]">
            <BookOpen size={22} />
          </span>
          <span className="font-display text-xl font-semibold">Hada Institute</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => <NavLink key={href} to={href} onClick={() => setOpen(false)} className={navClass}>{label}</NavLink>)}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/cart" className="relative rounded-md border border-[var(--border)] p-3 text-[var(--text-2)] transition hover:border-[var(--gold-dark)] hover:text-[var(--gold-light)]">
            <ShoppingCart size={18} />
            {count > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-[var(--gold)] px-1.5 text-xs font-bold text-[#12100a]">{count}</span>}
          </Link>
          {isLoggedIn ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gold)] font-bold text-[#12100a]">
                {user?.avatar || 'DS'}
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content align="end" className="z-50 min-w-48 rounded-md border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl">
                  <DropdownMenu.Item onClick={() => navigate('/account')} className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm outline-none hover:bg-[var(--gold-subtle)]"><User size={15} />Account</DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => { logout(); navigate('/') }} className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm outline-none hover:bg-[var(--gold-subtle)]"><LogOut size={15} />Logout</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          ) : (
            <Button variant="outline" onClick={() => navigate('/auth/sign-in')}>Login</Button>
          )}
        </div>

        <button type="button" className="rounded-md p-2 text-[var(--text)] lg:hidden" onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--surface)] lg:hidden"
          >
            <div className="grid gap-2 px-4 py-4">
              {links.map(([label, href]) => <NavLink key={href} to={href} onClick={() => setOpen(false)} className={navClass}>{label}</NavLink>)}
              <Link to="/cart" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center gap-2 text-[var(--gold-light)]"><ShoppingCart size={18} />Cart ({count})</Link>
              <Button className="mt-2" onClick={() => navigate(isLoggedIn ? '/account' : '/auth/sign-in')}>{isLoggedIn ? 'Account' : 'Login'}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
