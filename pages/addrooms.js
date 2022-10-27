export default function addRooms() {
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
  