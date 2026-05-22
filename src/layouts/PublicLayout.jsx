import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import PageTransition from '../components/animations/PageTransition.jsx'
import { useBannersStore } from '../stores/useBannersStore.js'

function AnnouncementBar() {
  const allBanners = useBannersStore((state) => state.items)
  const banners = allBanners.filter((banner) => banner.isActive)
  if (!banners.length) return null
  const items = [...banners, ...banners]
  return (
    <div className="overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] py-2 text-sm text-[var(--gold-light)]">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap px-4">
        {items.map((banner, index) => (
          <span key={`${banner.id}-${index}`}>{banner.title}: {banner.subtitle}</span>
        ))}
      </div>
    </div>
  )
}

export default function PublicLayout() {
  const location = useLocation()
  return (
    <>
      {location.pathname === '/' && <AnnouncementBar />}
      <Navbar />
      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}
