import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Menu } from 'lucide-react'
import AdminSidebar from '../components/admin/AdminSidebar.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import { useAuthStore } from '../stores/useAuthStore.js'

function AdminGate() {
  const adminLogin = useAuthStore((state) => state.adminLogin)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(0)

  const submit = (event) => {
    event.preventDefault()
    if (!adminLogin(password)) {
      setError('Incorrect password')
      setShake((value) => value + 1)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.form
        key={shake}
        animate={error ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
        onSubmit={submit}
        className="glass w-full max-w-md rounded-lg p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold-subtle)] text-[var(--gold-light)]"><Lock /></div>
        <h1 className="text-4xl">Admin Access</h1>
        <p className="mt-2 text-[var(--text-2)]">Enter the dashboard password from your environment file.</p>
        <Input className="mt-6" label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} error={error} />
        <Button type="submit" className="mt-5 w-full">Unlock Dashboard</Button>
      </motion.form>
    </div>
  )
}

export default function AdminLayout() {
  const isAdmin = useAuthStore((state) => state.isAdmin)
  const location = useLocation()

  if (!isAdmin) return <AdminGate />

  return (
    <div className="admin-grid min-h-screen">
      <AdminSidebar />
      <section className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-[rgba(18,18,30,0.9)] px-4 py-4 backdrop-blur-xl lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--text-3)]">Admin Panel</p>
            <h1 className="text-2xl">Hada Institute</h1>
          </div>
          <div className="flex items-center gap-3 lg:hidden">
            <Menu size={18} />
            <NavLink to="/admin/products" className="text-sm text-[var(--gold-light)]">Products</NavLink>
            <NavLink to="/admin/messages" className="text-sm text-[var(--gold-light)]">Messages</NavLink>
          </div>
          <span className="hidden text-sm text-[var(--text-2)] md:inline">{location.pathname}</span>
        </header>
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </section>
    </div>
  )
}
