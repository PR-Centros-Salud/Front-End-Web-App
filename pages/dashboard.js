import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import AppointmentCard from '../components/AppointmentCard';
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import { getMeApi } from '../api/user'
import Loader from '../components/Loader'

export default function Dashboard({title}) {
    
    const router = useRouter()
    let [isAdmin, setIsAdmin] = useState(false);
    let [user, setUser] = useState(null);
    const { auth, login, logout } = useAuth() 
    console.log(title)

    
    if (!auth) {
        router.push('/login')
    }

    useEffect(() => {
        (async () => {
            if (auth) {
                setIsAdmin(auth.idUser.discriminator === 'admin' ? true : false)
                const user = await getMeApi(logout)
                setUser(user)
                console.log(user)
            }
        })()
    }, [auth, logout])

    

    return (
        <div className='dashboard-page'>
            {user == null ? <Loader /> : isAdmin ? <AdminDashboard user={user.data} /> : <DoctorDashboard user={user.data} />}
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
                        src="/images/image 2.svg"
                        height={70}
                        width={70}
                        alt="doctor"
                    />
                    <div>
                        <h3>Dr. Juan Perez</h3>
                        <h4>Cardiologo</h4>
                        <h6>32 Años, Universidad de Brigham</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DoctorDashboard = ({user}) => {
    const [date, setDate] = useState(new Date());

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
                    <h3>Dr. Juan Perez</h3>
                    <h4>Cardiologo</h4>
                    <h6>32 Años, Universidad de Brigham</h6>
                </div>
            </div>
            <div className='dashboard-page-section-2-doctor-2-2'>
                <div className='title-section'>
                    <h3>Proximas Citas</h3>
                    <h4>Hoy dia -  13 de Diembre 2022</h4>
                </div>
                <div className='cards-section'>
                    <AppointmentCard />
                    <AppointmentCard />
                </div>
            </div>
            <div className='dashboard-page-section-2-doctor-2-3'>
                <div>
                    { <FontAwesomeIcon icon={faUser} /> }
                    <div className='mini-info'>
                        <h3>22</h3>
                        <h4>Pacientes por Atender</h4>
                    </div>
                </div>
                <div>
                    { <FontAwesomeIcon icon={faCircleCheck} /> }
                    <div className='mini-info'>
                        <h3>8</h3>
                        <h4>Pacientes Atendidos</h4>
                    </div>
                </div>
                <div>
                    { <FontAwesomeIcon icon={faBan} /> }
                    <div className='mini-info'>
                        <h3>2</h3>
                        <h4>Citas Canceladas</h4>
                    </div>
                </div>
            </div>
        </div>
        <div className='dashboard-page-section-2-doctor-3'>
            <Calendar onChange={setDate} value={date} />
            <div className='dates-section'>
                <div className='date-card'>
                    <h3>Fernardo Rivera</h3>
                    <h4>09:00 AM - 10:00 AM</h4>
                </div>
            </div>
        </div>
    </div>)
}