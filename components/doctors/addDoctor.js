import Image from 'next/image'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { getProvincesApi } from '../../api/config'
import { getRoomsApi } from '../../api/institution'
import { createDoctorApi, addScheduleApi, deleteDoctorApi } from '../../api/doctors'
import Loader from '../Loader'
import Select from 'react-select'

const AddDoctor = ({ setTab }) => {

    const router = useRouter()
    let [loading, setLoading] = useState(false)
    let [scheduleLoading, setScheduleLoading] = useState(false) 
    let [provinces, setProvinces] = useState(null)
    const options = [
        { value: '1', label: 'Lunes' },
        { value: '2', label: 'Martes' },
        { value: '3', label: 'Miercoles' },
        { value: '4', label: 'Jueves' },
        { value: '5', label: 'Viernes' },
        { value: '6', label: 'Sabado' },
        { value: '7', label: 'Domingo' }
    ]
    let [rooms, setRooms] = useState(null)
    let [selectedDays, setSelectedDays] = useState([])
    const { auth, logout } = useAuth()

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            second_last_name: '',
            email: '',
            phone: '',
            identity_card: '',
            gender: '0',
            birthdate: '',
            province_id: '0',
            address: '',
            role: '',
            is_lab_personal: '2',
            estimated_appointment_time: '',
            end_time: '',
            start_time: '',
            room_id: '0',
        },
        onSubmit: async (values) => {
            setLoading(true)
            if (values.first_name.length < 4 || values.last_name.length < 4 === '' ||
                values.email.length < 4 === '' || values.phone === '' ||
                values.identity_card === '' || values.gender === '0' ||
                values.birthdate === '' || values.province_id === '0' ||
                values.role.length < 4 === '' || values.is_lab_personal === '2' ||
                values.start_time === '' || values.end_time === '') {
                toast.error('Todos los campos son obligatorios y deben tener una longitud minima de 4 caracteres.')
            } else {
                if(values.is_lab_personal == '0' && values.room_id == '0'){
                    toast.error('Debe seleccionar una consultorio designado')
                } else {
                    if (values.start_time >= values.end_time) {
                        toast.error('La hora de inicio debe ser menor a la hora de fin')
                    } else {
                        if (values.estimated_appointment_time < 30) {
                            toast.error('El tiempo estimado de la cita debe ser mayor a 30 minutos')
                        } else {
                            const consult_time = new Date(new Date("1970/01/01 " + values.start_time).getTime() + values.estimated_appointment_time * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
                            if (consult_time >= values.end_time) {
                                toast.error('El intervalo de trabajo no puede ser menor al tiempo de consulta')
                            } else {
                                const diff = Date.now() - new Date(values.birthdate).getTime()
                                const ageDate = new Date(diff)
                                let age = Math.abs(ageDate.getUTCFullYear() - 1970)
                                console.log(age)
                                if (age < 18) {
                                    toast.error('El doctor debe ser mayor de edad')
                                } else {
                                    if (selectedDays.length === 0) {
                                        toast.error('Debe seleccionar al menos un dia de trabajo')
                                    } else {
                                        const { first_name, last_name, second_last_name, email, phone, identity_card, address, gender, birthdate, province_id, role, is_lab_personal } = values
                                        const doctorData = { first_name, last_name, second_last_name, email, phone, identity_card, address, gender, birthdate, province_id, role, is_lab_personal }
                                        const response = await createDoctorApi(logout, doctorData)

                                        if (response) {
                                            if (response?.status) {
                                                if (response.status == 200) {
                                                    toast.success('Doctor creado con exito, generando horario de trabajo.')
                                                    setScheduleLoading(true)
                                                    const id = response.data.id
                                                    const { start_time, end_time, estimated_appointment_time, room_id } = values
                                                    const scheduleData = { start_time, end_time, estimated_appointment_time, room_id, id, schedule_day_list: selectedDays, is_lab_personal}
                                                    const responseSchedule = await addScheduleApi(logout, scheduleData)
                                                    if (responseSchedule) {
                                                        if (responseSchedule?.status) {
                                                            if (responseSchedule.status == 200) {
                                                                toast.success('Horario creado con exito')
                                                                setTab(1)
                                                            }
                                                        } else {
                                                            if (responseSchedule.response?.data?.detail) {
                                                                if (responseSchedule.response?.data?.detail == "Room is taken for that day") {
                                                                    toast.error('El consultorio seleccionado ya esta siendo utilizado por otro medico.')
                                                                } else {
                                                                    toast.error('Error al generar el horario')
                                                                }
                                                            }
                                                            const responseDelete = await deleteDoctorApi(logout, id)
                                                        }
                                                    }
                                                    setScheduleLoading(false)
                                                }
                                            } else {
                                                console.log(response.response)
                                                if (response.response?.data?.detail) {
                                                    if (response.response.data.detail == 'Email already exists') {
                                                        toast.error('El email ingresado ya existe')
                                                    } else if (response.response.data.detail == 'Identity card already exists') {
                                                        toast.error('La cedula ingresada ya existe')
                                                    } else if (response.response.data.detail == 'Phone already exists') {
                                                        toast.error('El telefono ingresado ya existe')
                                                    } else if (response.response.data.detail == 'Phone number is not valid.') {
                                                        toast.error('El telefono ingresado no es valido')
                                                    }else {
                                                        toast.error('Error al crear el doctor')
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            setLoading(false)
        }
    })

    useEffect(() => {
        (async () => {
            setLoading(true)
            const provinces = await getProvincesApi()
            console.log(provinces)
            if (provinces?.data) {
                setProvinces(provinces.data)
            }
            const rooms = await getRoomsApi()
            if (rooms?.data) {
                setRooms(rooms.data)
            }
            setLoading(false)
        })()
    }, [])

    return (
        <div className='doctoradd-page-section-2'>
        {scheduleLoading ? <Loader /> : (
            <form className='doctoradd-page-section-2-form' onSubmit={formik.handleSubmit}>
            <div className='doctoradd-page-section-2-form-column-1'>
                <div className='input-name'>
                    <h3>Nombres</h3>
                    <input
                        type="text"
                        value={formik.values.firstName}
                        onChange={formik.handleChange('first_name')}
                            
                    />
                </div>
                <div className='input-last-name'>
                    <h3>Apellido</h3>
                    <input
                        type="text"
                            value={formik.values.lastName}
                            onChange={formik.handleChange('last_name')}
                    />
                </div>
                <div className='input-phone'>
                    <h3>Segundo Apellido</h3>
                    <input
                        type="text"
                            value={formik.values.secondLastName}
                            onChange={formik.handleChange('second_last_name')}
                    />
                </div>
                <div className='input-birthday'>
                    <h3>Fecha de Nacimiento</h3>
                    <input
                        type="date"
                        value={formik.values.birthdate}
                        onChange={formik.handleChange('birthdate')}
                    />
                </div>
                <div className='input-role'>
                    <h3>Rol</h3>
                    <input
                        type="text"
                            value={formik.values.role}
                            onChange={formik.handleChange('role')}
                    />
                </div>
                <div className='input-estimated-time'>
                    <h3>Tiempo estimado de Consulta</h3>
                    <input
                        type="text"
                            value={formik.values.estimated_appointment_time}
                            onChange={formik.handleChange('estimated_appointment_time')}
                    />
                </div>
                <div className='input-room'>
                        <h3>Consultorio Designado</h3>
                        <select
                            disabled={formik.values.is_lab_personal === '1'}
                            value={formik.values.room_id}
                            onChange={formik.handleChange('room_id')}
                        >
                            <option value='0'>Selecciona un consultorio</option>
                            {rooms?.map(room => (
                                <option key={room.id} value={room.id}>{room.room_block ? `Bloque ${room.room_block} ` : ''}{room.room_floor ? `Piso ${room.room_floor} ` : ''}{`#${room.room_number}`}</option>
                            ))}
                        </select>
                </div>    
            </div>
            <div className='doctoradd-page-section-2-form-column-2'>
                <div className='input-identifier'>
                    <h3>Carnet de Identidad</h3>
                    <input
                        type="text"
                            value={formik.values.identityCard}
                            onChange={formik.handleChange('identity_card')}
                    />
                </div>
                <div className='input-email'>
                    <h3>Correo Electronico</h3>
                    <input
                        type="text"
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                    />
                </div>
                <div className='input-genre'>
                    <h3>Genero</h3>
                    <select
                        value={formik.values.gender}
                        onChange={formik.handleChange('gender')}>
                        <option value="0">Seleccione un genero</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="U">Otro</option>
                    </select>
                    </div>
                    <div className='input-province'>
                    <h3>Provincia</h3>
                    <select
                        value={formik.values.province_id}
                        onChange={formik.handleChange('province_id')}>
                        <option value="0">Seleccione una provincia</option>
                        {provinces?.map((province) => (
                            <option key={province.id} value={province.id}>{province.province_name}</option>
                        ))}
                    </select>
                </div>
                <div className='input-adress'>
                    <h3>Direccion</h3>
                    <input
                        type="text"
                        value={formik.values.address}
                        onChange={formik.handleChange('address')}
                    />
                </div>
                <div className='input-phone'>
                    <h3>Numero de Telefono</h3>
                    <input
                        type="text"
                        value={formik.values.phone}
                        onChange={formik.handleChange('phone')}
                    />
                    </div>
                <div className='input-phone'>
                    <h3>Personal de Laboratorio</h3>
                    <select
                        value={formik.values.is_lab_personal}
                            onChange={formik.handleChange('is_lab_personal')}>
                            <option value="2">Seleccione una opcion</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                    </select>
                </div>
            </div>
            <div className='doctoradd-page-section-2-form-column-3'>
                <div className='doctoradd-page-section-2-form-column-3-image'>
                    <h2>Horario de Trabajo</h2>
                </div> 
                <div className='input-schedule-1'>
                        <h4>Dias</h4>
                        <Select menuColor='red' options={options} isMulti onChange={(e) => setSelectedDays(e)} />
                </div> 
                <div className='input-schedule-2'>
                        <h4>Hora de Inicio</h4>
                        <input
                        type="time"
                        value={formik.values.startTime}
                        onChange={formik.handleChange('start_time')}
                    />
                </div> 
                <div className='input-schedule-3'>
                        <h4>Hora de Finalizacion</h4>
                        <input
                        type="time"
                        value={formik.values.endTime}
                        onChange={formik.handleChange('end_time')}
                    />
                </div>
                <button className='button-add' type="submit">{loading ? 'Creando Doctor...' : 'Agregar Doctor'}</button>
            </div>
        </form>      
        )}
    </div>
    )
}
  
export default AddDoctor