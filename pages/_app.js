import '../styles/globals.scss'
import 'normalize.css'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import TopBar from '../components/TopBar'
import UlComponent from '../components/UlComponet'
import { useEffect, useMemo } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setToken, getToken, removeToken} from '../api/token'
import jwtDecode from 'jwt-decode'
import AuthContext from '../context/AuthContext'
import {useState } from 'react'


function MyApp({ Component, pageProps }) {

  const [reloadUser, setreloadUser] = useState(false)
  const [auth, setAuth] = useState(undefined)

  const router = useRouter()
  const { pathname } = router

  useEffect(() => {
    const token = getToken()
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token)
      })
    } else {
      setAuth(null)
    }
  }, [reloadUser])

  const login = (token) => {
    setToken(token)
    setAuth({
      token,
      idUser: jwtDecode(token)
    })
  }

  const logout = (token) => {
    if (auth) {
      removeToken(token)
      setAuth(null)
      router.push('/')
    }
  }

  const setReloadUser = () => {
    setreloadUser(!reloadUser);
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth]
    );


  // useEffect(() => {
  //   // Perform localStorage action
  //   if (auth != null) {
  //     console.log(auth)
  //     console.log('hola')
  //   }
  // }, [auth])
  const excludeNav = ['/', '/login', '/register']
  const excludeUl = ['/', '/login', '/register', '/dashboard', '/configuration', '/appointmentDetails']

  if (auth === undefined) return null
  return (
    <AuthContext.Provider value={authData}>
      <div className='app'>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        {excludeNav.includes(pathname) 
          ? null 
          : <Nav/>
        }
        <Layout>
          {excludeNav.includes(pathname) ? null : <TopBar />}
          {/* {excludeUl.includes(pathname) ? null : <UlComponent />} */}
          <Component {...pageProps} />
        </Layout>
      </div>
    </AuthContext.Provider>
  )
}

export default MyApp