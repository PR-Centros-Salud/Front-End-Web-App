import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Scrollbar } from 'react-scrollbars-custom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faMagnifyingGlass, faBan } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCircleCheck } from '@fortawesome/free-regular-svg-icons'

export default function Dashboard() {
    return (
        <div className='dashboard-page'>
            <div className='dashboard-page-section-2'>
                <div className='dashboard-page-section-2-1'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                        <input
                        type="text"
                        placeholder="Buscar..." />
                </div>
                <div className='dashboard-page-section-2-2'>
                    <div className='dashboard-page-section-2-2-1'>
                        <Image
                            priority
                            src="/images/image 2.svg"
                            height={70}
                            width={70}
                            alt="doctor"
                        />
                        <div className='info'>
                            <h3>Dr. Juan Perez</h3>
                            <h4>Cardiologo</h4>
                            <h6>32 Años, Universidad de Brigham</h6>
                        </div>
                    </div>
                    <div className='dashboard-page-section-2-2-2'>
                        <div className='title-section'>
                            <h3>Proximas Citas</h3>
                            <h4>Hoy dia -  13 de Diembre 2022</h4>
                        </div>
                        <div className='cards-section'>
                        </div>
                    </div>
                    <div className='dashboard-page-section-2-2-3'>
                        <div>
                            { <FontAwesomeIcon icon={faUser} /> }
                            <div className='mini-info'>
                                <h3>22</h3>
                                <h4>Pacientes por Atender</h4>
                            </div>
                        </div>
                        <div>
                            { <FontAwesomeIcon icon={faCircleCheck} /> }
                            <div className='mini-info'>
                                <h3>8</h3>
                                <h4>Pacientes Atendidos</h4>
                            </div>
                        </div>
                        <div>
                            { <FontAwesomeIcon icon={faBan} /> }
                            <div className='mini-info'>
                                <h3>2</h3>
                                <h4>Citas Canceladas</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-page-section-2-3'>

                </div>
            </div>
        </div>
    )
}