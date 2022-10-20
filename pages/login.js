import { Html } from 'next/document';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function Home() {
  // Variable con estado, Funcion para cambiar el estado de esa variable
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (user == "admin" && password == "admin") {
      router.push('/dashboard')
      localStorage.setItem('isAdmin', true);
    } else {
      router.push('/dashboard')
      localStorage.setItem('isAdmin', false);
    }
  };
  
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
            <form className='form'>
              <input 
              type="text"
              className="form-control"
              placeholder='Usuario'
              id='username'
              value={user}
              onChange={e => setUser(e.target.value)}
              />
              <br/>
              <input
                  type="password"
                  className="form-control"
                  placeholder='Contraseña'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
              />
              <br/>
              <Link  href="">
                <a className="forget-password-a">Olvidaste tu contraseña?</a>
              </Link>
              <br/>
              <button onClick={handleSubmit} className="btn btn-primary">Iniciar Sesión</button>
            </form>
          </div>                    
      </div>  
    </div>
  )
}