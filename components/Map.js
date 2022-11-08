import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const mapStyles = {
    width: '50%',
    height: '70%'
}

export class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            marker: {
                position: {lat: props.lat,lng: props.lng}
            }
        }
    }

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

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCFBWXdvddjYDyCio_jOFzURRSAq8smDsU'
})(MapContainer)