import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Head from 'next/head'
import styled from 'styled-components'
import DisplayError from './ErrorMessage'

export const QUERY_SINGLE_PRODUCT = gql`
  query QUERY_SINGLE_PRODUCT($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

const StyledDiv = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { id },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <DisplayError error={error} />
  const { Product } = data
  return (
    <StyledDiv>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </StyledDiv>
  )
}
