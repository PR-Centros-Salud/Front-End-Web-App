import '../styles/globals.scss'
import 'normalize.css'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import TopBar from '../components/TopBar'
import UlComponent from '../components/UlComponet'
import { useEffect } from 'react';


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { pathname } = router
  const isAdmin = false;
  useEffect(() => {
    // Perform localStorage action
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin')) ? true : false
    console.log(isAdmin)
  }, [])
  const excludeNav = ['/', '/login', '/register']
  const excludeUl = ['/', '/login', '/register', '/dashboard', '/configuration']

  return (
    <>
      <div className='app'>
        {excludeNav.includes(pathname) 
          ? null 
          : <Nav/>
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