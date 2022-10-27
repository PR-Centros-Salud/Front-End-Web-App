export default function laboratoryservice() {
    return (
        <div className="laboratoryservice-page">
            <div className="laboratoryservice-page-container">
                <div className="laboratoryservice-page-container-title">
                    <h3><u>Servicios de Laboratorio</u></h3>
                    <p>Añadir Servicio de Laboratorio</p>
                </div>
                <div className="laboratoryservice-page-container-inputs">

                    <div className="laboratoryservice-page-container-inputs-name">
                        <h4>Nombre de Servicio de laboratorio</h4>
                        <input
                            type="text"
                        />
                    </div>
                  
 
                </div>
                <div className="laboratoryservice-page-container-buttons">
                        <div className="laboratoryservice-page-container-buttons-container">
                            <div className="button-add-buttons-container">
                                <button className="button-add">Añadir</button>
                            </div>
                            <div className="button-discard-container">
                                <button className="button-discard">Descartar</button> 
                            </div>
                </div>
                <div className="laboratoryservice-page-container-show">
                <p>Mostrar Servicios de Laboratorio</p>
                    <table>
                        <thead>
                            <tr>
                                <td>Nombre de Servicio</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                 
                                <td>Pediatria</td>
                            </tr>
                            <tr>
           
                                <td>Consultoria</td>
                            </tr>
                            <tr>
    
                                <td>Infantil</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                        
            </div>
                
            </div>
            
        </div>        
    );
  }
  