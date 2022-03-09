import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const MUTATION_PRODUCT_CHANGE_STATUS = gql`
  mutation MUTATION_PRODUCT_CHANGE_STATUS($id: ID!, $status: String!) {
    updateProduct(id: $id, data: { status: $status }) {
      id
      name
    }
  }
`

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.updateProduct))
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    MUTATION_PRODUCT_CHANGE_STATUS,
    {
      variables: {
        id,
        status: 'DELETED',
      },
      update,
    }
  )
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this product?')) {
          deleteProduct().catch(() => alert(error))
        }
      }}
    >
      {children}
    </button>
  )
}
