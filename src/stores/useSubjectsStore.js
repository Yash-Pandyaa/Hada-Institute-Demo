import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedSubjects } from '../data/subjects.js'
import { makeId } from '../lib/utils.js'

export const useSubjectsStore = create(
  persist(
    (set) => ({
      items: seedSubjects,
      add: (item) => set((state) => ({ items: [...state.items, { ...item, id: item.id || makeId('subject-') }] })),
      update: (id, data) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    }),
    { name: 'hada-subjects' },
  ),
)
