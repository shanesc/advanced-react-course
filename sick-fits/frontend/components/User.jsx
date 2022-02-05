import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

export const QUERY_AUTHENTICATED_USER = gql`
  query QUERY_AUTHENTICATED_USER {
    authenticatedItem {
      ... on User {
        id
        name
        email
      }
    }
  }
`

export function useUser() {
  const { data } = useQuery(QUERY_AUTHENTICATED_USER)
  return data?.authenticatedItem
}
