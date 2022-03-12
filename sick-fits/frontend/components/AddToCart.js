import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { QUERY_AUTHENTICATED_USER } from './User'

const MUTATION_ADD_TO_CART = gql`
  mutation MUTATION_ADD_TO_CART($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`

export default function AddToCart({ id, children }) {
  const [addToCart, { loading }] = useMutation(MUTATION_ADD_TO_CART, {
    variables: {
      id,
    },
    refetchQueries: [{ query: QUERY_AUTHENTICATED_USER }],
  })

  return (
    <button disabled={loading} type="button" onClick={() => addToCart()}>
      {loading ? 'Adding...' : children}
    </button>
  )
}
