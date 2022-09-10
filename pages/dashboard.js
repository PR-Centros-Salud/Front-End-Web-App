import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faBorderAll, faUserDoctor, faCalendarDays, faUser, faClipboard, faChevronLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
    return (
        <div className='dashboard-page'>
            <style jsx global>{`
                body{
                    overflow-y:hidden;
                }
            `}</style>
            <div className='dashboard-page-section-1'>
                <div className='dashboard-page-section-1-1'>
                    <Image
                        priority
                        src="/images/logo.svg"
                        height={60}
                        width={60}
                        alt="logo"
                    />
                    <h1>EASTWOOD CLINIC</h1>
                </div>
                <div className='dashboard-page-section-1-2'>
                    <div className='div-home'>
                        <FontAwesomeIcon icon={faBorderAll} />
                        <input type="button" value={'Inicio'} name="home"/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faUserDoctor} />
                        <input type="button" value={'Doctores'} name="doctors"/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <input type="button" value={'Citas Medicas'} name="appointments"/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                        <input type="button" value={'Pacientes'} name="patients"/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faClipboard} />
                        <input type="button" value={'Reportes'} name="reports"/>
                    </div>
                </div>
                <div className='dashboard-page-section-1-3'>
                    <div>
                        <FontAwesomeIcon icon={faGear} />
                        <input type="button" value={'Configuración'} name="settings"/>
                    </div>
                </div>
            </div>
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
                            src="/images/image-4.png"
                            height={60}
                            width={60}
                            alt="doctor"
                        />
                        <h1>Doctores</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}