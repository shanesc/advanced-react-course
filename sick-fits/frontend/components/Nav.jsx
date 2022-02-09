import React from 'react'
import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import { useUser } from './User'
import { useSignOutUser } from '../lib/useSignOutUser'

export default function Nav() {
  const user = useUser()
  const { signOutUser } = useSignOutUser()
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
        </>
      ) : (
        <Link href="/signin">Sign In</Link>
      )}
    </NavStyles>
  )
}
