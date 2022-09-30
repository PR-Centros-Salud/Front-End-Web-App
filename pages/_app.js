import '../styles/globals.scss'
import 'normalize.css'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import TopBar from '../components/TopBar'
import UlComponent from '../components/UlComponet'
import NavAdmin from '../components/NavAdmin'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { pathname } = router

  const isAdmin = false;

  const excludeNav = ['/', '/login', '/register']
  const excludeUl = ['/', '/login', '/register', '/dashboard', '/configuration']

  return (
    <>
      <div className='app'>
        {excludeNav.includes(pathname) 
          ? null 
          : isAdmin 
          ? <NavAdmin /> 
          : <Nav />
        }
        <Layout>
          {excludeNav.includes(pathname) ? null : <TopBar />}
          {excludeUl.includes(pathname) ? null : <UlComponent />}
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  )
}

export default MyApp