import Image from "next/image";

export default function addDoctors() {
  return (
    <div className="doctorinsert-page">
      <div className="doctorinsert-page-top">
        <input placeholder={"Inserte el CI"} type={"number"} />
        <button>BUSCAR</button>
      </div>
      <div className="doctorinsert-page-form">
        <div className="doctorinsert-page-form-1">
          <Image
            priority
            src="/images/doctor-image.png"
            height={120}
            width={120}
            alt="doctor"
          />
          <div className="content">
            <h5>Nombre:</h5>
            <h3>Dr. Mauricio Teran</h3>
            <h5>Email:</h5>
            <h3>mauricioteran@gmail.com</h3>
          </div>
        </div>
        <div className="doctorinsert-page-form-2">
          <div className="content-part">
            <div className="content-part-1">
              <h3>Rol</h3>
              <input type={"text"} placeholder={"Ingrese el ROL"} />
              <h3>Tiempo estimado de consulta</h3>
              <input
                type={"number"}
                placeholder={"Ingrese el Tiempo Estimado"}
              />
            </div>
            <div className="content-part-2">
              <h3>Añadir Horario</h3>
              <div className="schedule-insert">
                <div className="schedule-insert-days">
                  <h1>Dia:</h1>
                  <input type={"text"} placeholder={"Ingrese el dia"} />
                </div>
                <div className="schedule-insert-hours">
                  <h1>Hora:</h1>
                  <input type={"time"} placeholder={"Inicio"} />
                  <input type={"time"} placeholder={"Fin"} />
                </div>
              </div>
            </div>
            <div className="content-part-3">
              <h3>Horario</h3>
              <div className="schedule-part">

              </div>
            </div>
          </div>
          <div className="submit-button-part">
            
          </div>
        </div>
      </div>
    </div>
  );
}
