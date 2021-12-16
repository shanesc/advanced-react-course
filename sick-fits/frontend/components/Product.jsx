import Link from 'next/link'
import { formatMoney } from '../lib/formatMoney'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import TitleStyled from './styles/Title'

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <TitleStyled>
        <Link href={`products/${product.id}`}>{product.name}</Link>
      </TitleStyled>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* TODO: Add buttons for delete and add */}
    </ItemStyles>
  )
}
