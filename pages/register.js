import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

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
          <h1>Registrar.</h1>
          <div>
            <form className='form'>
            <input 
                  type="text"
                  className="form-control"
                  placeholder='Nombres'
              />
              <br/>
              <input 
                  type="text"
                  className="form-control"
                  placeholder='Apellidos'
              />
              <br/>
              <input 
                  type="text"
                  className="form-control"
                  placeholder='Usuario'
              />
              <br/>
              <input 
                  type="text"
                  className="form-control"
                  placeholder='Email'
              />
              <br/>
              <input
                  type="password"
                  className="form-control"
                  placeholder='Contraseña'
              />
              <br/>
              <input
                  type="password"
                  className="form-control"
                  placeholder='Confirmar Contraseña'
              />
              <br/>
              <Link  href="">
                <a className="forget-password-a">Olvidaste tu contraseña?</a>
              </Link>
              <br/>
              <button className="btn btn-primary">Iniciar Sesión</button>
            </form>
          </div>                    
      </div>  
    </div>
  )
}
