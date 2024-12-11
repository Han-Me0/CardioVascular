import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import '../styles/UKDropdown.css'; // Ensure this path is correct

const HeartIllnessRates = ({ setSelectedCentre, setSelectedIllness, setIllnessRate, illnessRate }) => {
  const [data, setData] = useState([]);
  const [centres, setCentres] = useState([]);
  const [illnesses, setIllnesses] = useState([]);
  const [localSelectedCentre, setLocalSelectedCentre] = useState('');
  const [localSelectedIllness, setLocalSelectedIllness] = useState('');

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
    if (localSelectedCentre && localSelectedIllness) {
      const selectedData = data.find(
        item =>
          item.assessment_centre === localSelectedCentre &&
          item.illness === localSelectedIllness
      );
      const rate = selectedData ? selectedData.illness_rate : null;

      // Pass the selected values to the parent component
      setSelectedCentre(localSelectedCentre);
      setSelectedIllness(localSelectedIllness);
      setIllnessRate(rate);
    }
  }, [localSelectedCentre, localSelectedIllness, data, setSelectedCentre, setSelectedIllness, setIllnessRate]);

  const handleCentreChange = (event) => {
    const centre = event.target.value;
    setLocalSelectedCentre(centre); // Update local state
    setSelectedCentre(centre); // Pass to parent component for map updates
  };


  const handleIllnessChange = (event) => {
    const illness = event.target.value;
    setLocalSelectedIllness(illness); // Update local state
  };

  return (
    <div className="heart-illness-rates">
      <h1 className="title">UK- Cardio Vascular Rates by City</h1>
      <div className="dropdown-container">
        <label htmlFor="centre" className="label">Assessment Centre: </label>
        <select
          id="centre"
          className="dropdown"
          value={localSelectedCentre}
          onChange={handleCentreChange}
        >
          <option value="">Select a centre</option>
          {centres.map((centre, index) => (
            <option key={`${centre}-${index}`} value={centre}>{centre}</option>
          ))}
        </select>
      </div>
      <div className="dropdown-container">
        <label htmlFor="illness" className="label">Illness: </label>
        <select
          id="illness"
          className="dropdown"
          value={localSelectedIllness}
          onChange={handleIllnessChange}
        >
          <option value="">Select an illness</option>
          {illnesses.map((illness, index) => (
            <option key={`${illness}-${index}`} value={illness}>{illness}</option>
          ))}
        </select>
      </div>
      {localSelectedCentre && localSelectedIllness && (
        <div className="illness-rate">
          The cardiovascular disease rate in {localSelectedCentre} for {localSelectedIllness} is <span>{illnessRate || 'N/A'}%</span>.
        </div>
      )}
    </div>
  );
};

export default HeartIllnessRates;
