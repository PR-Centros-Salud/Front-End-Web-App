import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { faGear, faBorderAll, faUserDoctor, faCalendarDays, faUser, faClipboard, faChevronLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
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
                    <Link href={'/doctors'}>
                        <input type="button" value={'Doctores'} name="doctors"/>
                    </Link>
                </div>
                <div>
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <input type="button" value={'Citas Medicas'} name="appointments"/>
                </div>
                <div>
                    <FontAwesomeIcon icon={faUser} />
                    <input type="button" value={'Pacientes'} name="patients"/>
                </div>
                <div>
                    <FontAwesomeIcon icon={faClipboard} />
                    <input type="button" value={'Reportes'} name="reports"/>
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

export default Nav