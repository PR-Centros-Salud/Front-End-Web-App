import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import UlComponent from '../components/UlComponet'
import Map from '../components/Map'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { changePasswordApi } from '../api/user'
import { getAdminByIdApi, updateInstitutionApi } from '../api/admin'
import Loader from '../components/Loader'

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
    const [loading, setLoading] = useState(false)
    const { auth, login, logout } = useAuth()
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        (async () => {
            setLoading(true)
        
            const user = await getAdminByIdApi(auth.idUser.id, logout)
            if (user && user?.data) {
                console.log(user)
                setAdmin(user.data)
                setLoading(false)
            } else {
                toast.error('Error al cargar los datos')
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
        <div className="top-part-ul">
            <ul>
                <li onClick={() => {setTab(1)}}>Institución</li>
                <li onClick={() => {setTab(2)}} className='admin-li'>Administrador</li>
            </ul>  
            </div>
            {loading && <Loader />}
            {
                (loading == false && admin != null) && tab === 1 && <InstitutionConfiguration institution={admin?.institution}/>
            }
            {
                (loading == false && admin != null) && tab === 2 && <AdminConfiguration2/>
            }

        </>
    )
}

const InstitutionConfiguration = ({ institution }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { auth, login, logout } = useAuth()

    const formik = useFormik({
        initialValues: {
            name: institution?.name,
            address: institution?.address,
            phone: institution?.phone,
            latitude: institution?.latitude,
            longitude: institution?.longitude,
        },
        onSubmit: async (values) => { 
            setLoading(true)
            if (values.name != institution.name || values.address != institution.address || values.phone != institution.phone || values.latitude != institution.latitude || values.longitude != institution.longitude) {
                if(values.name == '' || values.address == '' || values.phone == '') {
                    toast.error('Todos los campos son obligatorios')
                } else {
                    const response = await updateInstitutionApi(institution.id, values, logout)
                    if (response) {
                        toast.success('Datos actualizados correctamente')
                        router.reload()
                        setLoading(false)
                    } else {
                        toast.error('Error al actualizar los datos')
                    }
                }
            } else {
                toast.error('No se han realizado cambios')
            }
        }
    })

    const handleMapChange = (lat, lng) => { 
        formik.setFieldValue('latitude', lat)
        formik.setFieldValue('longitude', lng)
    }


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
                    src="/images/hospital2.svg"
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
                                value={formik.values.name}
                                onChange={formik.handleChange("name")}    
                            />
                        </div>
                        <div className='input-name'>
                            <h3>Dirección</h3>
                            <input
                                type="text"
                                value={formik.values.address}
                                onChange={formik.handleChange("address")}    
                            />
                        </div>
                        <div className='input-email'>
                            <h3>Número de Teléfono</h3>
                            <input
                                type="text"
                                value={formik.values.phone}
                                onChange={formik.handleChange("phone")}
                            />
                        </div>
                    </div>
                    <div className="map-container">
                        <h3>Ubicación</h3>
                            <Map lat={formik.values.latitude} lng={formik.values.longitude} handleMapChange={handleMapChange} />
                    </div>
                </form>
            </div>
            <div className='configuration-page-section-2-information-buttons'>
                    <button className='button-1' onClick={formik.handleSubmit}>{loading ? "Cargando..." : "Guardar"}</button>
                <button className='button-2' onClick={() => router.push('/dashboard')}>Descartar</button>
            </div>
        </div>
        </>
    )
}

const AdminConfiguration2 = () => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { auth, login, logout } = useAuth()
    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        onSubmit: async (values) => {
            setIsLoading(true)
            if (values.oldPassword !== values.newPassword) {
                if (values.newPassword === values.confirmPassword) {
                    if (values.newPassword.length >= 12) {
                        const response = await changePasswordApi(logout, values.oldPassword, values.newPassword)
                        if (response) {
                            console.log(response)
                            if (response?.status && response.status >= 200 && response.status < 300) {
                                toast.success('Contraseña cambiada con éxito')
                                logout()
                                router.push('/login')
                            } else {
                                toast.error('Contraseña incorrecta')
                            }
                        }
                        else {
                            toast.error('Error al cambiar la contraseña')
                        }
                    }
                    else {
                        toast.error('La contraseña debe tener al menos 12 caracteres')
                    }
                }
                else {
                    toast.error('Las contraseñas no coinciden')
                }
            } else {
                toast.error('La contraseña nueva no puede ser igual a la anterior')
            }

            setIsLoading(false)
        }
    })


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
                    src="/images/admin2.svg"
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
                                value={formik.values.oldPassword}    
                                onChange={formik.handleChange("oldPassword")}    
                            />
                        </div>
                        <div className='input-name'>
                            <h3>Contraseña Nueva</h3>
                            <input
                                type="password"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange("newPassword")}
                            />
                        </div>
                        <div className='input-email'>
                            <h3>Confirmar Contraseña</h3>
                            <input
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange("confirmPassword")}
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div className='configuration-page-section-2-information-buttons'>
                    <button className='button-1' onClick={formik.handleSubmit}>{ isLoading ? "Cargando..." : "Guardar"}</button>
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