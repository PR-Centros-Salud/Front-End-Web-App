import { Html } from 'next/document';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Router } from 'next/router';

export default function Home() {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   var user = document.getElementById("user");
  //   var password = document.getElementById("password");

  //   if (user == "admin" && password == "admin") {
  //     Router.push('/dashboard');
  //   } else {
  //     alert("Usuario o contraseña incorrectos");
  //   }
  // };
  
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
              />
              <br/>
              <input
                  type="password"
                  className="form-control"
                  placeholder='Contraseña'
              />
              <br/>
              <Link  href="">
                <a className="forget-password-a">Olvidaste tu contraseña?</a>
              </Link>
              <br/>
              <Link href={'dashboard'}>
                <button className="btn btn-primary">Iniciar Sesión</button>
              </Link>
            </form>
          </div>                    
      </div>  
    </div>
  )
}