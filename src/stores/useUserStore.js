import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedUsers } from '../data/users.js'

export const useUserStore = create(
  persist(
    (set) => ({
      profile: seedUsers[0],
      purchasedIds: seedUsers[0].purchasedProductIds,
      completePurchase: (productIds) => set((state) => ({
        purchasedIds: Array.from(new Set([...state.purchasedIds, ...productIds])),
      })),
      updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),
    }),
    { name: 'hada-user' },
  ),
)
