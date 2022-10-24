import { RingLoader } from "react-spinners"

const Loader = () => {
    return(
        <div className="loader">
            <RingLoader color={"#E84949"} loading={true} size={200} />
            <h3>CARGANDO</h3>
        </div>
    )
}

export default Loader