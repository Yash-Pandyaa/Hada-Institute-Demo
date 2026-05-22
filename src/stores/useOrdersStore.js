import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedOrders } from '../data/orders.js'
import { makeId } from '../lib/utils.js'

export const useOrdersStore = create(
  persist(
    (set) => ({
      items: seedOrders,
      lastOrder: null,
      addOrder: ({ items, total, couponCode, customer }) => {
        const order = {
          id: makeId('order-'),
          userId: '1',
          customer: customer || { name: 'Demo Student', email: 'student@demo.com' },
          items: items.map((line) => ({
            productId: line.product.id,
            title: line.product.title,
            price: line.product.discountedPrice || line.product.price,
            quantity: line.quantity,
          })),
          total,
          couponCode: couponCode || '',
          status: 'Completed',
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ items: [order, ...state.items], lastOrder: order }))
        return order
      },
      updateStatus: (id, status) => set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, status } : item)),
      })),
    }),
    { name: 'hada-orders' },
  ),
)
