import React from 'react'
import Image from 'next/image'
import useAuth from '../../../hooks/useAuth'
import { getMedType } from '../../../api/token'
import { getMedAppointment, getLabAppointment } from '../../../api/appointments'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '../../../components/Loader'
import { confirmLabAppointment, confirmMedAppointment, cancelLabAppointment, cancelMedAppointment, finishLabAppointment, finishMedAppointment } from '../../../api/appointments'
import { toast } from 'react-toastify';
import { Formik, useFormik } from 'formik'

export default function AppointmentDetails() {
    const router = useRouter()
    const {id} = router.query
    const { auth, logout } = useAuth()
    const [appointment, setAppoinment] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => { 
        
        (async () => {
            setLoading(true)
            if (id) {
                if (!auth) { 
                    router.push('/login')
                } else {
                    if (auth?.idUser.discriminator === 'admin') {
                        router.push('/dashboard')
                    } else {
                        const medType = await getMedType()
                        if (medType != null) {
                            if(medType == 0 ) {
                                const response = await getMedAppointment(id, logout)
                                if (response?.data) {
                                    switch (response.data?.status) {
                                        case 1:
                                            response.data.status = 'Pendiente'
                                            break;
                                        case 2:
                                            response.data.status = 'Aceptada'
                                            break;
                                        case 3:
                                            response.data.status = 'Cancelada'
                                            break;
                                        case 4:
                                            response.data.status = 'Finalizada'
                                            break;
                                    }
                                    setAppoinment(response.data)
                                    console.log(response.data)
                                }
                            } else {
                                const response = await getLabAppointment(id, logout)
                                if (response?.data) {
                                    switch (response.data?.status) {
                                        case 1:
                                            response.data.status = 'Pendiente'
                                            break;
                                        case 2:
                                            response.data.status = 'Aceptada'
                                            break;
                                        case 3:
                                            response.data.status = 'Cancelada'
                                            break;
                                        case 4:
                                            response.data.status = 'Finalizada'
                                            break;
                                    }
                                    setAppoinment(response.data)
                                    console.log(response.data)
                                }
                            }
                        }
                    }
                }
                setLoading(false)
            }
        })()
    }, [id])

    const medForm = useFormik({
        initialValues: {
            recipe: ''
        },
        onSubmit: async (values) => { 
            setLoading(true)
            const response = await finishMedAppointment(id, logout,values)
            if (response) {
                toast.success('Consulta finalizada')
                router.push('/doctor/appointments')
            } else {
                toast.error('Error al finalizar consulta')
                setLoading(false)
            }
        }
    })
    const labForm = useFormik({
        initialValues: {
            result: '',
            delivery_datetime: ''
        }, 
        onSubmit: async (values) => { 
            setLoading(true)
            if (values.delivery_datetime == '') {
                toast.error('Ingrese una fecha de entrega')
            } else {
                if (new Date(values.delivery_datetime) < Date.now()) { 
                    toast.error('Ingrese una fecha de entrega posterior a la actual')
                } else {
                    const response = await finishLabAppointment(id, logout, values)
                    if (response) {
                        toast.success('Consulta finalizada')
                        router.push('/doctor/appointments')
                    } else {
                        toast.error('Error al finalizar consulta')
                        setLoading(false)
                    }
                }
            }
        }
    })

    const handleCancel = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (appointment?.discriminator == "laboratory_appointment") { 
            const response = await cancelLabAppointment(appointment.id, logout)
            if (response?.data) {
                toast.success('Cita cancelada correctamente')
                router.push('/doctor/appointments')
            } else {
                toast.error('Error al cancelar la cita')
            }
        } else {
            const response = await cancelMedAppointment(appointment.id, logout)
            if (response?.data) {
                toast.success('Cita cancelada correctamente')
                router.push('/doctor/appointments')
            } else {
                toast.error('Error al cancelar cita')
                setLoading(false)
            }
        }
    }

    const handleConfirm = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (appointment?.discriminator == "laboratory_appointment") {
            const response = await confirmLabAppointment(appointment.id, logout)
            if (response?.data) {
                toast.success('Cita confirmada correctamente')
                router.push('/doctor/appointments')
            } else {
                toast.error('Error al confirmar la cita')
                setLoading(false)
            }
        } else {
            const response = await confirmMedAppointment(appointment.id, logout)
            if (response?.data) {
                toast.success('Cita confirmada correctamente')
                router.push('/doctor/appointments')
            } else {
                toast.error('Error al confirmar la cita')
                setLoading(false)
            }
        }
    }

    return (
        <div className="appointmentdetails-page">
            {loading ? <Loader /> : (
                <div className='details-content'>
                <div className='details-content-left'>
                    <div className='doctor-information'>
                        <h4>Nombre:</h4>
                        <h3>{`${appointment?.patient?.first_name} ${appointment?.patient?.last_name} ${appointment?.patient?.second_last_name ? appointment?.patient?.second_last_name : ''}`}</h3>
                        <h4>Email:</h4>
                        <h3>{`${appointment?.patient?.email}`}</h3>
                        <h4>Telefono:</h4>
                        <h3>{`${appointment?.patient?.phone}`}</h3>
                            {appointment?.laboratory_service != null && (
                            <div>
                                <h4>Servicio de Laboratorio:</h4>
                                <h3>{`${appointment?.laboratory_service.laboratory_service_name}`}</h3>
                            </div>
                        )}    
                    </div>
                </div>
                <div className='details-content-right'>
                    <h1>{appointment?.status}</h1>
                    <hr />  
                    <div className='information-part'>
                        <div className='information-part-1'>
                            <div className='information-part-1-1'>
                                <h4>Tipo de Cita:</h4>
                                    <input type="text" disabled value={appointment?.discriminator == "medical_appointment" ? 'Cita Medica' : 'Laboratorio'} />
                                <h4>Sala:</h4>
                                    <input type="text" disabled value={`${appointment?.room.room_block ? `Bloque ${appointment?.room.room_block} ` : ''} ${appointment?.room.room_floor ? `Piso ${appointment?.room.room_floor} ` : ''} ${`#${appointment?.room.room_number}`}`} />
                            </div>
                            <div className='information-part-1-2'>
                                <h4>Fecha:</h4>
                                <input type="text" disabled value={appointment?.programmed_date}/>
                                <h4>Hora:</h4>
                                <input type="text" disabled value={`${appointment?.schedule_day_appointment?.start_time}-${appointment?.schedule_day_appointment?.end_time}`}/>
                            </div>
                            </div>
                            {appointment?.status != 'Cancelada' ? (
                                <div className='information-part-2'>
                                <h1 className="option-h1">OPCIONES</h1>
                                <hr />
                                    <div className='information-part-2-1'>
                                        {appointment?.status == 'Pendiente' && (
                                            <>
                                                <button className='button1' onClick={handleConfirm}>Confirmar</button>
                                                <button className='button1' onClick={handleCancel}>Cancelar</button>
                                            </>
                                        )}
                                        {appointment?.status == 'Aceptada' && (
                                            <>
                                                {
                                                    appointment?.discriminator == "medical_appointment" ? (
                                                        <>
                                                            <h4>Receta:</h4>
                                                            <textarea className='textarea' placeholder='Receta' value={medForm.values.recipe} onChange={medForm.handleChange('recipe')}/>
                                                        </>
                                                    ): (
                                                            <>
                                                                <h4>Observaciones:</h4>
                                                                <textarea className='textarea' placeholder='Resultado' value={labForm.values.result} onChange={labForm.handleChange('result')}/>
                                                                <h4>Fecha:</h4>
                                                                <input type="datetime-local" value={labForm.values.delivery_datetime} onChange={labForm.handleChange('delivery_datetime')}/>
                                                            </>
                                                    )
                                                }
                                                <button className='button1' onClick={appointment?.discriminator == "medical_appointment" ? medForm.handleSubmit : labForm.handleSubmit}>Finalizar</button>
                                            </>
                                        )}
                                        {appointment?.status == 'Finalizada' && (
                                            <>
                                                {
                                                    appointment?.discriminator == "medical_appointment" ? (
                                                        <>
                                                            <h4>Receta:</h4>
                                                            <textarea className='textarea' placeholder='Receta' disabled value={appointment?.medical_appointment_recipe}/>
                                                        </>
                                                    ): (
                                                            <>
                                                                <h4>Observaciones:</h4>
                                                                <textarea className='textarea' placeholder='Resultado' value={appointment?.laboratory_results_resume} disabled/>
                                                                <h4>Fecha de Entrega:</h4>
                                                                <input type="datetime-local" disabled value={appointment?.laboratory_delivery_date} />
                                                            </>
                                                    )
                                                }
                                            </>
                                        )}

                                </div>
                            </div>
                            ) : (
                                <div className='information-part-2'>
                                    <h1 className="option-h1">No hay opciones disponibles</h1>
                                </div>
                            )}
                    </div>
                </div>
            </div>    
            )}
            
        </div>
    )
}