import { Link } from 'react-router-dom'
import { BookOpen, ClipboardList, User } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'
import StatsCard from '../../components/ui/StatsCard.jsx'
import Button from '../../components/ui/Button.jsx'
import { useOrdersStore } from '../../stores/useOrdersStore.js'
import { useUserStore } from '../../stores/useUserStore.js'

export default function AccountPage() {
  const profile = useUserStore((state) => state.profile)
  const purchasedIds = useUserStore((state) => state.purchasedIds)
  const allOrders = useOrdersStore((state) => state.items)
  const orders = allOrders.filter((order) => order.userId === '1')

  return (
    <div>
      <h1 className="text-5xl">Welcome, {profile.name}</h1>
      <p className="mt-3 text-[var(--text-2)]">Manage your digital library, orders, and profile details.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <StatsCard icon={BookOpen} label="Notes Purchased" count={purchasedIds.length} />
        <StatsCard icon={ClipboardList} label="Orders Placed" count={orders.length} />
        <StatsCard icon={User} label="Profile" count="Ready" />
      </div>
      <Card className="mt-8">
        <h2 className="text-3xl">Quick Links</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/account/library"><Button>My Library</Button></Link>
          <Link to="/account/orders"><Button variant="outline">Order History</Button></Link>
          <Link to="/account/profile"><Button variant="ghost">Edit Profile</Button></Link>
        </div>
      </Card>
    </div>
  )
}
