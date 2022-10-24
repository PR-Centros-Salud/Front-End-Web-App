import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import UlComponent from '../components/UlComponet'
import Map from '../components/Map'

export default function Configuration() {

    const router = useRouter()
    let [isAdmin, setIsAdmin] = useState(false)
    const { auth, login } = useAuth()

    if (!auth)
    { 
        router.push('/login')
    }

    useEffect(() => {
        if (auth) {
            setIsAdmin(auth.idUser.discriminator === 'admin' ? true : false)
        }
    }, [])


    return (
        <div className='configuration-page'>
            {isAdmin ? <AdminConfiguration /> : <DoctorConfiguration />}
        </div>
    )
}


const AdminConfiguration = () => {

    return (
        <>
        <div className='configuration-page-section-1'>
            <div className="top-part-ul">
                <ul>
                    <Link href={'#'}>
                        <li>Institución</li>
                    </Link>
                    <Link href={'#'}>
                        <li>Administrador</li>
                    </Link>
                </ul>  
            </div>
            <div className='configuration-page-section-1-title'>
                <h1>Configuración de Perfil de Institución</h1>
                <h2>Foto de Perfil</h2>
            </div>

            <div className='configuration-page-section-1-profile-picture'>
                <Image
                    priority
                    src="/images/hospital.png"
                    height={150}
                    width={150}
                    alt="profile picture"
                />
                <div className='configuration-page-section-1-profile-buttons'>
                    <button className='button-1'>Subir</button>
                    <button className='button-2'>Borrar</button>
                </div>              
            </div>
        </div>
        <hr></hr>
        <div className='configuration-page-section-2-information'>
            <h2>Informacion Personal</h2>
            <div className='configuration-page-section-2-information-inputs'>
                <form className='form'>
                    <div className='inputs-column-1'>
                        <div className='input-name-show'>
                            <h3>Contraseña Antigua</h3>
                            <input
                                type="password"
                                className=""
                            />
                        </div>
                        <div className='input-name'>
                            <h3>Contraseña Nueva</h3>
                            <input
                                type="password"
                                className=""
                            />
                        </div>
                        <div className='input-email'>
                            <h3>Confirmar Contraseña</h3>
                            <input
                                type="password"
                                className=""
                            />
                        </div>
                        </div>
                        <div className='leaflet-container'>
                            <Map />
                        </div>
                </form>
            </div>
            <div className='configuration-page-section-2-information-buttons'>
                <button className='button-1'>Guardar</button>
                <button className='button-2'>Descartar</button>
            </div>
        </div>
        </>
    )
}

const DoctorConfiguration = () => { 
    return (
        <>
            <div className='configuration-page-section-1'>

            <div className='configuration-page-section-1-title'>
                <h1>Configuración de Perfil</h1>
                <h2>Foto de Perfil</h2>
            </div>

            <div className='configuration-page-section-1-profile-picture'>
                <Image
                    priority
                    src="/images/image 2.svg"
                    height={150}
                    width={150}
                    alt="profile picture"
                />
                <div className='configuration-page-section-1-profile-buttons'>
                    <button className='button-1'>Subir</button>
                    <button className='button-2'>Borrar</button>
                </div>
                
            </div>
            </div>

            <hr></hr>
            <div className='configuration-page-section-2-information'>
                <h2>Informacion Personal</h2>
                <div className='configuration-page-section-2-information-inputs'>
                    <form className='form'>
                        <div className='inputs-column-1'>
                            <div className='input-name-show'>
                                <h3>Nombre a Mostrar</h3>
                                <input
                                    type="text"
                                    className=""
                                />
                            </div>
                            <div className='input-name'>
                                <h3>Nombre</h3>
                                <input
                                    type="text"
                                    className=""
                                />
                            </div>
                            <div className='input-email'>
                                <h3>Correo Electronico</h3>
                                <input
                                    type="email"
                                    className=""
                                />
                            </div>
                        </div>
                        <div className='inputs-column-2'>
                            <div className='input-description'>
                                <h3>Descripcion</h3>
                                <input
                                    type="text"
                                    className=""
                                />
                            </div>
                            <div className='input-lastName'>
                                <h3>Apellido</h3>
                                <input
                                    type="text"
                                    className=""
                                />
                            </div>
                            <div className='input-phone'>
                                <h3>Numero de Telefono</h3>
                                <input
                                    type="email"
                                    className=""
                                />
                            </div>                           
                            
                        </div>
                        <div className='inputs-column-3'>
                            <div className='input-name-password'>
                                <h3>Contraseña</h3>
                                <input
                                    type="text"
                                    className=""
                                />
                            </div>
                            <div className='input-confirm-password'>
                                <h3>Confirmar Contraseña</h3>
                                <input
                                    type="text"
                                    className=""
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className='configuration-page-section-2-information-buttons'>
                        <button className='button-1'>Guardar</button>
                        <button className='button-2'>Descartar</button>
                </div>
            </div>
        </>
    )
}