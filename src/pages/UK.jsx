import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from 'papaparse';
import Navigation from '../components/Navigation';
import '../styles/UK.css';

function UK() {
  const [data, setData] = useState([]);
  const [centres, setCentres] = useState([]);
  const [illnesses, setIllnesses] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState('');
  const [selectedIllness, setSelectedIllness] = useState('');
  const [illnessRate, setIllnessRate] = useState(null);

  const ukBounds = [
    [49.8, -8.0], // Southwest corner
    [60.9, 2.0],  // Northeast corner
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('./data/heart_disease_rates.csv');
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        complete: (result) => {
          const parsedData = result.data.map((item) => ({
            ...item,
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
            illness_rate: parseFloat(item.illness_rate),
          }));
          setData(parsedData);
          setCentres([...new Set(parsedData.map((item) => item.assessment_centre))]);
          setIllnesses([...new Set(parsedData.map((item) => item.illness))]);
        },
      });
    };
    fetchData();
  }, []);

  const handleCentreChange = (event) => {
    const centre = event.target.value;
    setSelectedCentre(centre);
    updateIllnessRate(centre, selectedIllness);
  };

  const handleIllnessChange = (event) => {
    const illness = event.target.value;
    setSelectedIllness(illness);
    updateIllnessRate(selectedCentre, illness);
  };

  const updateIllnessRate = (centre, illness) => {
    if (centre && centre !== 'all' && illness) {
      const selectedData = data.find(
        (item) => item.assessment_centre === centre && item.illness === illness
      );
      setIllnessRate(selectedData ? selectedData.illness_rate : null);
    } else {
      setIllnessRate(null);
    }
  };


  return (
    <div className="uk-container">
      <div className="uk-header">
        <h1>Cardiovascular Disease Rates Across the UK</h1>
        <p>Explore the heart disease rates for various cities and illness types across the UK. Select a city and illness type to get detailed insights.</p>
      </div>

      <div className="uk-controls">
        <div className="uk-dropdown-container">
          <label htmlFor="centre">City: </label>
          <select
            id="centre"
            className="uk-dropdown"
            value={selectedCentre}
            onChange={handleCentreChange}
          >
            <option value="">Select a city</option>
            <option value="all">All cities</option>
            {centres.map((centre, index) => (
              <option key={`${centre}-${index}`} value={centre}>
                {centre}
              </option>
            ))}
          </select>
        </div>

        <div className="uk-dropdown-container">
          <label htmlFor="illness">Illness: </label>
          <select
            id="illness"
            className="uk-dropdown"
            value={selectedIllness}
            onChange={handleIllnessChange}
          >
            <option value="">Select an illness</option>
            {illnesses.map((illness, index) => (
              <option key={`${illness}-${index}`} value={illness}>
                {illness}
              </option>
            ))}
          </select>
        </div>

        {selectedIllness && selectedCentre && selectedCentre !== 'all' && (
          <div className="uk-illness-rate">
            <h3>Cardiovascular Disease Rate</h3>
            <p>
              The cardiovascular disease rate in {selectedCentre} for {selectedIllness} is{' '}
              <span>{illnessRate !== null ? illnessRate.toFixed(2) : 'N/A'}%</span>.
            </p>
          </div>
        )}
        {selectedIllness && selectedCentre === 'all' && (
          <div className="uk-illness-rate">
            <h3>Rates for {selectedIllness}</h3>
            <p>All rates are shown on the map for the selected illness.</p>
          </div>
        )}
      </div>

      <div className="uk-map-section">
        <MapContainer
          center={[54.5, -2.5]}
          zoom={6}
          style={{ height: '60vh', width: '100%' }}
          bounds={ukBounds}
          maxBounds={ukBounds}
          maxBoundsViscosity={1.0}
          minZoom={5}
          scrollWheelZoom
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data
  .filter(
    (city) =>
      (selectedCentre === 'all' || city.assessment_centre === selectedCentre) &&
      !isNaN(city.latitude) &&
      !isNaN(city.longitude)
  )
  .map((city, index) => {
    const illnessData = data.find(
      (item) =>
        item.assessment_centre === city.assessment_centre && item.illness === selectedIllness
    );
    const illnessRate = illnessData ? illnessData.illness_rate.toFixed(2) : 'N/A';
    return (
      <CircleMarker
        key={`${city.assessment_centre}-${index}`}
        center={[city.latitude, city.longitude]}
        radius={8}
        fillColor={city.assessment_centre === selectedCentre ? '#FF7F50' : '#4682B4'}
        color="#000"
        weight={1}
        opacity={1}
        fillOpacity={0.8}
      >
        <Popup>
          <strong>{city.assessment_centre}</strong>
          <br />
          {selectedIllness ? `${selectedIllness}: ${illnessRate}%` : 'Select an illness'}
        </Popup>
      </CircleMarker>
    );
  })}
        </MapContainer>
      </div>
    </div>
  );
}

export default UK;
