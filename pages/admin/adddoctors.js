import Image from "next/image"

export default function addDoctors() {
    return (
        <div className='doctorinsert-page'>
            <div className='doctorinsert-page-section-2'>
                <div className='doctorinsert-page-section-2-form'>
                    <form className='form'>
                        <div className='inputs-column-1'>
                            <div className='input-name'>
                                <h3>Nombre</h3>
                                <input
                                    type="text"
                                    className=""
                                />
                            </div>
                            <div className='input-lastName'>
                                <h3>Apellido</h3>
                                <input
                                    type="text"
                                    className=""
                                />
                            </div>
                            <div className='input-phone'>
                                <h3>Numero de Telefono</h3>
                                <input
                                    type="email"
                                    className=""
                                />
                            </div>   
                            <div className='input-email'>
                                <h3>Correo Electronico</h3>
                                <input
                                    type="email"
                                    className=""
                                />
                            </div>
                            <button className='button-1'>Agregar Doctor</button>
                        </div>
                        <div className='inputs-column-2'>
                            <div className='image-area'>
                                <h3>Fotografia</h3>
                                <div className='input-image'>
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
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}