import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { QUERY_AUTHENTICATED_USER } from '../components/User'

const MUTATION_SIGN_OUT_USER = gql`
  mutation {
    endSession
  }
`

export function useSignOutUser() {
  const [signOutUser] = useMutation(MUTATION_SIGN_OUT_USER, {
    refetchQueries: [{ query: QUERY_AUTHENTICATED_USER }],
  })

  return {
    signOutUser,
  }
}
