import '../styles/globals.scss'
import 'normalize.css'
import Layout from '../components/layout'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp