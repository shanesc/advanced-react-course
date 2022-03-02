import styled from 'styled-components'
import { calculateCartTotal } from '../lib/calculateCartTotal'
import { formatMoney } from '../lib/formatMoney'
import StyledCart from './styles/CartStyles'
import Supreme from './styles/Supreme'
import { useUser } from './User'

export default function Cart() {
  const user = useUser()

  if (!user) return null

  const firstName = user.name.split(' ')[0]
  const firstNameCapitalized =
    firstName.slice(0, 1).toUpperCase() + firstName.slice(1)

  return (
    <StyledCart open>
      <header>
        <Supreme>{firstNameCapitalized}'s Cart</Supreme>
      </header>
      <ul>
        {user.cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <footer>Total: {formatMoney(calculateCartTotal(user.cart))}</footer>
    </StyledCart>
  )
}

const StyledCartItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`

function CartItem({ item }) {
  const { product } = item
  return (
    <StyledCartItem>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.photo.image.altText}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * item.quantity)}{' '}
          <em>
            ({item.quantity} &times; {formatMoney(product.price)} ea)
          </em>
        </p>
      </div>
    </StyledCartItem>
  )
}
