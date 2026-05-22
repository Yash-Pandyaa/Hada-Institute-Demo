import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedCoupons } from '../data/coupons.js'
import { makeId } from '../lib/utils.js'

export const useCouponsStore = create(
  persist(
    (set, get) => ({
      items: seedCoupons,
      add: (item) => set((state) => ({ items: [...state.items, { ...item, id: makeId('coupon-') }] })),
      update: (id, data) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      validate: (code) => {
        const normalized = String(code || '').trim().toUpperCase()
        return get().items.find((item) => (
          item.code === normalized
          && item.isActive
          && (!item.expiresAt || new Date(item.expiresAt) >= new Date())
          && (!item.maxUses || item.usedCount < item.maxUses)
        )) || null
      },
    }),
    { name: 'hada-coupons' },
  ),
)
