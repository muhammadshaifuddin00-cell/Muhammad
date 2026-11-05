import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'hfc-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, qty = 1, option = null) => {
    setItems((prev) => {
      const key = option ? `${product.id}::${option}` : product.id
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i
        )
      }
      const optPrice =
        product.options?.find((o) => o.name === option)?.price || 0
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price + optPrice,
          image: product.image,
          qty,
          option: option || null,
        },
      ]
    })
  }

  const updateQty = (key, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    )
  }

  const removeItem = (key) => setItems((prev) => prev.filter((i) => i.key !== key))
  const clearCart = () => setItems([])

  const cart = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
    const count = items.reduce((s, i) => s + i.qty, 0)
    return { items, subtotal, count }
  }, [items])

  return (
    <CartContext.Provider
      value={{ ...cart, addItem, updateQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
