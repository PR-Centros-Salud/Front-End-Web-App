import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { faGear, faHospital, faBorderAll, faUserDoctor, faCalendarDays, faUser, faClipboard, faChevronLeft, faMagnifyingGlass, faDoorOpen, faFlaskVial, faArrowRightFromBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Nav = () => {

    const router = useRouter()
    const { pathname } = router
    let [isAdmin, setIsAdmin] = useState(false)
    let [password, setPassword] = useState("")
    const { auth, login, logout } = useAuth()
    
    useEffect(() => {
        // Perform localStorage action
        if (auth) {
            setIsAdmin(auth.idUser.discriminator === 'admin' ? true : false)
        }
    }, [])

    const handleLogout = () => {
        logout()
        router.push('/login')
    }


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
                    <AdminOptions router={router} />
                  )
                  : (
                    <DoctorOptions router={router} />
                )}   
                
                <div>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <input onClick={handleLogout} type="button" value={'Cerrar Sesión'} name="logout"/>
                </div>
            </div>   
        </div>
    </nav>
    
    </>
  )
}

const AdminOptions = ({router}) => {
    return (
        <>
            <div className='div-home' onClick={() => router.push('/dashboard')}>
                <FontAwesomeIcon icon={faBorderAll} />
                <input type="button" value={'Inicio'} name="home"/>
            </div>
            <div onClick={() => router.push('/admin/doctors')}>
                <FontAwesomeIcon icon={faUserDoctor} />
                <input type="button" value={'Doctores'} name="doctors"/>
            </div>
            <div onClick={() => router.push('/admin/rooms')}>
                <FontAwesomeIcon icon={faDoorOpen} />
                <input type="button" value={'Consultorios'} name="rooms"/>
            </div>
            <div onClick={() => router.push('/admin/laboratoryservice')}>
                <FontAwesomeIcon icon={faFlaskVial} />
                <input type="button" value={'Servicios de laboratorio'} name="laboratoryservice"/>
            </div>
            <div className='nav-section-1-3'>
                <div onClick={() => router.push('/configuration')}>
                    <FontAwesomeIcon icon={faGear} />
                    <input type="button" value={'Configuración'} name="settings"/>
                </div>
            </div>
        </>    
    )
}

const DoctorOptions = ({router}) => {
    return (
        <>
            <div className='div-home' onClick={() => router.push('/dashboard')}>
                <FontAwesomeIcon icon={faBorderAll} />
                <input type="button" value={'Inicio'} name="home"/>
            </div>
            <div onClick={() => router.push('#')}>
                <FontAwesomeIcon icon={faCalendarDays} />
                <input type="button" value={'Citas Medicas'} name="appointments"/>
            </div>
            <div className='nav-section-1-3'>
                <div onClick={() => router.push('/configuration')}>
                    <FontAwesomeIcon icon={faGear} />
                    <input type="button" value={'Configuración'} name="settings"/>
                </div>
            </div>
        </>
    )
}

export default Nav