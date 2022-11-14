import Image from "next/image";
import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { getMedType } from "../../api/token";
import { getLabAppointments, getMedAppointments } from "../../api/appointments";
import Loader from "../../components/Loader";
export default function Appoinments() {

    const [tab, setTab] = useState(1)
    const { auth, logout } = useAuth()
    const router = useRouter()
    const [medType, setMedType] = useState(null)
    
    useEffect(() => {
        (async () => {
            if (!auth) {
                router.push('/login')
            } else {
                if (auth?.idUser.discriminator === 'admin') {
                    router.push('/dashboard')
                } else {
                    const medType = await getMedType()
                    setMedType(medType)
                }
            }
        })()
    })

    if (medType != null) {
        return (
            <>
            <div className="top-part-ul">
                <ul>
                    <li onClick={() => {setTab(1)}}>Ver Todas</li>
                    <li onClick={() => {setTab(2)}}>Proximas</li>
                    <li onClick={() => {setTab(3)}}>Pasadas</li>
                    <li onClick={() => {setTab(4)}}>Nuevas</li>
                </ul>  
            </div>
            {
                tab === 1 ? <ShowAllAppointments medType={medType} logout={logout} /> : tab === 2 ? <ShowUpcomingAppointments medType={medType} logout={logout}/> : tab === 3 ? <ShowPastAppointments medType={medType} logout={logout}/> : <ShowNewAppointments medType={medType} logout={logout}/> 
            }
            </>
        )
    }

    
}

const ShowAllAppointments = ({medType, logout}) => {

    const [appoinments, setAppoinments] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {  
        (async () => {
            setLoading(true)
            console.log(medType)
            if (medType == 0) {
                const response = await getMedAppointments(5, logout)
                if (response?.data) {
                    setAppoinments(response.data)
                    console.log(response.data)
                }
            } else {
                const response = await getLabAppointments(5, logout)
                if (response?.data) {
                    setAppoinments(response.data)
                    console.log(response.data)
                }
            }
            setLoading(false)
        })()

    },[])

  return (
    <div className="appoinment-page">
          {loading ? <Loader /> :
              (<div className="showrooms-page-body">
                  <table>
                      <thead>
                          <tr>
                              <td>Nombre</td>
                              <td>Telefono</td>
                              {medType == 1 && <td>Servicio</td>}
                              <td>Fecha</td>
                              <td>Hora</td>
                              <td>Consultorio</td>
                              <td>Estado</td>
                              <td>Acciones</td>
                          </tr>
                      </thead>
                      <tbody>
                          {appoinments.map((appointment) => {

                              switch (appointment?.status) {
                                  case 1:
                                      appointment.status = 'Pendiente'
                                      break;
                                  case 2:
                                      appointment.status = 'Aceptada'
                                      break;
                                  case 3:
                                      appointment.status = 'Rechazada'
                                      break;
                                  case 4:
                                      appointment.status = 'Finalizada'
                                    break;
                              }

                              return (
                                  <tr key={appointment.id}>
                                      <td>{`${appointment?.patient?.first_name} ${appointment?.patient?.last_name} ${appointment?.patient?.second_last_name ? appointment?.patient?.second_last_name : ''}`}</td>
                                      <td>{appointment?.patient?.phone}</td>
                                      {medType == 1 && <td>{appointment?.laboratory_service?.laboratory_service_name}</td>}
                                      <td>{appointment?.programmed_date}</td>
                                      <td>{`${appointment?.schedule_day_appointment.start_time}-${appointment?.schedule_day_appointment.end_time}`}</td>
                                      <td>{appointment?.room.room_block ? `Bloque ${appointment?.room.room_block} ` : ''}{appointment?.room.room_floor ? `Piso ${appointment?.room.room_floor} ` : ''}{`#${appointment?.room.room_number}`}</td>
                                      <td>{appointment.status}</td>
                                      <td>
                                          <button className="btn btn-primary" onClick={() => router.push(`/doctor/appointment/${appointment.id}`)}>Detalles</button>
                                      </td>
                                  </tr>
                                )
                        })}
                      </tbody>

                  </table>
              </div>)
          }
    </div>
  );
  
}

