import Link from "next/link"
import DoctorCard from "../../components/DoctorCard"
import UlComponent from "../../components/UlComponet"
import useAuth from "../../hooks/useAuth"
import {useState, useEffect} from "react"
import {getDoctorsApi} from "../../api/doctors"
import Loader from '../../components/Loader'
import { useRouter } from "next/router"
import Image from 'next/image'
import AddDoctor from "../../components/doctors/addDoctor"

export default function Doctors() {

  const {auth, logout} = useAuth()
  const router = useRouter()
  
  const [tab, setTab] = useState(1)


  if(!auth){
    router.push('/login')
  }

  return (
    <>
      <div className="top-part-ul">
            <ul>
                <li onClick={() => {setTab(1)}}>Ver doctores</li>
                <li onClick={() => {setTab(2)}} className='admin-li'>Agregar doctor</li>
            </ul>  
        </div>
      <div className="doctors-page">  
      {
          tab === 1 ? <ShowDoctors logout={ logout } /> : <AddDoctor/>
      }
      </div>
    </>
  )
}

const ShowDoctors = ({ logout }) => {
  const [doctors, setDoctors] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await getDoctorsApi(logout)

      setDoctors(response.data)
    })()
  }, [])

  return (
    <>
      {doctors == null ? <Loader /> : <DoctorList doctors={doctors} />}
    </>
  )
}


const DoctorList = ({ doctors }) => {
  
  return (
    <div className="doctors-page-cards-part">
      {doctors.length == 0 && <h1>No hay doctores registrados</h1>}
      {doctors.length > 0 && doctors.map((doctor, index) => (
        <DoctorCard key={index} doctor={doctor}/>
      ))}
    </div>
  )
}

