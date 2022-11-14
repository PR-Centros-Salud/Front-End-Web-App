import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect } from 'react';
import { getMedAppointments, getLabAppointments } from '../api/appointments'
import AppointmentCard from '../components/AppointmentCard';
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import { getMeApi } from '../api/user'
import Loader from '../components/Loader'
import { setMedType } from '../api/token'

export default function Dashboard({title}) {
    
    const router = useRouter()
    let [isAdmin, setIsAdmin] = useState(false);
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);
    const { auth, login, logout } = useAuth() 
    const [appointments, setAppointments] = useState(null)
    
    if (!auth) {
        router.push('/login')
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            if (auth) {
                setIsAdmin(auth.idUser.discriminator === 'admin' ? true : false)
                const user = await getMeApi(logout)
                setUser(user.data)
                if (auth.idUser.discriminator !== 'admin') {
                    if (user?.data?.contracts[0].is_lab_personal == 0) {
                        const appointments = await getMedAppointments(6, logout)
                        if (appointments?.data) {
                            setAppointments(appointments.data)
                        }
                    } else {
                        const appointments = await getLabAppointments(6, logout)
                        if (appointments?.data) {
                            setAppointments(appointments.data)
                        }
                    }
                    setMedType(user.data.contracts[0].is_lab_personal)
                }
                setLoading(false)
            }
        })()
    }, [auth, logout])

    return (
        <div className='dashboard-page'>
            {loading ? <Loader /> : isAdmin ? <AdminDashboard user={user} /> : <DoctorDashboard user={user} appointments={appointments} />}
        </div>
    )
}

const AdminDashboard = ({user}) => {
    return (
        <div className='dashboard-page-section-2-admin'>
            <div>
                <div>
                    <Image
                        priority
                        src="/images/logo.svg"
                        height={200}
                        width={200}
                        alt="logo"
                    />
                    <div>
                        <h6>Bienvenido al Programa de Administración</h6>
                    </div>
                    <div>
                        <h3>Admin: {`${user.first_name} ${user.last_name} ${user.second_last_name ? user.second_last_name : ''}`}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DoctorDashboard = ({ user, logout, appointments }) => {
    return (
    <div className='dashboard-page-section-2-doctor'>
        <div className='dashboard-page-section-2-doctor-2'>
            <div className='dashboard-page-section-2-doctor-2-1'>
                <Image
                    priority
                    src="/images/image 2.svg"
                    height={70}
                    width={70}
                    alt="doctor"
                />
                <div className='info'>
                    <h3>{`${user.first_name} ${user.last_name} ${user.second_last_name ? user.second_last_name : ''}`}</h3>
                    <h4>{`${user.contracts[0].role}`}</h4>
                    <h5>{`Organizacion: ${user.contracts[0].institution.name}`}</h5>    
                </div>
            </div>
                <div className='dashboard-page-section-2-doctor-2-2'>
                <div className='title-section'>
                    <h3>Proximas Citas</h3>
                    <h4>Hoy - {`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`}</h4>
                </div>
                <div className='cards-section'>
                        {appointments?.length > 0 ? appointments.map((appointment, index) => (
                            <AppointmentCard key={index} appointment={appointment} />
                        )) : <div className='no-appointments'><FontAwesomeIcon icon={faBan} /><h3>No hay citas pendientes para hoy.</h3></div>}
                        
                </div>
            </div>
        </div>
        <div className='dashboard-page-section-2-doctor-3'>
            <div className='dashboard-page-section-2-doctor-3-1'>
                <div>
                    { <FontAwesomeIcon icon={faUser} /> }
                    <div className='mini-info'>
                        <h3>{ appointments?.filter(e => e.status == 2).length}</h3>
                        <h4>Pacientes por Atender</h4>
                    </div>
                </div>
                <div>
                    { <FontAwesomeIcon icon={faCircleCheck} /> }
                    <div className='mini-info'>
                        <h3>{ appointments?.filter(e => e.status == 4).length}</h3>
                        <h4>Pacientes Atendidos</h4>
                    </div>
                </div>
                <div>
                    { <FontAwesomeIcon icon={faBan} /> }
                    <div className='mini-info'>
                        <h3>{ appointments?.filter(e => e.status == 3).length}</h3>
                        <h4>Citas Canceladas</h4>
                    </div>
                </div>
            </div>
            {/* <div className='dates-section'>
                <div className='date-card'>
                    <h3>Fernardo Rivera</h3>
                    <h4>09:00 AM - 10:00 AM</h4>
                </div>
            </div> */}
        </div>
    </div>)
}