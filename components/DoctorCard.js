import Image from 'next/image'
const DoctorCard = () => {
    return (
        <div className='doctor-card'>
            <Image
                priority
                src="/images/image_4.png"
                height={150}
                width={150}
                alt="doctor"
            />
            <div className='information'>
                <h2 className='full-name'>Micaela Zalles</h2>
                <h6 className='specialty'>Cardiologo</h6>
                <button className='button-1'>Ver Perfil</button>
            </div>
        </div>
    )
  }
  
  export default DoctorCard