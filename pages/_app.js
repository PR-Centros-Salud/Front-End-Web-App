import '../styles/globals.scss'
import 'normalize.css'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import TopBar from '../components/TopBar'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { pathname } = router

  const excludeNav = ['/', '/login', '/register']

  return (
    <>
      <div className='app'>
        
        {excludeNav.includes(pathname)
          ? null
          : <Nav/>
        }
        <Layout>
          {excludeNav.includes(pathname) ? null : <TopBar />}
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  )
}

export default MyApp