import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'

const MUTATION_RESET_PASSWORD = gql`
  mutation MUTATION_RESET_PASSWORD(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      message
      code
    }
  }
`

export default function ResetPassword({ token, email }) {
  const { inputs, handleChange } = useForm({
    password: '',
  })

  const [resetPasswordLink, { data }] = useMutation(MUTATION_RESET_PASSWORD, {
    variables: {
      email,
      password: inputs.password || null,
      token,
    },
  })

  const error = data?.redeemUserPasswordResetToken

  return (
    <Form
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault()
        await resetPasswordLink().catch(console.error)
      }}
    >
      <fieldset>
        <DisplayError error={error} />
        {data?.redeemUserPasswordResetToken === null && (
          <p>Password successfully reset! Please log in.</p>
        )}
        <h2>Reset your password</h2>
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
        <button type="submit">Reset</button>
      </fieldset>
    </Form>
  )
}