const ShowUpcomingAppointments = ({medType, logout}) => {

    const [appoinments, setAppoinments] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {  
        (async () => {
            setLoading(true)
            console.log(medType)
            if (medType == 0) {
                const response = await getMedAppointments(2, logout)
                if (response?.data) {
                    setAppoinments(response.data)
                    console.log(response.data)
                }
            } else {
                const response = await getLabAppointments(2, logout)
                if (response?.data) {
                    setAppoinments(response.data)
                    console.log(response.data)
                }
            }
            setLoading(false)
        })()

    },[])

  return (
    <div className="appoinment-page">
          {loading ? <Loader /> :
              (<div className="showrooms-page-body">
                  <table>
                      <thead>
                          <tr>
                              <td>Nombre</td>
                              <td>Telefono</td>
                              {medType == 1 && <td>Servicio</td>}
                              <td>Fecha</td>
                              <td>Hora</td>
                              <td>Consultorio</td>
                              <td>Estado</td>
                              <td>Acciones</td>
                          </tr>
                      </thead>
                      <tbody>
                          {appoinments.map((appointment) => {

                              switch (appointment?.status) {
                                  case 1:
                                      appointment.status = 'Pendiente'
                                      break;
                                  case 2:
                                      appointment.status = 'Aceptada'
                                      break;
                                  case 3:
                                      appointment.status = 'Rechazada'
                                      break;
                                  case 4:
                                      appointment.status = 'Finalizada'
                                    break;
                              }

                              return (
                                  <tr key={appointment.id}>
                                      <td>{`${appointment?.patient?.first_name} ${appointment?.patient?.last_name} ${appointment?.patient?.second_last_name ? appointment?.patient?.second_last_name : ''}`}</td>
                                      <td>{appointment?.patient?.phone}</td>
                                      {medType == 1 && <td>{appointment?.laboratory_service?.laboratory_service_name}</td>}
                                      <td>{appointment?.programmed_date}</td>
                                      <td>{`${appointment?.schedule_day_appointment.start_time}-${appointment?.schedule_day_appointment.end_time}`}</td>
                                      <td>{appointment?.room.room_block ? `Bloque ${appointment?.room.room_block} ` : ''}{appointment?.room.room_floor ? `Piso ${appointment?.room.room_floor} ` : ''}{`#${appointment?.room.room_number}`}</td>
                                      <td>{appointment.status}</td>
                                      <td>
                                          <button className="btn btn-primary" onClick={() => router.push(`/doctor/appointment/${appointment.id}`)}>Detalles</button>
                                      </td>
                                  </tr>
                                )
                        })}
                          

                      </tbody>

                  </table>
              </div>)
          }
    </div>
  );
}
const ShowPastAppointments = ({medType, logout}) => {

    const [appoinments, setAppoinments] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {  
        (async () => {
            setLoading(true)
            console.log(medType)
            if (medType == 0) {
                const response = await getMedAppointments(4, logout)
                if (response?.data) {
                    setAppoinments(response.data)
                    console.log(response.data)
                }
            } else {
                const response = await getLabAppointments(4, logout)
                if (response?.data) {
                    setAppoinments(response.data)
                    console.log(response.data)
                }
            }
            setLoading(false)
        })()

    },[])

  return (
    <div className="appoinment-page">
          {loading ? <Loader /> :
              (<div className="showrooms-page-body">
                  <table>
                      <thead>
                          <tr>
                              <td>Nombre</td>
                              <td>Telefono</td>
                              {medType == 1 && <td>Servicio</td>}
                              <td>Fecha</td>
                              <td>Hora</td>
                              <td>Consultorio</td>
                              <td>Estado</td>
                              <td>Acciones</td>
                          </tr>
                      </thead>
                      <tbody>
                          {appoinments.map((appointment) => {

                              switch (appointment?.status) {
                                  case 1:
                                      appointment.status = 'Pendiente'
                                      break;
                                  case 2:
                                      appointment.status = 'Aceptada'
                                      break;
                                  case 3:
                                      appointment.status = 'Rechazada'
                                      break;
                                  case 4:
                                      appointment.status = 'Finalizada'
                                    break;
                              }

                              return (
                                  <tr key={appointment.id}>
                                      <td>{`${appointment?.patient?.first_name} ${appointment?.patient?.last_name} ${appointment?.patient?.second_last_name ? appointment?.patient?.second_last_name : ''}`}</td>
                                      <td>{appointment?.patient?.phone}</td>
                                      {medType == 1 && <td>{appointment?.laboratory_service?.laboratory_service_name}</td>}
                                      <td>{appointment?.programmed_date}</td>
                                      <td>{`${appointment?.schedule_day_appointment.start_time}-${appointment?.schedule_day_appointment.end_time}`}</td>
                                      <td>{appointment?.room.room_block ? `Bloque ${appointment?.room.room_block} ` : ''}{appointment?.room.room_floor ? `Piso ${appointment?.room.room_floor} ` : ''}{`#${appointment?.room.room_number}`}</td>
                                      <td>{appointment.status}</td>
                                      <td>
                                          <button className="btn btn-primary" onClick={() => router.push(`/doctor/appointment/${appointment.id}`)}>Detalles</button>
                                      </td>
                                  </tr>
                                )
                        })}
                          

                      </tbody>

                  </table>
              </div>)
          }
    </div>
  );
}

