import { Router } from 'next/dist/client/router'
import Nprogress from 'nprogress'
import Page from '../components/Page'
import '../components/styles/nprogress.css'

Router.events.on('routeChangeStart', () => Nprogress.start())
Router.events.on('routeChangeComplete', () => Nprogress.done())
Router.events.on('routeChangeError', () => Nprogress.done())

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  )
}
