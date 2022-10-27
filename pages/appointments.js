import Image from "next/image";
import AppointmentCardDoctor from "../components/AppointmentCardDoctor";
import { useState, useEffect } from 'react'


export default function Appoinments() {

    const [tab, setTab] = useState(1)

    return (
        <>
        <div className="top-part-ul">
            <ul>
                <li onClick={() => {setTab(1)}}>Ver Todas</li>
                <li onClick={() => {setTab(2)}}>Proximas</li>
                <li onClick={() => {setTab(3)}}>Pasadas</li>
                <li onClick={() => {setTab(4)}}>Nuevas</li>
            </ul>  
        </div>
        {
            tab === 1 ? <ShowAllAppointments /> : tab === 2 ? <ShowUpcomingAppointments /> : tab === 3 ? <ShowPastAppointments /> : <ShowNewAppointments /> 
        }
        </>
    )
}

const ShowAllAppointments = () => {
  return (
    <div className="appoinment-page">
        <div className="appoinment-page-body">
                <table>
                    <thead>
                        <tr>
                            <td>Foto</td>
                            <td>Nombre</td>
                            <td>Email</td>
                            <td>Fecha</td>
                            <td>Hora</td>
                            <td>Area</td>
                            <td>Estado</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <div className="image-container">
                              <Image
                                  priority
                                  src="/images/doctor-image.png"
                                  height={50}
                                  width={50}
                                  alt="doctor"
                            />
                            </div>
                            <td>Micaela Zalles 1</td>
                            <td>micaz@gmail.com</td>
                            <td>13/12/2022</td>
                            <td>12:00 AM</td>
                            <td>Pediatria</td>
                            <td>Finalizada</td>
                        </tr>
                   
                    </tbody>

       
                </table>
              </div>
        </div>
     

  );
}
const ShowUpcomingAppointments = () => {
  return (
    <div className="appoinment-page">
        <div className="showrooms-page-body">
                <table>
                    <thead>
                        <tr>
                            <td>Foto</td>
                            <td>Nombre</td>
                            <td>Email</td>
                            <td>Fecha</td>
                            <td>Hora</td>
                            <td>Area</td>
                            <td>Estado</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Image
                                priority
                                src="/images/doctor-image.png"
                                height={50}
                                width={50}
                                alt="doctor"
                            />
                            <td>Micaela Zalles 2</td>
                            <td>micaz@gmail.com</td>
                            <td>13/12/2022</td>
                            <td>12:00 AM</td>
                            <td>Pediatria</td>
                            <td>Finalizada</td>
                        </tr>
                   
                    </tbody>

       
                </table>
              </div>
        </div>
     

  );
}
const ShowPastAppointments = () => {
  return (
    <div className="appoinment-page">
        <div className="showrooms-page-body">
                <table>
                    <thead>
                        <tr>
                            <td>Foto</td>
                            <td>Nombre</td>
                            <td>Email</td>
                            <td>Fecha</td>
                            <td>Hora</td>
                            <td>Area</td>
                            <td>Estado</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Image
                                priority
                                src="/images/doctor-image.png"
                                height={50}
                                width={50}
                                alt="doctor"
                            />
                            <td>Micaela Zalles 3</td>
                            <td>micaz@gmail.com</td>
                            <td>13/12/2022</td>
                            <td>12:00 AM</td>
                            <td>Pediatria</td>
                            <td>Finalizada</td>
                        </tr>
                   
                    </tbody>

       
                </table>
              </div>
        </div>
     

  );
  
}

const ShowNewAppointments = () => {
  return (
    <div className="appoinment-page">
        <div className="showrooms-page-body">
                <table>
                    <thead>
                        <tr>
                            <td>Foto</td>
                            <td>Nombre</td>
                            <td>Email</td>
                            <td>Fecha</td>
                            <td>Hora</td>
                            <td>Area</td>
                            <td>Estado</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Image
                                priority
                                src="/images/doctor-image.png"
                                height={50}
                                width={50}
                                alt="doctor"
                            />
                            <td>Micaela Zalles 4</td>
                            <td>micaz@gmail.com</td>
                            <td>13/12/2022</td>
                            <td>12:00 AM</td>
                            <td>Pediatria</td>
                            <td>Finalizada</td>
                        </tr>
                   
                    </tbody>

       
                </table>
              </div>
        </div>
     

  );
  
}
