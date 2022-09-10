import '../styles/globals.scss'
import 'normalize.css'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'

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
        {excludeNav.includes(pathname) && (
          <style jsx global>{`
            main{
              width: 100%; 
            }
          `}</style>
        )}

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  )
}

export default MyApp