import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedProducts } from '../data/products.js'
import { makeId } from '../lib/utils.js'

export const useProductsStore = create(
  persist(
    (set, get) => ({
      items: seedProducts,
      add: (item) => set((state) => ({ items: [...state.items, { ...item, id: makeId('product-') }] })),
      update: (id, data) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      togglePublished: (id) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, isPublished: !item.isPublished } : item)),
      })),
      getBySlug: (slug) => get().items.find((item) => item.slug === slug),
      getFeatured: () => get().items.filter((item) => item.isFeatured && item.isPublished),
      getBySubject: (subjectId) => get().items.filter((item) => item.subjectId === subjectId && item.isPublished),
      getByCategory: (categoryId) => get().items.filter((item) => item.categoryId === categoryId && item.isPublished),
    }),
    { name: 'hada-products' },
  ),
)
