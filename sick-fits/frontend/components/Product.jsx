import Link from 'next/link'
import { formatMoney } from '../lib/formatMoney'
import AddToCart from './AddToCart'
import DeleteProduct from './DeleteProduct'
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
        <Link href={`/products/id/${product.id}`}>{product.name}</Link>
      </TitleStyled>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <AddToCart id={product.id}>Add To Cart 🛒</AddToCart>
        <DeleteProduct id={product.id}>Delete 🗑</DeleteProduct>
      </div>
    </ItemStyles>
  )
}
