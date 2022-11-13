
import { useState, useEffect } from 'react'
import Loader from '../../components/Loader'
import { getRoomsApi } from '../../api/institution'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { addRoomApi } from '../../api/institution'

export default function Rooms() {

    const [tab, setTab] = useState(1)
    const { auth, logout } = useAuth()
    
    if (!auth) {
        router.push('/login')
    }

    return (
        <>
        <div className="top-part-ul">
            <ul>
                <li onClick={() => {setTab(1)}}>Ver</li>
                <li onClick={() => {setTab(2)}}>Añadir</li>
            </ul>  
        </div>
        {
                tab === 1 ? <ShowRooms logout={logout} /> : <AddRooms logout={logout} setTab={setTab} />
        }
        </>
    )
}

const ShowRooms = ({logout}) => {

    const [rooms, setRooms] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        (async () => {
            setLoading(true)
            const response = await getRoomsApi(logout, 3)
            if (response?.data) {
                console.log(response.data)
                setRooms(response.data)
                setLoading(false)
            } else {
                toast.error('Error al cargar los cuartos')
            }
        })()
    }, [])


    return (
        <div className="showrooms-page">
            {rooms == null && loading ? <Loader /> : (
                <>
                <p className="title">Cuartos de Consulta</p>
                <div className="showrooms-page-body">
                    <table>
                        <thead>
                            <tr>
                                <td>Tipo</td>
                                <td>Numero</td>
                                <td>Bloque</td>
                                <td>Piso</td>
                            </tr>
                        </thead>
                        <tbody>
                                {rooms?.map((room, index) => (
                                    <tr key={index}>
                                        <td>{room.room_type == 1 ? "Consultorio Medico" : "Laboratorio"}</td>
                                        <td>{room.room_number}</td>
                                        <td>{room.room_block ? room.room_block : "Sin Bloque"}</td>
                                        <td>{room.room_floor ? room.room_floor : "Sin Piso"}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                </>
            )}
            
        </div>      
    );
  }
const AddRooms = ({ logout, setTab }) => {

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            room_type: '0',
            room_number: '',
            room_block: '',
            room_floor: ''
        },
        onSubmit: async(values) => {
            setLoading(true)
            if (values.room_number == '') {
                toast.error('El numero de cuarto es requerido')
            } else if (values.room_type == '0') {
                toast.error('Seleccione un tipo de cuarto')
            } else {
                const response = await addRoomApi(logout, values)
                if (response?.data) {
                    toast.success('Cuarto añadido correctamente')
                    setTab(1)
                } else {
                    toast.error('Error al añadir el cuarto.')
                }
                
            }
            setLoading(false)
        }
    },
    )

    return (
        <div className="addrooms-page">
            {loading ? <Loader /> : (
                <div className="addrooms-page-container">
                <div className="addrooms-page-container-title">
                    <h3>Cuartos de Consulta</h3>
                </div>
                <div className="addrooms-page-container-inputs">

                    <div className="addrooms-page-container-inputs-type">
                        <h3>Tipo de Cuarto</h3>
                        <select
                            type="text"
                            value={formik.values.room_type}
                            onChange={formik.handleChange('room_type')}
                            >
                                <option value="0">Seleccione un tipo de cuarto</option>
                                <option value="1">Consultorio Medico</option>
                                <option value="2">Laboratorio</option>
                        </select>
                    </div>
                    <div className="addrooms-page-container-inputs-block">
                        <h3>Bloque</h3>
                        <input
                            type="text" 
                            value={formik.values.room_block}
                            onChange={formik.handleChange('room_block')}
                        />
                    </div>
                    <div className="addrooms-page-container-inputs-loor">
                        <h3>Piso</h3>
                        <input
                            type="text" 
                            value={formik.values.room_floor}
                            onChange={formik.handleChange('room_floor')}    
                        />
                    </div>
                    <div className="addrooms-page-container-inputs-number">
                        <h3>Numero de identificacion</h3>
                        <input
                            type="text" 
                            value={formik.values.room_number}
                            onChange={formik.handleChange('room_number')}
                        />
                    </div>
                </div>
                <div className="addrooms-page-container-buttons">
                        <div className="addrooms-page-container-buttons-container">
                            <div className="button-add-buttons-container">
                                <button onClick={formik.handleSubmit} className="button-add">Añadir</button>
                            </div>
                            <div className="button-discard-container">
                                <button onClick={ () => setTab(1)} className="button-discard">Descartar</button> 
                            </div>
                        </div>

                        
                </div>
            </div>
            )}
        </div>        
    );
  }
  