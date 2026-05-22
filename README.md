# Hada Institute Frontend

Hada Institute is a React + Vite frontend demo for a digital study notes marketplace. Students can browse notes by subject/category, add PDFs to a cart, run a mock checkout, and view purchased notes in a local account library. Admins can manage products, subjects, categories, banners, blog posts, coupons, testimonials, orders, users, payments, and contact messages.

## Tech Stack

- React 19 + Vite 8
- React Router 7
- Zustand 5 with localStorage persistence
- GSAP, Framer Motion, Three.js, React Three Fiber, Drei
- Tailwind CSS 4
- Radix UI primitives
- Lucide React icons
- Plain JavaScript and JSX only

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_ADMIN_PASSWORD` in `.env` before using admin login.

## Routes

Public routes:
`/`, `/marketplace`, `/notes/:slug`, `/categories`, `/cart`, `/checkout`, `/checkout/success`, `/checkout/failure`, `/blog`, `/blog/:slug`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms`, `/auth/sign-in`, `/auth/sign-up`.

Account routes:
`/account`, `/account/library`, `/account/orders`, `/account/profile`.

Admin routes:
`/admin`, `/admin/products`, `/admin/products/new`, `/admin/products/:id`, `/admin/subjects`, `/admin/categories`, `/admin/orders`, `/admin/payments`, `/admin/users`, `/admin/banners`, `/admin/blog`, `/admin/coupons`, `/admin/testimonials`, `/admin/messages`.

## Demo Access

Admin access:
Go to `/admin` and use the password from `.env`:

```text
VITE_ADMIN_PASSWORD=hada@admin2025
```

Demo student login:

```text
student@demo.com
demo1234
```

## Updating Seed Data

Seed data lives in `src/data/*.js`. Edit those files, clear localStorage, and refresh the app to reload the original seed state.

To reset admin and storefront data, open DevTools, go to Application, then Local Storage, and clear keys beginning with `hada-`.

## Vercel Deploy

Push the project to GitHub, import it in Vercel, add `VITE_ADMIN_PASSWORD` as an environment variable, and deploy. `vercel.json` rewrites all SPA routes to `index.html`.

## Known Limitations

- No real payment processing
- No real file downloads
- No real authentication or backend
- All CRUD data is local to the browser via Zustand persistence
