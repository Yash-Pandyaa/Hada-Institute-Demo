import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import AccountLayout from './layouts/AccountLayout.jsx'
import PageSpinner from './components/ui/PageSpinner.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const MarketplacePage = lazy(() => import('./pages/MarketplacePage.jsx'))
const NoteDetailPage = lazy(() => import('./pages/NoteDetailPage.jsx'))
const CategoriesPage = lazy(() => import('./pages/CategoriesPage.jsx'))
const CartPage = lazy(() => import('./pages/CartPage.jsx'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx'))
const CheckoutSuccessPage = lazy(() => import('./pages/CheckoutSuccessPage.jsx'))
const CheckoutFailurePage = lazy(() => import('./pages/CheckoutFailurePage.jsx'))
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const FaqPage = lazy(() => import('./pages/FaqPage.jsx'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'))
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))
const SignInPage = lazy(() => import('./pages/auth/SignInPage.jsx'))
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage.jsx'))
const AccountPage = lazy(() => import('./pages/account/AccountPage.jsx'))
const LibraryPage = lazy(() => import('./pages/account/LibraryPage.jsx'))
const OrdersPage = lazy(() => import('./pages/account/OrdersPage.jsx'))
const ProfilePage = lazy(() => import('./pages/account/ProfilePage.jsx'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'))
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProductsPage.jsx'))
const AdminProductFormPage = lazy(() => import('./pages/admin/AdminProductFormPage.jsx'))
const AdminSubjectsPage = lazy(() => import('./pages/admin/AdminSubjectsPage.jsx'))
const AdminCategoriesPage = lazy(() => import('./pages/admin/AdminCategoriesPage.jsx'))
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage.jsx'))
const AdminPaymentsPage = lazy(() => import('./pages/admin/AdminPaymentsPage.jsx'))
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage.jsx'))
const AdminBannersPage = lazy(() => import('./pages/admin/AdminBannersPage.jsx'))
const AdminBlogPage = lazy(() => import('./pages/admin/AdminBlogPage.jsx'))
const AdminCouponsPage = lazy(() => import('./pages/admin/AdminCouponsPage.jsx'))
const AdminTestimonialsPage = lazy(() => import('./pages/admin/AdminTestimonialsPage.jsx'))
const AdminMessagesPage = lazy(() => import('./pages/admin/AdminMessagesPage.jsx'))

export default function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="marketplace" element={<MarketplacePage />} />
          <Route path="notes/:slug" element={<NoteDetailPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="checkout/failure" element={<CheckoutFailurePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<AccountPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/new" element={<AdminProductFormPage />} />
          <Route path="products/:id" element={<AdminProductFormPage />} />
          <Route path="subjects" element={<AdminSubjectsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="banners" element={<AdminBannersPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="coupons" element={<AdminCouponsPage />} />
          <Route path="testimonials" element={<AdminTestimonialsPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
