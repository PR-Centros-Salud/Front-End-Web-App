import Link from "next/link"
import DoctorCard from "../../components/DoctorCard"
import UlComponent from "../../components/UlComponet"

export default function Doctors() {
  return (
    <div className="doctors-page">  
      <style jsx global>{`
        body{
          overflow-y:hidden;
        }
      `}</style>
      <div className="doctors-page-cards-part">
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
      </div>
    </div>
  )
}