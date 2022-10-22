import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import NavLandingPage from '../components/NavLandingPage'

export default function LandingPage() {
  return (
    <div className='landing-page'>
        <NavLandingPage/>
        <div className='landing-page-section-1'>
            <div className='landing-page-section-1-information'>
                <div className='landing-page-section-1-information-text'>
                    <h1>Cuidar tu salud, es el<br/>primer paso para estar<br/>mejor!</h1>
                    <p>Agenda citas con los doctores de tu preferencia desde la <br/> comodidad de tu telefono movil, sin esperas, sin filas y <br/> con un servicio de calidad.</p>      
                </div>
                <div className='landing-page-section-1-information-stores'>
                    <Image
                        priority
                        src="/images/appstore.png"
                        height={51}
                        width={148}
                        alt="appstore"
                        className="appstore-image"
                    />
                    <Image
                        priority
                        src="/images/playstore.png"
                        height={51}
                        width={148}
                        alt="playstore"
                        className="playstore-image"
                    />
                </div>
            </div>
        
            <div className='landing-page-section-1-ilustration'>
                <Image
                    priority
                    src="/images/ilustration.svg"
                    height={600}
                    width={600}
                    alt="ilustration"
                    className="ilustration-image"
                />
            </div>  

        </div>  
        <div className='landing-page-section-2'>

      </div>  
    </div>
  )
}
