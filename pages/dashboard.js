import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faBorderAll, faUserDoctor, faCalendarDays, faUser, faClipboard, faChevronLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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