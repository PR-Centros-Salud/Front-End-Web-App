import Image from 'next/image'

const AddDoctor = () => {
    return (
      <div className='doctoradd-page-section-2'>
                  <form className='doctoradd-page-section-2-form'>
                      <div className='doctoradd-page-section-2-form-column-1'>
                          <div className='input-name'>
                              <h3>Nombre</h3>
                              <input
                                  type="text"
                                  className=""
                              />
                          </div>
                          <div className='input-last-name'>
                              <h3>Apellido</h3>
                              <input
                                  type="text"
                                  className=""
                              />
                          </div>
                          <div className='input-phone'>
                              <h3>Apellido</h3>
                              <input
                                  type="text"
                                  className=""
                              />
                          </div>
                          <div className='input-birthday'>
                              <h3>Fecha de Nacimiento</h3>
                              <input
                                  type="text"
                                  className=""
                              />
                          </div>
                          <div className='input-role'>
                              <h3>Rol</h3>
                              <input
                                  type="text"
                                  className=""
                              />
                          </div>
                          <div className='input-estimated-time'>
                              <h3>Tiempo estimado de Consulta</h3>
                              <input
                                  type="text"
                                  className=""
                              />
                          </div>
                      </div>
                      <div className='doctoradd-page-section-2-form-column-2'>
                          <div className='input-identifier'>
                              <h3>Carnet de Identidad</h3>
                              <input
                                  type="text"
                                  className=""
                              />
                          </div>
                          <div className='input-email'>
                              <h3>Correo Electronico</h3>
                              <input
                                  type="text"
                                  className=""
                              />
                          </div>
                          <div className='input-genre'>
                              <h3>Genero</h3>
                              <input
                                  type="text"
                                  className=""
                              />
                          </div>
                          <div className='input-birthday'>
                              <h3>Fecha de Nacimiento</h3>
                              <input
                                  type="text"
                                  className=""
                              />
                          </div>
                          <div className='input-adress'>
                              <h3>Direccion</h3>
                              <input
                                  type="text"
                                  className=""
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
                                          <lb className='option-add'>Agregar</lb>
                                          <lb className='option-remove'>Eliminar</lb>
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
                      </div>
  
  
                  </form>
              </div>
    )
}
  
export default AddDoctor