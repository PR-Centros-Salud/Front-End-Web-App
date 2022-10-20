import Image from 'next/image'
import Link from 'next/link'

const DoctorCard = () => {
    return (
        <div className='doctor-card' >
            <Image
                priority
                src="/images/doctor-image.png"
                height={150}
                width={150}
                alt="doctor"
            />
            <div className='information'>
                <h2 className='full-name'>Micaela Zalles</h2>
                <h6 className='specialty'>Cardiologo</h6>
                <Link href={"configuration"}>
                    <button className='button-1'>Ver Perfil</button>
                </Link>
            </div>
        </div>
    )
  }
  
  export default DoctorCard