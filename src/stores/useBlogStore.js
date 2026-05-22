import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedBlogPosts } from '../data/blog.js'
import { makeId } from '../lib/utils.js'

export const useBlogStore = create(
  persist(
    (set, get) => ({
      items: seedBlogPosts,
      add: (item) => set((state) => ({
        items: [...state.items, { ...item, id: makeId('blog-'), publishedAt: item.publishedAt || new Date().toISOString() }],
      })),
      update: (id, data) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      getBySlug: (slug) => get().items.find((item) => item.slug === slug),
      getPublished: () => get().items.filter((item) => item.isPublished),
    }),
    { name: 'hada-blog' },
  ),
)
