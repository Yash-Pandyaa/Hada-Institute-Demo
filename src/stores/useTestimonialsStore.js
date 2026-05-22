import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedTestimonials } from '../data/testimonials.js'
import { makeId } from '../lib/utils.js'

export const useTestimonialsStore = create(
  persist(
    (set) => ({
      items: seedTestimonials,
      add: (item) => set((state) => ({ items: [...state.items, { ...item, id: makeId('testimonial-') }] })),
      update: (id, data) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    }),
    { name: 'hada-testimonials' },
  ),
)
