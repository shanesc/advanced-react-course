import RequestReset from '../components/RequestReset'
import ResetPassword from '../components/ResetPassword'

export default function ResetPage({ query }) {
  const { token, identity } = query

  if (!token) {
    return <RequestReset />
  }

  return <ResetPassword token={token} email={identity} />
}
