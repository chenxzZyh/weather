import React from 'react';
import './WeatherAnimation.css';

const WeatherAnimation = ({ type }) => {
  const renderAnimationElements = () => {
    switch (type) {
      case 'sunny':
        return (
          <div className="sun-container">
            <div className="sun"></div>
            <div className="sun-rays"></div>
          </div>
        );
      case 'rainy':
        return Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="raindrop" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}></div>
        ));
      case 'snowy':
        return Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="snowflake" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 10 + 10}px`
          }}>❄</div>
        ));
      case 'cloudy':
        return (
          <div className="cloud-container">
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
          </div>
        );
      case 'thunder':
        return (
          <>
            <div className="cloud-container">
              <div className="cloud thunder-cloud"></div>
            </div>
            <div className="lightning"></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="weather-animation">
      {renderAnimationElements()}
    </div>
  );
};

export default WeatherAnimation; 