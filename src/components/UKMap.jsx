import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import '../styles/UKDropdown.css'; // For consistent styling

// Custom style for UK map regions
const ukStyle = {
    fillColor: '#c2c4c5', // Light grey for UK regions
    weight: 1,
    opacity: 1,
    color: '#686D76', // Dark grey outline
    fillOpacity: 0.7,
};

// Highlight marker style for selected centre
const selectedMarkerStyle = {
    fillColor: '#DC5F00', // Orange
    color: '#DC5F00',
    fillOpacity: 1,
    radius: 10,
};

const UKMap = ({ selectedCentre }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [ukGeoJson, setUkGeoJson] = useState(null); // GeoJSON for the UK

    // Fetch UK GeoJSON for boundaries
    useEffect(() => {
        const fetchGeoJson = async () => {
            try {
                const response = await axios.get('https://geojson-maps.ash.ms/uk.json'); // Replace with a valid UK GeoJSON source
                setUkGeoJson(response.data);
            } catch (error) {
                console.error('Error fetching UK GeoJSON:', error);
            }
        };
        fetchGeoJson();
    }, []);

    // Fetch coordinates for the selected centre dynamically
    useEffect(() => {
        const fetchCoordinates = async () => {
            if (selectedCentre) {
                try {
                    const apiKey = 'f1f6b22e533046c8896802e981bda1a2'; // Replace with your OpenCage API key
                    const response = await axios.get(
                        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                            selectedCentre
                        )},UK&key=${apiKey}`
                    );
                    const { results } = response.data;
                    if (results.length > 0) {
                        const { lat, lng } = results[0].geometry;
                        setSelectedLocation([lat, lng]);
                    } else {
                        console.error('No coordinates found for the selected centre.');
                        setSelectedLocation(null);
                    }
                } catch (error) {
                    console.error('Error fetching coordinates:', error);
                    setSelectedLocation(null);
                }
            } else {
                setSelectedLocation(null);
            }
        };

        fetchCoordinates();
    }, [selectedCentre]);

    // Custom style for the UK boundaries
    const ukStyle = {
        fillColor: '#c2c4c5', // Light grey for the UK
        weight: 1,
        opacity: 1,
        color: '#686D76', // Dark grey outline
        fillOpacity: 0.7,
    };

    // Highlight selected centre
    const selectedMarkerStyle = {
        fillColor: '#DC5F00', // Orange color for the marker
        color: '#DC5F00',
        fillOpacity: 1,
        radius: 10,
    };

    return (
        <MapContainer
            bounds={[
                [49.96, -7.57], // Southwest corner of the UK
                [60.84, 1.75], // Northeast corner of the UK
            ]}
            zoom={17} // Zoom level for the UK
            style={{ height: '80vh', width: '100%' }}
        >
            {/* Add a grey tile layer */}
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
            />

            {/* Add UK boundaries */}
            {ukGeoJson && <GeoJSON data={ukGeoJson} style={ukStyle} />}

            {/* Highlight selected centre */}
            {selectedLocation && (
                <CircleMarker center={selectedLocation} pathOptions={selectedMarkerStyle}>
                    <Popup>
                        <strong>{selectedCentre}</strong>
                    </Popup>
                </CircleMarker>
            )}
        </MapContainer>
    );
};

export default UKMap;
