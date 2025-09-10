import React from 'react';
import '../styles/CredibilitySection.css';

const CredibilitySection = () => {
  const features = [
    {
      icon: '/Icons/fast-delivery.png', 
      text: 'Fast delivery time',
    },
    {
      icon: '/Icons/token.png', 
      text: 'Reward points on item purchase',
    },
    {
      icon: '/Icons/shield.png', 
      text: 'No fuss warranty',
    },
  ];

  return (
    <div className="credibility-section">
      {features.map((feature, index) => (
        <div key={index} className="feature">
          <div className="icon">
            <img src={feature.icon} alt={feature.text} className="feature-icon" />
          </div>
          <p>{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CredibilitySection;
