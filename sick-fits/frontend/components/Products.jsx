import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useRouter } from 'next/dist/client/router'
import styled from 'styled-components'
import { perPage } from '../config'
import Product from './Product'

export const QUERY_ALL_AVAILABLE_PRODUCTS = gql`
  query QUERY_ALL_AVAILABLE_PRODUCTS($skipCount: Int = 0, $perPage: Int) {
    allProducts(
      where: { status: "AVAILABLE" }
      skip: $skipCount
      first: $perPage
      sortBy: id_DESC
    ) {
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
  const { query } = useRouter()
  const page = parseInt(query.page) || 1
  const { data, error, loading } = useQuery(QUERY_ALL_AVAILABLE_PRODUCTS, {
    variables: {
      skipCount: perPage * (page - 1),
      perPage,
    },
  })
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
