import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { faGear, faHospital, faBorderAll, faUserDoctor, faCalendarDays, faUser, faClipboard, faChevronLeft, faMagnifyingGlass, faDoorOpen, faFlaskVial, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Nav = () => {

    const router = useRouter()
    const { pathname } = router
    let [isAdmin, setIsAdmin] = useState(false)
    let [password, setPassword] = useState("")
    const { auth, login } = useAuth()
    
    useEffect(() => {
        // Perform localStorage action
        if (auth) {
            setIsAdmin(auth.idUser.discriminator === 'admin' ? true : false)
        }
    }, [])


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
                {isAdmin
                  ? (
                      <AdminOptions/>
                  )
                  : (
                    <DoctorOptions/>
                  )}  
                  <LogOut/>
                      
                
            </div>
            
        </div>
    </nav>
    
    </>
  )
}

const LogOut = () =>{
    <div>
    <FontAwesomeIcon icon={faArrowRightFromBracket} />
    <Link href={"/login"}>
        <input type="button" value={'Cerrar Session'} name="logout"/>
    </Link>
    </div>
}
const AdminOptions = () => {
    return (
        <>
            <div className='div-home'>
                <FontAwesomeIcon icon={faBorderAll} />
                <Link href={'/dashboard'}>
                    <input type="button" value={'Inicio'} name="home"/>
                </Link>
            </div>
            <div>
                <FontAwesomeIcon icon={faUserDoctor} />
                <Link href={'/admin/doctors'}>
                    <input type="button" value={'Doctores'} name="doctors"/>
                </Link>
            </div>
            <div>
                <FontAwesomeIcon icon={faDoorOpen} />
                <Link href={'/admin/rooms'}>
                    <input type="button" value={'Rooms'} name="rooms"/>
                </Link>
            </div>
            <div>
                <FontAwesomeIcon icon={faFlaskVial} />
                <Link href={'/admin/laboratoryservice'}>
                    <input type="button" value={'LaboratoryService'} name="laboratoryservice"/>
                </Link>
            </div>
            <div className='nav-section-1-3'>
                <div>
                    <FontAwesomeIcon icon={faGear} />
                    <Link href={"/configuration"}>
                        <input type="button" value={'Configuración de Institución'} name="settings"/>
                    </Link>
                </div>
            </div>
        </>    
    )
}

const DoctorOptions = () => {
    return (
        <>
            <div className='div-home'>
                <FontAwesomeIcon icon={faBorderAll} />
                <Link href={'/dashboard'}>
                    <input type="button" value={'Inicio'} name="home"/>
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
            <div className='nav-section-1-3'>
                <div>
                    <FontAwesomeIcon icon={faGear} />
                    <Link href={"configuration"}>
                        <input type="button" value={'Configuración'} name="settings"/>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Nav