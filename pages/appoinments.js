import Image from "next/image";
import AppointmentCardDoctor from "../components/AppointmentCardDoctor";

export default function appoinments() {
  return (
    <div className="appoinment-page">
        <div className="appoinment-page-top">
            <div className="appoinment-page-top-information">
                <lb className="first-label">Foto</lb>
                <lb>Nombre</lb>
                <lb>Email</lb>
                <lb>Fecha</lb>
                <lb>Hora</lb>
                <lb>Area</lb>
                <lb>Estado</lb>
            </div>

        </div>
        <div className="appoinment-page-body">
                <AppointmentCardDoctor />
                <AppointmentCardDoctor />
                <AppointmentCardDoctor />
                <AppointmentCardDoctor />
        </div>
    </div>
     

  );
}
