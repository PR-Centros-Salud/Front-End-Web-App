import Image from 'next/image'
const AppointmentCardDoctor = () => {
    return (
        <div className='appointment-card-doctor'>
            <div className='image-container'>
                <Image
                    className='image-person'
                    priority
                    src="/images/image_4.png"
                    height={70}
                    width={70}
                    alt="doctor"
                />
            </div>
                <div className='information-container'>
                    <div className='container-full-name'>
                        <lb className='full-name'>Micaela Zalles</lb>
                    </div>
                    <div className='container-email'>
                        <lb className='email'>micaz@gmail.com</lb>
                    </div>
                    <div className='container-date'>
                        <lb className='date'>13/12/2022</lb>
                    </div>
                    <div className='container-time'>
                        <lb className='time'>11:30 AM</lb>
                    </div>
                    <div className='container-area'>
                        <lb className='area'>Cardiologia</lb>
                    </div>
                    <div className='container-status'>
                        <lb className='status'>Aceptada</lb>
                    </div>
                    
                </div>
        </div>

    )
  }
  
  export default AppointmentCardDoctor