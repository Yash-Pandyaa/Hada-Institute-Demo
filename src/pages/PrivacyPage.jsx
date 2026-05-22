import { useEffect } from 'react'
import Card from '../components/ui/Card.jsx'

const sections = [
  ['Information We Collect', 'This demo stores profile, cart, order, coupon, and admin data in localStorage. No real server receives your information.'],
  ['How Data Is Used', 'Data is used only to demonstrate account libraries, checkout history, contact messages, and admin management screens.'],
  ['Local Storage', 'Clearing browser localStorage resets seeded demo data and removes local changes made in the app.'],
  ['Payments', 'Payment screens are mocked. No card, UPI, bank, or Razorpay transaction is processed in this frontend demo.'],
]

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | Hada Institute'
  }, [])
  return <Policy title="Privacy Policy" sections={sections} />
}

function Policy({ title, sections }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[220px_1fr] md:px-6">
      <aside className="sticky top-24 hidden h-max rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 md:block">
        {sections.map(([heading]) => <a key={heading} href={`#${heading}`} className="block py-2 text-sm text-[var(--text-2)]">{heading}</a>)}
      </aside>
      <Card>
        <h1 className="text-5xl">{title}</h1>
        <div className="mt-8 space-y-8">
          {sections.map(([heading, text]) => <section id={heading} key={heading}><h2 className="text-2xl">{heading}</h2><p className="mt-3 leading-7 text-[var(--text-2)]">{text}</p></section>)}
        </div>
      </Card>
    </div>
  )
}
