import { createContext, useContext, useState } from 'react'

const CartStateContext = createContext()

export function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false)

  function openCart() {
    setCartOpen(true)
  }

  function closeCart() {
    setCartOpen(false)
  }

  function toggleCart() {
    setCartOpen(!cartOpen)
  }

  return (
    <CartStateContext.Provider
      value={{ cartOpen, setCartOpen, openCart, closeCart, toggleCart }}
    >
      {children}
    </CartStateContext.Provider>
  )
}

export function useCartState() {
  return useContext(CartStateContext)
}
