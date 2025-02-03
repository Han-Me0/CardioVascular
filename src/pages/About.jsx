import React from 'react';
import '../styles/About.css';
import Header from '../components/Header';

function About() {
  const heartConditions = [
    { name: "Angina", description: "Chest pain due to reduced blood flow to the heart." },
    { name: "Atrial Fibrillation", description: "Irregular heart rhythm increasing stroke risk." },
    { name: "Heart Arrhythmia", description: "Abnormal heart rhythm affecting heart rate." },
    { name: "Heart Attack", description: "Blocked blood flow causing heart muscle damage." },
    { name: "Heart Failure", description: "Heart's inability to pump blood effectively." },
    { name: "Valve Problems", description: "Issues with heart valves affecting blood flow." },
    { name: "Hypertension", description: "High blood pressure increasing heart disease risk." },
    { name: "Irregular Heartbeat", description: "Heart rhythm that's too fast, too slow, or erratic." }
  ];

  return (
    <>
      <Header />
      <div className="about-wrapper">
        <div className="about-hero">
          <div className="hero-content">
            <h1>curAIHeart</h1>
            <p>Understanding Common Cardiovascular Issues</p>
          </div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="main-content">
          <h2>What We Cover</h2>
          <div className="conditions-grid">
            {heartConditions.map((condition, index) => (
              <div key={index} className="condition-card">
                <div className="card-icon">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="card-content">
                  <h3>{condition.name}</h3>
                  <p>{condition.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="data-source-card">
            <h3>Data Sources</h3>
            <p>Information provided on this platform is sourced from:</p>
            <ul>
              <li>UK Biobank - UK Biobank</li>
              <li>The Behavioral Risk Factor Surveillance System (BRFSS)</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
