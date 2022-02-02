import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import Form from './styles/Form'
import DisplayError from './ErrorMessage'
import { QUERY_SINGLE_PRODUCT } from './SingleProduct'
import useForm from '../lib/useForm'

const MUTATION_SINGLE_PRODUCT_UPDATE = gql`
  mutation MUTATION_SINGLE_PRODUCT_UPDATE(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`

export default function UpdateProduct({ id }) {
  const router = useRouter()

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: {
      id,
    },
  })

  const [updateProduct, { loading: updateLoading, error: updateError }] =
    useMutation(MUTATION_SINGLE_PRODUCT_UPDATE)

  const { inputs, handleChange, clearForm } = useForm(
    queryData?.Product || { name: '', price: '' }
  )

  if (queryLoading) return <div>Loading...</div>
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()
        const res = await updateProduct({
          variables: inputs,
        })
        router.push(`/products/id/${res.data.updateProduct.id}`)
        clearForm()
      }}
    >
      <DisplayError error={queryError || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Yeti Cooler"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="1000"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Description..."
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  )
}
