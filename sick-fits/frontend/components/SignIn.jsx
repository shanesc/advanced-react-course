import useForm from '../lib/useForm'
import Form from './styles/Form'

export default function SignIn() {
  const { inputs, handleChange } = useForm({
    email: '',
    password: '',
  })

  return (
    <Form method="POST">
      <fieldset>
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
      </fieldset>
    </Form>
  )
}
