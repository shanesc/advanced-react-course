import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React from 'react'

// const MUTATION_DELETE_PRODUCT = gql`
//   mutation MUTATION_DELETE_PRODUCT($id: ID!) {
//     deleteProduct(id: $id) {
//       id
//       name
//     }
//   }
// `

const MUTATION_PRODUCT_CHANGE_STATUS = gql`
  mutation MUTATION_PRODUCT_CHANGE_STATUS($id: ID!, $status: String!) {
    updateProduct(id: $id, data: { status: $status }) {
      id
      name
    }
  }
`

function update(cache, payload) {
  cache.evict({ id: cache.identify(payload.data.updateProduct) })
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
        if (confirm('Are you sure you want to delete this product?')) {
          deleteProduct().catch(() => alert(error))
        }
      }}
    >
      {children}
    </button>
  )
}
