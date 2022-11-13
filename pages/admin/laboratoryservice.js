import Loader from '../../components/Loader'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getLaboratoryServicesApi, getLaboratorySpecialistsApi, deleteLaboratoryServiceApi } from '../../api/laboratory'
import { getRoomsApi } from '../../api/institution'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
export default function LaboratoryService() {

    const router = useRouter()
    const { auth, login, logout } = useAuth()
    const [labServices, setLabServices] = useState(null)
    const [rooms, setRooms] = useState(null)
    const [labSpecialists, setLabSpecialists] = useState(null)
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            laboratory_service_name: '',
            medical_personal_id: '0',
            room_id: '0',
        },
        onSubmit: async (values) => { 
            console.log(values)
            setLoading(true)
            if (values.laboratory_service_name === '' || values.medId === '0' || values.roomId === '0') {
                toast.error('Todos los campos son obligatorios')
            } else {
                if (labServices.find(service => service.laboratory_service_name.toLowerCase() === values.laboratory_service_name.toLowerCase())) {
                    toast.error('Ya existe un servicio con ese nombre')
                } else {
                    const response = await createLaboratoryServiceApi(values)
                    if (response?.data) {
                        toast.success("Servicio creado exitosamente.")
                        setLabServices([...labServices, response.data])
                    } else {
                        toast.error('Error al crear el servicio')
                    }
                }
                
            }
            setLoading(false)
        }
    })

    useEffect(() => { 
        (async () => {
            setLoading(true)
            if (!auth) {
                router.push('/login')
            } else {
                const labServices = await getLaboratoryServicesApi(logout)
                const labSpecialists = await getLaboratorySpecialistsApi(logout)
                const rooms = await getRoomsApi(logout, 2)
                if (labServices && labSpecialists && rooms) { 
                    setLabServices(labServices.data)
                    setLabSpecialists(labSpecialists.data)
                    setRooms(rooms.data)
                    console.log(labServices)
                    console.log(labSpecialists)
                    if (labSpecialists.data.length == 0) {
                        toast.error('No hay especialistas disponibles, por favor registre uno antes de agregar un servicio')
                        router.push('/admin/doctors')
                    } else if (rooms.data.length == 0) {
                        toast.error('No hay salas disponibles, por favor registre una antes de agregar un servicio')
                        router.push('/admin/rooms')
                    }
                    setLoading(false)
                }
            }
        })()
    }, [])


    
    return (
        <div className="laboratoryservice-page">
            <div className="laboratoryservice-page-container">
                {loading && <Loader />}
                {!loading && (labServices != null) && labSpecialists && (<>
                    <div className="laboratoryservice-page-container-title">
                        <h3>Servicios de Laboratorio</h3>
                        <p>Añadir Servicio de Laboratorio</p>
                    </div>
                    <div className="laboratoryservice-page-container-inputs">

                        <div className="laboratoryservice-page-container-inputs-name">
                            <h4>Nombre de Servicio de laboratorio</h4>
                            <input
                                type="text"
                                value={formik.values.laboratory_service_name}
                                onChange={formik.handleChange("laboratory_service_name")}
                            />
                            <h4>Encargado de Servicio</h4>
                            <select value={formik.values.medical_personal_id} onChange={formik.handleChange("medical_personal_id")}>
                                {labSpecialists.map((specialist) => (
                                    <option value={specialist.id} key={specialist.id}>{`${specialist.first_name} ${specialist.last_name}`}</option>
                                ))}
                                <option value="0">Seleccione un especialista</option>
                            </select>
                            <h4>Sala de Servicio</h4>
                            <select
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
                    <div className="laboratoryservice-page-container-buttons">
                        <div className="laboratoryservice-page-container-buttons-container">
                            <div className="button-add-buttons-container">
                                <button className="button-add" onClick={formik.handleSubmit}>Añadir</button>
                            </div>
                            <div className="button-discard-container">
                                <button className="button-discard" onClick={formik.resetForm}>Descartar</button> 
                            </div>
                        </div>
                    </div>
                    <div className="laboratoryservice-page-container-show">
                        <p>Mostrar Servicios de Laboratorio</p>
                        <div className="laboratoryservice-page-container-show-tables">
                            {labServices.length > 0 ? (<table>
                                <thead>
                                    <tr>
                                        <td>Nombre de Servicio</td>
                                        <td>Encargado de Servicio</td>
                                        <td>Sala de Servicio</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {labServices.map((service) => (
                                        <tr key={service.id}>
                                            <td>{service.laboratory_service_name}</td>
                                            <td>{`${service.medical_personal.first_name} ${service.medical_personal.last_name}`}</td>
                                            <td>{service.room.room_block ? `Bloque ${service.room.room_block} ` : ''}{service.room.room_floor ? `Piso ${service.room.room_floor} ` : ''}{`#${service.room.room_number}`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>): (<p>No hay servicios de laboratorio registrados</p>)}
                        </div>
                    </div>        
                </>)}
            </div>
        </div>        
    );
  }
  