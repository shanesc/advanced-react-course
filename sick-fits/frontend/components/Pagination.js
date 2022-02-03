import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'
import PaginationStyles from './styles/PaginationStyles'
import DisplayError from './ErrorMessage'
import { perPage } from '../config'

export const QUERY_AVAILABLE_PRODUCT_COUNT = gql`
  query {
    _allProductsMeta(where: { status: "AVAILABLE" }) {
      count
    }
  }
`

export default function Pagination() {
  const { query } = useRouter()
  const page = parseInt(query.page) || 1
  const { error, loading, data } = useQuery(QUERY_AVAILABLE_PRODUCT_COUNT)

  if (loading) return <span>Loading...</span>
  if (error) return <DisplayError error={error} />

  const { count } = data?._allProductsMeta
  const pageCount = Math.ceil(count / perPage)

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits | Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <span>
        Page {page} of {pageCount}
      </span>
      <span>{count} Items Total</span>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>→ Next</a>
      </Link>
    </PaginationStyles>
  )
}
