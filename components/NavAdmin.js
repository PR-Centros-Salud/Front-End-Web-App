import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { faGear, faBorderAll, faUserDoctor, faHospital } from '@fortawesome/free-solid-svg-icons'

const NavAdmin = () => {
  return (
    <>
    <nav className="nav">
        <div className='nav-section-1'>
            <div className='nav-section-1-1'>
                <Image
                    priority
                    src="/images/logo.svg"
                    height={60}
                    width={60}
                    alt="logo"
                />
                <h1>EASTWOOD CLINIC</h1>
            </div>
            <div className='nav-section-1-2'>
                <div className='div-home'>
                    <FontAwesomeIcon icon={faBorderAll} />
                    <Link href={'/dashboard'}>
                        <input type="button" value={'Inicio'} name="home"/>
                    </Link>
                </div>
                <div>
                    <FontAwesomeIcon icon={faUserDoctor} />
                    <Link href={'admin/doctors'}>
                        <input type="button" value={'Doctores'} name="doctors"/>
                    </Link>
                </div>
                <div>
                    <FontAwesomeIcon icon={faHospital} />
                    <input type="button" value={'Hospitales'} name="institutions"/>
                </div>
            </div>
            <div className='nav-section-1-3'>
                <div>
                    <FontAwesomeIcon icon={faGear} />
                    <Link href={'/configuration'}>
                        <input type="button" value={'Configuración'} name="settings"/>
                    </Link>
                </div>
            </div>
        </div>
        
    </nav>
    
    </>
  )
}

export default NavAdmin