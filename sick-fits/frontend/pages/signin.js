import styled from 'styled-components'
import RequestReset from '../components/RequestReset'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`

export default function SignInPage() {
  return (
    <StyledGrid>
      <SignIn />
      <SignUp />
      <RequestReset />
    </StyledGrid>
  )
}