const ShowNewAppointments = ({medType, logout}) => {

    const [appoinments, setAppoinments] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {  
        (async () => {
            setLoading(true)
            console.log(medType)
            if (medType == 0) {
                const response = await getMedAppointments(1, logout)
                if (response?.data) {
                    setAppoinments(response.data)
                    console.log(response.data)
                }
            } else {
                const response = await getLabAppointments(1, logout)
                if (response?.data) {
                    setAppoinments(response.data)
                    console.log(response.data)
                }
            }
            setLoading(false)
        })()

    },[])

  return (
    <div className="appoinment-page">
          {loading ? <Loader /> :
              (<div className="showrooms-page-body">
                  <table>
                      <thead>
                          <tr>
                              <td>Nombre</td>
                              <td>Telefono</td>
                              {medType == 1 && <td>Servicio</td>}
                              <td>Fecha</td>
                              <td>Hora</td>
                              <td>Consultorio</td>
                              <td>Estado</td>
                              <td>Acciones</td>
                          </tr>
                      </thead>
                      <tbody>
                          {appoinments.map((appointment) => {

                              switch (appointment?.status) {
                                  case 1:
                                      appointment.status = 'Pendiente'
                                      break;
                                  case 2:
                                      appointment.status = 'Aceptada'
                                      break;
                                  case 3:
                                      appointment.status = 'Rechazada'
                                      break;
                                  case 4:
                                      appointment.status = 'Finalizada'
                                    break;
                              }

                              return (
                                  <tr key={appointment.id}>
                                      <td>{`${appointment?.patient?.first_name} ${appointment?.patient?.last_name} ${appointment?.patient?.second_last_name ? appointment?.patient?.second_last_name : ''}`}</td>
                                      <td>{appointment?.patient?.phone}</td>
                                      {medType == 1 && <td>{appointment?.laboratory_service?.laboratory_service_name}</td>}
                                      <td>{appointment?.programmed_date}</td>
                                      <td>{`${appointment?.schedule_day_appointment.start_time}-${appointment?.schedule_day_appointment.end_time}`}</td>
                                      <td>{appointment?.room.room_block ? `Bloque ${appointment?.room.room_block} ` : ''}{appointment?.room.room_floor ? `Piso ${appointment?.room.room_floor} ` : ''}{`#${appointment?.room.room_number}`}</td>
                                      <td>{appointment.status}</td>
                                      <td>
                                          <button className="btn btn-primary" onClick={() => router.push(`/doctor/appointment/${appointment.id}`)}>Detalles</button>
                                      </td>
                                  </tr>
                                )
                        })}
                          

                      </tbody>

                  </table>
              </div>)
          }
    </div>
  );
}
