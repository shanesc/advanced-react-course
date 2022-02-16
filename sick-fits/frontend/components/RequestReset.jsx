import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import Form from './styles/Form'

const MUTATION_RESET_PASSWORD_LINK = gql`
  mutation MUTATION_RESET_PASSWORD_LINK($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`

export default function RequestReset() {
  const { inputs, handleChange } = useForm({
    email: '',
  })

  const [resetPasswordLink, { data }] = useMutation(
    MUTATION_RESET_PASSWORD_LINK,
    {
      variables: {
        email: inputs.email || null,
      },
    }
  )

  return (
    <Form
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault()
        await resetPasswordLink().catch(console.error)
      }}
    >
      <fieldset>
        <h2>Reset your password</h2>
        {data ? <p>Link sent if email account exists</p> : null}
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
        <button type="submit">Send Reset Link</button>
      </fieldset>
    </Form>
  )
}
