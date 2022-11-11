import Image from 'next/image'

const AppointmentCard = () => {
    return (
        <div className='appointment-card'>
            <Image
                className='card-image'
                priority
                src="/images/image_4.png"
                height={70}
                width={70}
                alt="doctor"
            />
                <div className='information'>
                <h4 className='status'>Aceptada</h4>
                <h2 className='full-name'>Micaela Zalles</h2>
                <h6 className='time'>11:00 AM - 11:30 AM</h6>
            </div>

    </div>
    )
  }
  
  export default AppointmentCard