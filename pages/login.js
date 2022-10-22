import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getToken } from '../api/token';
import { loginApi } from '../api/user';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth';
import * as Yup from "yup";
import jwtDecode from 'jwt-decode';

export default function Home() {
  // Variable con estado, Funcion para cambiar el estado de esa variable
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { auth, login } = useAuth()

  const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
    },
    onSubmit: async (values) => { 
      console.log(values)
      setIsLoading(true)
      if (values.user === '' || values.password === '') {
        toast.error('Todos los campos son obligatorios')
      } else {
        const response = await loginApi(values)
        if (response) {
          const credentials = jwtDecode(response.data.access_token)
          if (credentials.discriminator === 'admin' || credentials.discriminator === 'medical_personal') {
            login(response.data.access_token)
            toast.success("Login exitoso.")
            router.push('/dashboard')
          } else {
            toast.error("No tienes permisos para acceder a esta aplicación.")
          }
        } else {
          toast.error('Usuario o contraseña incorrectos')
        }
      }
      setIsLoading(false)
    }
  })
  
  if (auth) {
    router.push('/dashboard')
  }

  return (
    <div className='home-page'>
      <div className='home-page-section-1'>
          <Image
              priority
              src="/images/logo.svg"
              height={150}
              width={150}
              alt="logo"
              className="logo-image"
        />
          <h2>EAST WOOD CLINIC</h2>
      </div>
      <div className='home-page-section-2' color='white'>
          <h1>Cuida tu salud, <br/> cuida tu vida.</h1>
          <h1>Iniciar Sesión.</h1>
          <div>
            <form className='form' onSubmit={formik.handleSubmit}>
              <input 
              type="text"
              className="form-control"
              placeholder='Usuario'
              id='username'
              value={formik.values.user}
              onChange={formik.handleChange("user")}
              />
              <br/>
              <input
                  type="password"
                  className="form-control"
                  placeholder='Contraseña'
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
              />
              <br/>
              <Link  href="">
                <a className="forget-password-a">Olvidaste tu contraseña?</a>
              </Link>
              <br/>
            <button type="submit" className="btn btn-primary">{ isLoading ? "Cargando" : "Iniciar Sesión"}</button>
            </form>
          </div>                    
      </div>  
    </div>
  )
}
