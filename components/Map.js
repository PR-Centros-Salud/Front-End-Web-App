import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

// Map Styles
const mapStyles = {
    width: '50%',
    height: '70%'
}

// This is the component that will render the Google Map. 
export class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            marker: {
                position: {lat: props.lat,lng: props.lng}
            }
        }
    }

    // This function will be used to set the marker position when the user clicks on the map.
    onMapClicked = (mapProps, map, clickEvent) => {
        const { latLng } = clickEvent
        const lat = latLng.lat()
        const lng = latLng.lng()
        this.setState({
            marker: {
                position: { lat, lng }
            }
        })
        this.props.handleMapChange(lat, lng)
    }

    render() {   
        return (
            // We are using the Google Maps React component to render the map.
            <Map
                google={this.props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{ lat: -17.413977, lng: -66.165321}}
                onClick={this.onMapClicked}
            >
                {this.state.marker.position != null && (
                    <Marker position={this.state.marker.position} />
                )}
            </Map>
        )
    }
}

// We are exporting the component with the Google Maps API key.
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCFBWXdvddjYDyCio_jOFzURRSAq8smDsU'
})(MapContainer)