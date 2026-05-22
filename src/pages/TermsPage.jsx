import { useEffect } from 'react'
import Card from '../components/ui/Card.jsx'

const sections = [
  ['Digital Products', 'Hada Institute is represented here as a digital study notes marketplace. Files and downloads are mocked with placeholder URLs.'],
  ['Demo Checkout', 'Orders are created locally after the demo checkout step. This does not represent a real payment confirmation.'],
  ['Refunds', 'Refund and access rules for real digital products would depend on production policy, payment status, and download status.'],
  ['Admin Changes', 'Admin CRUD changes persist in localStorage and can be reset by clearing keys that start with hada-.'],
]

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service | Hada Institute'
  }, [])
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[220px_1fr] md:px-6">
      <aside className="sticky top-24 hidden h-max rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 md:block">
        {sections.map(([heading]) => <a key={heading} href={`#${heading}`} className="block py-2 text-sm text-[var(--text-2)]">{heading}</a>)}
      </aside>
      <Card>
        <h1 className="text-5xl">Terms of Service</h1>
        <div className="mt-8 space-y-8">
          {sections.map(([heading, text]) => <section id={heading} key={heading}><h2 className="text-2xl">{heading}</h2><p className="mt-3 leading-7 text-[var(--text-2)]">{text}</p></section>)}
        </div>
      </Card>
    </div>
  )
}
