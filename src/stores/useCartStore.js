import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function calculate(items, discountPercent = 0) {
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discountedPrice || item.product.price
    return sum + price * item.quantity
  }, 0)
  const discount = Math.round((subtotal * discountPercent) / 100)
  return { subtotal, discount, discountedTotal: Math.max(subtotal - discount, 0) }
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      discountPercent: 0,
      discountAmount: 0,
      discountedTotal: 0,
      addItem: (product, quantity = 1) => set((state) => {
        const existing = state.items.find((item) => item.product.id === product.id)
        const items = existing
          ? state.items.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
          : [...state.items, { product, quantity }]
        const totals = calculate(items, state.discountPercent)
        return { items, discountAmount: totals.discount, discountedTotal: totals.discountedTotal }
      }),
      removeItem: (productId) => set((state) => {
        const items = state.items.filter((item) => item.product.id !== productId)
        const totals = calculate(items, state.discountPercent)
        return { items, discountAmount: totals.discount, discountedTotal: totals.discountedTotal }
      }),
      updateQty: (productId, quantity) => set((state) => {
        const nextQty = Math.max(Number(quantity) || 1, 1)
        const items = state.items.map((item) => (item.product.id === productId ? { ...item, quantity: nextQty } : item))
        const totals = calculate(items, state.discountPercent)
        return { items, discountAmount: totals.discount, discountedTotal: totals.discountedTotal }
      }),
      clearCart: () => set({ items: [], couponCode: '', discountPercent: 0, discountAmount: 0, discountedTotal: 0 }),
      applyDiscount: (coupon) => set((state) => {
        const discountPercent = coupon ? coupon.discountPercent : 0
        const totals = calculate(state.items, discountPercent)
        return {
          couponCode: coupon ? coupon.code : '',
          discountPercent,
          discountAmount: totals.discount,
          discountedTotal: totals.discountedTotal,
        }
      }),
      getSubtotal: () => calculate(get().items).subtotal,
      getTotal: () => {
        const state = get()
        return calculate(state.items, state.discountPercent).discountedTotal
      },
    }),
    { name: 'hada-cart' },
  ),
)
