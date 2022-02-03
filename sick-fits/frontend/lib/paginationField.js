import { QUERY_AVAILABLE_PRODUCT_COUNT } from '../components/Pagination'

export function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { first, skip } = args

      const data = cache.readQuery({ query: QUERY_AVAILABLE_PRODUCT_COUNT })
      const count = data?._allProductsMeta?.count
      const page = skip / first + 1
      const pages = Math.ceil(count / first)
      const items = existing.slice(skip, skip + first).filter((i) => {
        console.log(i)
        return i
      })

      if (items.length === first) {
        return items
      }

      if (items.length && page === pages) {
        return items
      }

      return false
    },
    merge(existing, incoming, { args }) {
      const { skip } = args

      const merged = existing
        ? [...existing] // copy existing if it's available
        : Array(skip).fill(null) // if existing is undefined, create empty array values

      merged.splice(skip, incoming.length, ...incoming) // splice in the incoming items

      return merged
    },
  }
}
