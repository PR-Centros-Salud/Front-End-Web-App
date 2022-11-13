import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Loader from '../../../components/Loader';
import { deleteDoctorApi, getDoctorApi } from '../../../api/doctors';
import useAuth from '../../../hooks/useAuth';
import Select from 'react-select'
import { toast } from 'react-toastify';

const ViewDoctor = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const { auth, logout } = useAuth();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(false);
    const dayList = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

    useEffect(() => {
        if (id) {
            setLoading(true);
            (async () => {
                const response = await getDoctorApi(logout, id);
                console.log(response.data)
                setDoctor(response.data);
                setLoading(false);
            })()
        }
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const id = doctor.id
        setLoading(true);
        setDoctor(null);
        const response = await deleteDoctorApi(logout, id);
        if (response?.data?.detail == "Medical Personal removed successfully") {
            toast.success("Doctor eliminado correctamente");
            router.push('/admin/doctors')
        }
        setLoading(false);
    }

    return (
        <div className='doctor-page'>
            {loading && doctor == null ? <Loader /> : (
                <>
                <div className='doctor-page-section-1'>
                    <form className='doctor-page-section-1-form' onSubmit={handleSubmit}>
                    <div className='doctor-page-section-1-form-column-1'>
                        <div className='input-name'>
                            <h3>Nombres</h3>
                            <input
                                type="text"
                                disabled
                                value={doctor?.first_name}
                                    
                            />
                        </div>
                        <div className='input-last-name'>
                            <h3>Apellido</h3>
                            <input
                                    type="text"
                                    disabled
                                    value={doctor?.last_name}
                            />
                        </div>
                        <div className='input-phone'>
                            <h3>Segundo Apellido</h3>
                            <input
                                    type="text"
                                    disabled
                                    value={doctor?.second_last_name ? doctor?.second_last_name : ''}

                            />
                        </div>
                        <div className='input-birthday'>
                            <h3>Fecha de Nacimiento</h3>
                            <input
                                    type="date"
                                    disabled
                                value={doctor?.birthdate}
                            />
                        </div>
                        <div className='input-role'>
                            <h3>Rol</h3>
                            <input
                                    type="text"
                                    disabled
                                    value={doctor?.contract?.role}
                            />
                        </div>
                        <div className='input-estimated-time'>
                            <h3>Tiempo estimado de Consulta</h3>
                            <input
                                    type="text"
                                    disabled
                                    value={doctor?.contract?.schedule?.estimated_appointment_time}
                            />
                        </div>
                        <div className='input-room'>
                                <h3>Consultorio Designado</h3>
                                <input
                                    type="text"
                                    disabled
                                        value={doctor?.room ? `${doctor?.room.room_block ? `Bloque ${doctor?.room.room_block} ` : ''}${doctor?.room.room_floor ? `Piso ${doctor?.room.room_floor} ` : ''}${`#${doctor?.room.room_number}`}`: 'Sin Consultorio Fijo'}
                                />
                        </div>    
                            </div>
                            <div className='doctor-page-section-1-form-column-2'>
                    <div className='input-identifier'>
                        <h3>Carnet de Identidad</h3>
                        <input
                                type="text"
                                disabled
                                value={doctor?.identity_card}
                        />
                    </div>
                    <div className='input-email'>
                        <h3>Correo Electronico</h3>
                        <input
                            type="text"
                            disabled
                            value={doctor?.email}
                        />
                    </div>
                    <div className='input-genre'>
                        <h3>Genero</h3>
                            <input
                                type="text"
                                disabled
                                value={doctor?.gender == 'M' ? 'Masculino' : doctor?.gender == 'F' ? 'Femenino' : 'Otro'}
                            />    
                        </div>
                        <div className='input-province'>
                            <h3>Provincia</h3>
                            <input type="text" disabled value={doctor?.province.province_name} />
                    </div>
                    <div className='input-adress'>
                        <h3>Direccion</h3>
                        <input
                            type="text"
                            disabled
                            value={doctor?.address}
                        />
                    </div>
                    <div className='input-phone'>
                        <h3>Numero de Telefono</h3>
                        <input
                            type="text"
                            disabled
                            value={doctor?.phone}
                        />
                        </div>
                    <div className='input-phone'>
                        <h3>Personal de Laboratorio</h3>
                        <input 
                            type="text"
                            disabled
                            value={doctor?.contract?.is_lab_personal == 1 ? 'Si' : 'No'}/>
                    </div>
                            </div>
                            <div className='doctoradd-page-section-2-form-column-3'>
                <div className='doctoradd-page-section-2-form-column-3-image'>
                    <h2>Horario de Trabajo</h2>
                </div> 
                <div className='input-schedule-1'>
                        <h4>Dias de Trabajo</h4>
                            <div className='input-schedule-1-days'>
                                {doctor?.contract?.schedule?.schedule_day_list.map((day, index) => { 
                                    return (
                                        <div className='input-schedule-1-days-day' key={index}>
                                            <input type="text" disabled value={dayList[day.day-1]} />
                                        </div>
                                    )
                                })}
                        </div>                        
                </div> 
                <div className='input-schedule-2'>
                        <h4>Hora de Inicio</h4>
                        <input
                        type="time"
                        value={doctor?.contract?.schedule?.schedule_day_list[0].start_time}
                        disabled
                    />
                </div> 
                <div className='input-schedule-3'>
                        <h4>Hora de Finalizacion</h4>
                        <input
                        type="time"
                        value={doctor?.contract?.schedule?.schedule_day_list[0].end_time}
                        disabled
                    />
                    </div>
                <button className='button-delete' type="submit">Eliminar doctor</button>
            </div>
                    </form>
                </div>
                
                </>
            )}
        </div>
    );
}

export default ViewDoctor