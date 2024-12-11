import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import UKMap from './components/UKMap';
import HeartIllnessRates from './components/DropdownUK';
import Navigation from './components/Navigation';
import Header from './components/Header';
import About from './pages/About'; 

function App() {
  const [selectedCentre, setSelectedCentre] = useState('');
  const [selectedIllness, setSelectedIllness] = useState('');
  const [illnessRate, setIllnessRate] = useState(null);

  return (
    <BrowserRouter>
      <div>
        {/* Include the Navigation component here so it appears on all pages */}
        <Navigation />
        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/uk-map"
            element={
              <div className="uk-page">
                <Header />
                <HeartIllnessRates
                  setSelectedCentre={setSelectedCentre}
                  setSelectedIllness={setSelectedIllness}
                  setIllnessRate={setIllnessRate}
                  illnessRate={illnessRate}
                />

                <div className="map-section">
                  <UKMap
                    selectedCentre={selectedCentre}
                    selectedIllness={selectedIllness}
                    illnessRate={illnessRate}
                  />
                </div>
              </div>
            }
          />
          <Route path="/about" element={<About />} /> {/* Add route to About page */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;