import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedFaqs } from '../data/faqs.js'
import { makeId } from '../lib/utils.js'

export const useFaqsStore = create(
  persist(
    (set) => ({
      items: seedFaqs,
      add: (item) => set((state) => ({ items: [...state.items, { ...item, id: makeId('faq-') }] })),
      update: (id, data) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    }),
    { name: 'hada-faqs' },
  ),
)
