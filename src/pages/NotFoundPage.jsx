import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-12">
      <Card className="w-full text-center">
        <p className="text-sm uppercase tracking-wide text-[var(--gold-light)]">404</p>
        <h1 className="mt-3 text-6xl">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--text-2)]">This route is not part of the Hada Institute demo.</p>
        <Link to="/"><Button className="mt-7">Back Home</Button></Link>
      </Card>
    </div>
  )
}
