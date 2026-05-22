import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import { useAuthStore } from '../../stores/useAuthStore.js'
import { useUserStore } from '../../stores/useUserStore.js'

export default function SignUpPage() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  const updateProfile = useUserStore((state) => state.updateProfile)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Sign Up | Hada Institute'
  }, [])

  const submit = (event) => {
    event.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    register({ name: form.name, email: form.email })
    updateProfile({ name: form.name, email: form.email })
    navigate('/account')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold-subtle)] text-[var(--gold-light)]"><BookOpen /></div>
          <h1 className="mt-4 text-4xl">Create Account</h1>
          <p className="mt-2 text-sm text-[var(--text-2)]">Mock registration for the frontend demo.</p>
        </div>
        <form onSubmit={submit} className="mt-7 grid gap-4">
          <Input label="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <Input label="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <Input label="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          <Input label="Confirm Password" type="password" value={form.confirm} onChange={(event) => setForm({ ...form, confirm: event.target.value })} error={error} required />
          <Button type="submit">Sign Up</Button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--text-2)]">Already have an account? <Link className="text-[var(--gold-light)]" to="/auth/sign-in">Sign in</Link></p>
      </Card>
    </div>
  )
}
