import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Loader from '../../../components/Loader';
import { getDoctorApi } from '../../../api/doctors';
import useAuth from '../../../hooks/useAuth';

const ViewDoctor = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const { auth, logout } = useAuth();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(false);

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

    return (
        <div className='doctor-page'>
            {loading && doctor == null ? <Loader /> : (
                <div className='doctor-page-section-1'>
                    <form className='doctor-page-section-1-form'>
                    <div className='doctoradd-page-section-2-form-column-1'>
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
                                />
                        </div>    
                    </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ViewDoctor