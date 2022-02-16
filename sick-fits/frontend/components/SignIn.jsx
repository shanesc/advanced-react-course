import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'
import { QUERY_AUTHENTICATED_USER } from './User'

export const MUTATION_SIGN_IN_USER = gql`
  mutation MUTATION_SIGN_IN_USER($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`

export default function SignIn() {
  const router = useRouter()

  const { inputs, handleChange } = useForm({
    email: '',
    password: '',
  })

  const [signIn, { data }] = useMutation(MUTATION_SIGN_IN_USER, {
    variables: inputs,
    refetchQueries: [{ query: QUERY_AUTHENTICATED_USER }],
  })

  if (data?.authenticateUserWithPassword?.item) {
    router.push('/products')
  }

  return (
    <Form
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault()
        await signIn().catch(console.error)
      }}
    >
      <fieldset>
        <DisplayError error={data?.authenticateUserWithPassword} />
        <h2>Sign in to your account</h2>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  )
}
