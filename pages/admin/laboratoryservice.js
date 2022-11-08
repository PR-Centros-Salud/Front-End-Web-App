import Loader from '../../components/Loader'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getLaboratoryServicesApi, getLaboratorySpecialistsApi, createLaboratoryServiceApi } from '../../api/laboratory'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
export default function LaboratoryService() {

    const router = useRouter()
    const { auth, login, logout } = useAuth()
    const [labServices, setLabServices] = useState(null)
    const [labSpecialists, setLabSpecialists] = useState(null)
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            medId: '0',
        },
        onSubmit: async (values) => { 
            console.log(values)
            setLoading(true)
            if (values.name === '' || values.medId === '0') {
                toast.error('Todos los campos son obligatorios')
            } else {
                if (labServices.find(service => service.name === values.name)) {
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
                if (labServices && labSpecialists) { 
                    setLabServices(labServices.data)
                    setLabSpecialists(labSpecialists.data)
                    console.log(labServices)
                    console.log(labSpecialists)
                    if (labSpecialists.data.length == 0) {
                        toast.error('No hay especialistas disponibles, por favor registre uno antes de agregar un servicio')
                        router.push('/admin/doctors')
                    }
                    setLoading(false)
                }
            }
        })()
    },[])


    
    return (
        <div className="laboratoryservice-page">
            <div className="laboratoryservice-page-container">
                {loading && <Loader />}
                {!loading && (labServices != null) && labSpecialists && (<>
                    <div className="laboratoryservice-page-container-title">
                        <h3><u>Servicios de Laboratorio</u></h3>
                        <p>Añadir Servicio de Laboratorio</p>
                    </div>
                    <div className="laboratoryservice-page-container-inputs">

                        <div className="laboratoryservice-page-container-inputs-name">
                            <h4>Nombre de Servicio de laboratorio</h4>
                            <input
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange("name")}
                            />
                            <h4>Encargado de Servicio</h4>
                            <select value={formik.values.medId} onChange={formik.handleChange("medId")}>
                                {labSpecialists.map((specialist) => (
                                    <option value={specialist.id} key={specialist.id}>{`${specialist.first_name} ${specialist.last_name}`}</option>
                                ))}
                                <option value="0">Seleccione un especialista</option>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {labServices.map((service) => (
                                        <tr key={service.id}>
                                            <td>{service.laboratory_service_name}</td>
                                            <td>{`${service.medical_personal.first_name} ${service.medical_personal.last_name}`}</td>
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
  