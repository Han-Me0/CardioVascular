import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import '../styles/UKDropdown.css'; // Ensure this path is correct

const HeartIllnessRates = () => {
  const [data, setData] = useState([]);
  const [centres, setCentres] = useState([]);
  const [illnesses, setIllnesses] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState('');
  const [selectedIllness, setSelectedIllness] = useState('');
  const [illnessRate, setIllnessRate] = useState(null);

  useEffect(() => {
    // Fetch the CSV data
    const fetchData = async () => {
      const response = await fetch('./data/heart_illness_rates_by_city.csv');
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        complete: (result) => {
          const parsedData = result.data;
          setData(parsedData);
          setCentres([...new Set(parsedData.map(item => item.assessment_centre))]);
          setIllnesses([...new Set(parsedData.map(item => item.illness))]);
        }
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCentre && selectedIllness) {
      const selectedData = data.find(
        item => item.assessment_centre === selectedCentre && item.illness === selectedIllness
      );
      setIllnessRate(selectedData ? selectedData.illness_rate : null);
    }
  }, [selectedCentre, selectedIllness, data]);

  const handleCentreChange = (event) => {
    setSelectedCentre(event.target.value);
  };

  const handleIllnessChange = (event) => {
    setSelectedIllness(event.target.value);
  };

  return (
    <div className="heart-illness-rates">
      <h1 className="title">Heart Illness Rates by Assessment Centre</h1>
      <div className="dropdown-container">
        <label htmlFor="centre" className="label">Assessment Centre: </label>
        <select id="centre" className="dropdown" value={selectedCentre} onChange={handleCentreChange}>
          <option value="">Select a centre</option>
          {centres.map((centre, index) => (
            <option key={`${centre}-${index}`} value={centre}>{centre}</option>
          ))}
        </select>
      </div>
      <div className="dropdown-container">
        <label htmlFor="illness" className="label">Illness: </label>
        <select id="illness" className="dropdown" value={selectedIllness} onChange={handleIllnessChange}>
          <option value="">Select an illness</option>
          {illnesses.map((illness, index) => (
            <option key={`${illness}-${index}`} value={illness}>{illness}</option>
          ))}
        </select>
      </div>
      {illnessRate !== null && (
        <div className="illness-rate">
          The cardiovascular disease rate in {selectedCentre} in {selectedIllness} is <span>{illnessRate}%</span>
        </div>
      )}
    </div>
  );
};

export default HeartIllnessRates;