import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  login: (email, password) => {
    const success = email === 'student@demo.com' && password === 'demo1234'
    if (success) {
      set({ user: { id: '1', name: 'Demo Student', email, avatar: 'DS' }, isLoggedIn: true })
    }
    return success
  },
  register: ({ name, email }) => {
    set({ user: { id: '1', name, email, avatar: name.slice(0, 2).toUpperCase() }, isLoggedIn: true })
    return true
  },
  adminLogin: (password) => {
    const success = password === import.meta.env.VITE_ADMIN_PASSWORD
    if (success) set({ isAdmin: true })
    return success
  },
  logout: () => set({ user: null, isLoggedIn: false, isAdmin: false }),
}))
