import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const UKMap = ({ cityData }) => {
    return (
        <MapContainer
            style={{ height: "500px", width: "100%" }}
            center={[55.3781, -3.4360]} // Center of the UK
            zoom={6}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            {cityData.map((city, index) => (
                <Marker key={index} position={[city.latitude, city.longitude]}>
                    <Popup>
                        {city.name}: {city.diseaseRate}%
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default UKMap;
