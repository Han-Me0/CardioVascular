import React, { useState } from 'react';
import HeartIllnessRates from '../components/DropdownUK'; // Import the HeartIllnessRates component
import UKMap from '../components/UKMap'; // Import the UKMap component
import Header from '../components/Header';
import Navigation from '../components/Navigation'; // Import the Navigation component
import '../styles/UKDropdown.css'; // Add a CSS file for styling
import '../styles/Navigation.css'; // Add a CSS file for styling

function UK() {
  return (
    <div className="uk-page">
      <Navigation />
      <div className="map-section">
        <UKMap />
        <div className="heart-illness-rates">
          <HeartIllnessRates />
        </div>
      </div>
    </div>
  );
}


export default UK;
