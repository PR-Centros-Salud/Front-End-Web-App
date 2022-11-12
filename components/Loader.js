import { RingLoader } from "react-spinners"

// We are exporting the component that will be used to show the loading animation.
const Loader = () => {
    return(
        <div className="loader">
            <RingLoader color={"#E84949"} loading={true} size={200} />
            <h3>CARGANDO</h3>
        </div>
    )
}

export default Loader