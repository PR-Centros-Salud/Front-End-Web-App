import Image from 'next/image'

const AppointmentCard = ({appointment}) => {
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
                <h2 className='full-name'>{`${appointment?.patient?.first_name} ${appointment?.patient?.last_name} ${appointment?.patient?.second_last_name ? appointment?.patient?.second_last_name : ''} `}</h2>
                <h6 className='time'>{`${appointment?.schedule_day_appointment?.start_time} - ${appointment?.schedule_day_appointment?.end_time}`}</h6>
            </div>

    </div>
    )
  }
  
  export default AppointmentCard