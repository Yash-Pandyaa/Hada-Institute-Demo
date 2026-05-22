import { useState } from 'react'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import AdminToast from '../../components/ui/AdminToast.jsx'
import { useUserStore } from '../../stores/useUserStore.js'

export default function ProfilePage() {
  const profile = useUserStore((state) => state.profile)
  const updateProfile = useUserStore((state) => state.updateProfile)
  const [form, setForm] = useState({ name: profile.name, email: profile.email, phone: profile.phone || '' })
  const [open, setOpen] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    updateProfile(form)
    setOpen(true)
  }

  return (
    <div>
      <h1 className="text-5xl">Profile</h1>
      <Card className="mt-8 max-w-2xl">
        <form onSubmit={submit} className="grid gap-4">
          <Input label="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <Input label="Email" value={form.email} disabled />
          <Input label="Phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          <Button type="submit">Save Changes</Button>
        </form>
      </Card>
      <AdminToast open={open} onOpenChange={setOpen} title="Profile saved" description="Your mock profile was updated locally." />
    </div>
  )
}
