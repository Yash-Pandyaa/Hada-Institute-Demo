import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedMessages } from '../data/messages.js'
import { makeId } from '../lib/utils.js'

export const useMessagesStore = create(
  persist(
    (set) => ({
      items: seedMessages,
      add: (item) => set((state) => ({
        items: [{ ...item, id: makeId('msg-'), createdAt: new Date().toISOString(), isRead: false }, ...state.items],
      })),
      update: (id, data) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      markRead: (id) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
      })),
      markUnread: (id) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, isRead: false } : item)),
      })),
    }),
    { name: 'hada-messages' },
  ),
)
