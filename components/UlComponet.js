// TODO Cambiar esto wtff

import Link from "next/link"

const UlComponent = () => {
    return (
        <div className="top-part-ul">
            <ul>
                <Link href={'doctors'}>
                    <li>Ver Todos</li>
                </Link>
                <Link href={'adddoctors'}>
                    <li>Añadir</li>
                </Link>
            </ul>  
        </div>
    )
  }
  
  export default UlComponent