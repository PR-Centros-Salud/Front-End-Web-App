import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  // Mover a login
  // Reemplazar por landing page
  return (
    <div className='home-page'>
      <style jsx global>{`
        body{
          overflow-y:hidden;
        }
      `}</style>
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
              <Link href="/dashboard">
                <button className="btn btn-primary">Iniciar Sesión</button>
              </Link>
            </form>
          </div>                    
      </div>  
    </div>
  )
}
