import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedBanners } from '../data/banners.js'
import { makeId } from '../lib/utils.js'

export const useBannersStore = create(
  persist(
    (set) => ({
      items: seedBanners,
      add: (item) => set((state) => ({ items: [...state.items, { ...item, id: makeId('banner-') }] })),
      update: (id, data) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      toggle: (id) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item)),
      })),
    }),
    { name: 'hada-banners' },
  ),
)
