import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedCategories } from '../data/categories.js'
import { makeId } from '../lib/utils.js'

export const useCategoriesStore = create(
  persist(
    (set) => ({
      items: seedCategories,
      add: (item) => set((state) => ({ items: [...state.items, { ...item, id: item.id || makeId('category-') }] })),
      update: (id, data) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    }),
    { name: 'hada-categories' },
  ),
)
