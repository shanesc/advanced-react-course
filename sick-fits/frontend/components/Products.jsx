import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Product from './Product'

export const QUERY_ALL_AVAILABLE_PRODUCTS = gql`
  query QUERY_ALL_AVAILABLE_PRODUCTS {
    allProducts(where: { status: "AVAILABLE" }) {
      id
      name
      description
      price
      photo {
        id
        altText
        image {
          id
          publicUrl
          publicUrlTransformed
        }
      }
    }
  }
`

const ProductsGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
`

export default function Products() {
  const { data, error, loading } = useQuery(QUERY_ALL_AVAILABLE_PRODUCTS)
  if (error) return <p>{`Error: ${error.message}`}</p>

  return loading ? (
    <p>Loading...</p>
  ) : (
    <ProductsGridStyled>
      {data.allProducts.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </ProductsGridStyled>
  )
}
