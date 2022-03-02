import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

export const QUERY_AUTHENTICATED_USER = gql`
  query QUERY_AUTHENTICATED_USER {
    authenticatedItem {
      ... on User {
        id
        name
        email
        cart {
          id
          product {
            id
            name
            price
            description
            photo {
              image {
                publicUrlTransformed
              }
              altText
            }
          }
          quantity
        }
      }
    }
  }
`

export function useUser() {
  const { data } = useQuery(QUERY_AUTHENTICATED_USER)
  return data?.authenticatedItem
}
