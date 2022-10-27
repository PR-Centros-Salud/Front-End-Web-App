
import { useState, useEffect } from 'react'


export default function Rooms() {

    const [tab, setTab] = useState(1)

    return (
        <>
        <div className="top-part-ul">
            <ul>
                <li onClick={() => {setTab(1)}}>Ver</li>
                <li onClick={() => {setTab(2)}}>Añadir</li>
            </ul>  
        </div>
        {
            tab === 1 ? <ShowRooms/> : <AddRooms/>
        }
        </>
    )
}

const ShowRooms = () => {
    return (
        <div className="showrooms-page">
            <p className="title"><u>Cuartos de Consulta</u></p>
            <div className="showrooms-page-body">
                <table>
                    <thead>
                        <tr>
                            <td>Tipo</td>
                            <td>Nombre</td>
                            <td>Ubicación</td>
                            <td>Estado</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Consultorio</td>
                            <td>#32</td>
                            <td>Nro.2</td>
                            <td>Pediatria</td>
                        </tr>
                        <tr>
                            <td>Consultorio</td>
                            <td>#32</td>
                            <td>Nro.2</td>
                            <td>Pediatria</td>
                        </tr>
                        <tr>
                            <td>Consultorio</td>
                            <td>#32</td>
                            <td>Nro.2</td>
                            <td>Pediatria</td>
                        </tr>
                    </tbody>

       


                </table>
            </div>
        </div>      
    );
  }
const AddRooms = () => {
    return (
        <div className="addrooms-page">
            <div className="addrooms-page-container">
                <div className="addrooms-page-container-title">
                    <h3><u>Cuartos de Consulta</u></h3>
                </div>
                <div className="addrooms-page-container-inputs">

                    <div className="addrooms-page-container-inputs-type">
                        <h3>Tipo de Cuarto</h3>
                        <input
                            type="text"
                        />
                    </div>
                    <div className="addrooms-page-container-inputs-block">
                        <h3>Bloque</h3>
                        <input
                            type="text" 
                        />
                    </div>
                    <div className="addrooms-page-container-inputs-number">
                        <h3>Bloque</h3>
                        <input
                            type="text" 
                        />
                    </div>
                    <div className="addrooms-page-container-inputs-loor">
                        <h3>Piso</h3>
                        <input
                            type="text" 
                        />
                    </div>
 
                </div>
                <div className="addrooms-page-container-buttons">
                        <div className="addrooms-page-container-buttons-container">
                            <div className="button-add-buttons-container">
                                <button className="button-add">Añadir</button>
                            </div>
                            <div className="button-discard-container">
                                <button className="button-discard">Descartar</button> 
                            </div>
                        </div>

                        
                </div>
            </div>
            
        </div>        
    );
  }
  