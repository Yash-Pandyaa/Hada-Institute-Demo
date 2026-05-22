import { useEffect, useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Input from '../components/ui/Input.jsx'
import AdminToast from '../components/ui/AdminToast.jsx'
import { useMessagesStore } from '../stores/useMessagesStore.js'

export default function ContactPage() {
  const add = useMessagesStore((state) => state.add)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  useEffect(() => {
    document.title = 'Contact | Hada Institute'
  }, [])

  const submit = (event) => {
    event.preventDefault()
    add(form)
    setForm({ name: '', email: '', phone: '', message: '' })
    setOpen(true)
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1fr_420px]">
      <Card>
        <h1 className="text-5xl">Contact Us</h1>
        <p className="mt-3 text-[var(--text-2)]">Ask about notes, bundles, downloads, or demo admin workflows.</p>
        <form onSubmit={submit} className="mt-8 grid gap-4">
          <Input label="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <Input label="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <Input label="Phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          <Input label="Message" textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required />
          <Button type="submit">Send Message</Button>
        </form>
      </Card>
      <div className="grid gap-5">
        <Card>
          <h2 className="text-3xl">Institute Details</h2>
          <div className="mt-5 grid gap-4 text-[var(--text-2)]">
            <span className="flex gap-3"><MapPin className="text-[var(--gold-light)]" />Indore, Madhya Pradesh</span>
            <span className="flex gap-3"><Phone className="text-[var(--gold-light)]" />+91 98765 43210</span>
            <span className="flex gap-3"><Mail className="text-[var(--gold-light)]" />hello@hadainstitute.in</span>
          </div>
        </Card>
        <iframe
          title="Hada Institute Indore Map"
          className="h-80 w-full rounded-lg border border-[var(--border)]"
          src="https://www.google.com/maps?q=22.7196,75.8577&z=12&output=embed"
          loading="lazy"
        />
      </div>
      <AdminToast open={open} onOpenChange={setOpen} title="Message sent" description="Your message has been saved for the admin demo." />
    </div>
  )
}
