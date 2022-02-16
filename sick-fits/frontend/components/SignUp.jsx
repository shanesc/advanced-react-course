import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import { MUTATION_SIGN_IN_USER } from './SignIn'
import Form from './styles/Form'
import { QUERY_AUTHENTICATED_USER } from './User'

const MUTATION_CREATE_USER = gql`
  mutation MUTATION_CREATE_USER(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
    }
  }
`

export default function SignUp() {
  const router = useRouter()

  const { inputs, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  })

  const [signIn, { data }] = useMutation(MUTATION_SIGN_IN_USER, {
    variables: inputs,
    refetchQueries: [{ query: QUERY_AUTHENTICATED_USER }],
  })

  const [signUp, { error }] = useMutation(MUTATION_CREATE_USER, {
    variables: {
      name: inputs.name || null,
      email: inputs.email || null,
      password: inputs.password || null,
    },
    onCompleted: signIn,
  })

  if (data?.authenticateUserWithPassword?.item) {
    router.push('/products')
  }

  return (
    <Form
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault()
        await signUp().catch(console.error)
      }}
    >
      <fieldset>
        <DisplayError error={error} />
        <h2>Create an account</h2>
        <label>
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Create</button>
      </fieldset>
    </Form>
  )
}
