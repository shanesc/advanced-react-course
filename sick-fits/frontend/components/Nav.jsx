import Link from 'next/link'
import React from 'react'
import { useCartState } from '../context/cartState'
import { useSignOutUser } from '../lib/useSignOutUser'
import NavStyles from './styles/NavStyles'
import { useUser } from './User'

export default function Nav() {
  const user = useUser()
  const { signOutUser } = useSignOutUser()
  const { openCart } = useCartState()

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <button type="button" onClick={signOutUser}>
            Sign Out
          </button>
          <button type="button" onClick={openCart}>
            My Cart
          </button>
        </>
      ) : (
        <Link href="/signin">Sign In</Link>
      )}
    </NavStyles>
  )
}
