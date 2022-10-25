import Link from "next/link"
import DoctorCard from "../../components/DoctorCard"
import UlComponent from "../../components/UlComponet"
import useAuth from "../../hooks/useAuth"
import {useState, useEffect} from "react"
import {getDoctorsApi} from "../../api/doctors"
import Loader from '../../components/Loader'
import {useRouter} from "next/router"

export default function Doctors() {

  const {auth, logout} = useAuth()
  const router = useRouter()
  const [doctors, setDoctors] = useState(null)

  if(!auth){
    router.push('/login')
  }

  useEffect(() => {
    (async () => {
      if(auth){
        const response = await getDoctorsApi(logout)
        setDoctors(response.data)
      }
    })()
  }, [auth])

  return (
    <div className="doctors-page">  
      {doctors == null ? <Loader /> : <DoctorList doctors={doctors} />}
    </div>
  )
}


const DoctorList = ({doctors}) => {
  return (
    <div className="doctors-page-cards-part">
      {doctors.length == 0 && <h1>No hay doctores registrados</h1>}
      {doctors.length > 0 && doctors.map((doctor, index) => (
        <DoctorCard key={index} doctor={doctor}/>
      ))}
    </div>
  )
}