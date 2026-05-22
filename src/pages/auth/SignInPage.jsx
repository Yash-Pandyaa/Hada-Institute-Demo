import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import { useAuthStore } from '../../stores/useAuthStore.js'

export default function SignInPage() {
  const navigate = useNavigate()
  const { login, adminLogin } = useAuthStore()
  const [mode, setMode] = useState('student')
  const [email, setEmail] = useState('student@demo.com')
  const [password, setPassword] = useState('demo1234')
  const [adminPassword, setAdminPassword] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(0)

  useEffect(() => {
    document.title = 'Sign In | Hada Institute'
  }, [])

  const submit = (event) => {
    event.preventDefault()
    const success = mode === 'admin' ? adminLogin(adminPassword) : login(email, password)
    if (!success) {
      setError(mode === 'admin' ? 'Incorrect admin password' : 'Invalid demo credentials')
      setShake((value) => value + 1)
      return
    }
    navigate(mode === 'admin' ? '/admin' : '/account')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div key={shake} animate={error ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }} className="w-full max-w-md">
        <Card className="p-8">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold-subtle)] text-[var(--gold-light)]"><BookOpen /></div>
            <h1 className="mt-4 text-4xl">Hada Institute</h1>
            <p className="mt-2 text-sm text-[var(--text-2)]">{mode === 'student' ? 'Student demo login' : 'Admin dashboard login'}</p>
          </div>
          <form onSubmit={submit} className="mt-7 grid gap-4">
            {mode === 'student' ? (
              <>
                <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} error={error} />
                <p className="text-xs text-[var(--text-3)]">Demo credentials: student@demo.com / demo1234</p>
              </>
            ) : (
              <Input label="Admin Password" type="password" value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} error={error} />
            )}
            <Button type="submit">{mode === 'student' ? 'Sign In' : 'Unlock Admin'}</Button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm">
            <button type="button" className="inline-flex items-center gap-2 text-[var(--gold-light)]" onClick={() => { setMode(mode === 'student' ? 'admin' : 'student'); setError('') }}>
              <Lock size={15} />{mode === 'student' ? 'Admin Login' : 'Student Login'}
            </button>
            <Link to="/auth/sign-up" className="text-[var(--text-2)]">Create account</Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
