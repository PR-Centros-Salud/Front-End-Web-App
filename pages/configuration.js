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

    const [tab, setTab] = useState(1)

    return (
        <>
        <div className="top-part-ul">
            <ul>
                <li onClick={() => {setTab(1)}}>Institución</li>
                <li onClick={() => {setTab(2)}} className='admin-li'>Administrador</li>
            </ul>  
        </div>
        {
            tab === 1 ? <InstitutionConfiguration/> : <AdminConfiguration2/>
        }
        </>
    )
}

const InstitutionConfiguration = () => {
    return (
        <>
        <div className='configuration-page-section-1'>
            <div className='configuration-page-section-1-title'>
                <h1>Configuración de Perfil de Institución</h1>
                <h2>Foto de Perfil</h2>
            </div>

            <div className='configuration-page-section-1-profile-picture'>
                <Image
                    priority
                    src="/images/hospital.png"
                    height={100}
                    width={100}
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
            <h2>Informacion de la Institución</h2>
            <div className='configuration-page-section-2-information-inputs'>
                <form className='form'>
                    <div className='inputs-column-1'>
                        <div className='input-name-show'>
                            <h3>Nombre</h3>
                            <input
                                type="text"
                                className=""
                            />
                        </div>
                        <div className='input-name'>
                            <h3>Dirección</h3>
                            <input
                                type="text"
                                className=""
                            />
                        </div>
                        <div className='input-email'>
                            <h3>Número de Teléfono</h3>
                            <input
                                type="text"
                                className=""
                            />
                        </div>
                    </div>
                    <div className="map-container">
                        <h3>Ubicación</h3>
                        <Map/>
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

const AdminConfiguration2 = () => {
    return (
        <>
        <div className='configuration-page-section-1'>
            <div className='configuration-page-section-1-title'>
                <h1>Configuración de Perfil de Administrador</h1>
                <h2>Foto de Perfil</h2>
            </div>

            <div className='configuration-page-section-1-profile-picture'>
                <Image
                    priority
                    src="/images/admin.png"
                    height={100}
                    width={100}
                    alt="admin picture"
                />
                <div className='configuration-page-section-1-profile-buttons'>
                    <button className='button-1'>Subir</button>
                    <button className='button-2'>Borrar</button>
                </div>              
            </div>
        </div>
        <hr></hr>
        <div className='configuration-page-section-2-information'>
            <h2>Informacion del Administrador</h2>
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
                </form>
            </div>
            <div className='configuration-page-section-2-information-buttons'>
                <button className='button-1'>Guardar</button>
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