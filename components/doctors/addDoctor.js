import Image from 'next/image'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { getProvincesApi } from '../../api/config'
import Loader from '../Loader'

const AddDoctor = () => {
    const router = useRouter()
    let [loading, setLoading] = useState(false)
    let [provinces, setProvinces] = useState(null)
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            secondLastName: '',
            email: '',
            phone: '',
            identityCard: '',
            gender: '0',
            birthDate: '',
            provinceId: '0',
            address: '',
            role: '',
            isLabPersonnel: '0',
            estimatedTime: '',
        },
        onSubmit: async (values) => {
            setLoading(true)
            console.table(values)
            if (values.firstName === '' || values.lastName === '' || values.email === '' || values.phone === '' || values.identityCard === '' || gender === '0' || birthDate === '' || provinceId === '0' || department === '' || role === '' || isLabPersonnel === '2') {
                toast.error('Todos los campos son obligatorios')
            } else {
                toast.success('Doctor creado exitosamente')
            }
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
            setLoading(false)
        })()
    }, [])

    return (
      <div className='doctoradd-page-section-2'>
        <form className='doctoradd-page-section-2-form' onSubmit={formik.handleSubmit}>
            <div className='doctoradd-page-section-2-form-column-1'>
                <div className='input-name'>
                    <h3>Nombres</h3>
                    <input
                        type="text"
                        value={formik.values.firstName}
                        onChange={formik.handleChange('firstName')}
                            
                    />
                </div>
                <div className='input-last-name'>
                    <h3>Apellido</h3>
                    <input
                        type="text"
                            value={formik.values.lastName}
                            onChange={formik.handleChange('lastName')}
                    />
                </div>
                <div className='input-phone'>
                    <h3>Segundo Apellido</h3>
                    <input
                        type="text"
                            value={formik.values.secondLastName}
                            onChange={formik.handleChange('secondLastName')}
                    />
                </div>
                <div className='input-birthday'>
                    <h3>Fecha de Nacimiento</h3>
                    <input
                        type="date"
                        value={formik.values.birthDate}
                        onChange={formik.handleChange('birthDate')}
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
                            value={formik.values.estimatedTime}
                            onChange={formik.handleChange('estimatedTime')}
                    />
                </div>
            </div>
            <div className='doctoradd-page-section-2-form-column-2'>
                <div className='input-identifier'>
                    <h3>Carnet de Identidad</h3>
                    <input
                        type="text"
                            value={formik.values.identityCard}
                            onChange={formik.handleChange('identityCard')}
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
                        value={formik.values.provinceId}
                        onChange={formik.handleChange('provinceId')}>
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
            </div>
            <div className='doctoradd-page-section-2-form-column-3'>
                <div className='doctoradd-page-section-2-form-column-3-image'>
                    <h3>Fotografia</h3>
                    <div className='doctoradd-page-section-2-form-column-3-image-input'>
                        <Image
                            priority
                            src="/images/image 2.svg"
                            height={150}
                            width={150}
                            alt="profile picture"
                        />
                        <div className='input-image-buttons'>
                            <div className='input-image-buttons-options'>
                                <button disabled className='option-add'>Agregar</button>
                                <button disabled className='option-remove'>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='input-description'>
                        <h3>Descripcion</h3>
                        <textarea>  

                        </textarea>
                </div> 
                <div className='input-schedule'>
                        <h3>Horario</h3>
                        <textarea>  

                        </textarea>
                </div> 
                <button>Enviar</button>
            </div>

        </form>
    </div>
    )
}
  
export default AddDoctor