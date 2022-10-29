import React from 'react'
import Image from 'next/image'

export default function appointmentDetails() {
    return (
        <div className="appointmentdetails-page">
            <div className='details-content'>
                <div className='details-content-left'>
                    <Image
                        priority
                        src="/images/image 2.svg"
                        height={200}
                        width={200}
                        alt="Doctor"
                    />
                    <div className='doctor-information'>
                        <h4>Nombre:</h4>
                        <h3>Dr. John Doe</h3>
                        <h4>Email:</h4>
                        <h3>mepicaelculo@gmail.com</h3>
                        <h4>Telefono:</h4>
                        <h3>123456789</h3>
                    </div>
                </div>
                <div className='details-content-right'>
                    <h1>ACEPTADA</h1>
                    <hr />  
                    <div className='information-part'>
                        <div className='information-part-1'>
                            <div className='information-part-1-1'>
                                <h4>Doctor:</h4>
                                <input type="text" />
                                <h4>Hospital/Clínica:</h4>
                                <input type="text" />
                            </div>
                            <div className='information-part-1-2'>
                                <h4>Área:</h4>
                                <input type="text" />
                                <h4>Hora:</h4>
                                <input type="text" />
                            </div>
                        </div>
                        <div className='information-part-2'>
                            <h1 className="option-h1">OPCIONES</h1>
                            <hr />
                            <button>Finalizar</button>
                            <button>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}