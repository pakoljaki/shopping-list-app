import React, { useState } from 'react';
import MyButton from './MyButton';
import './LocationDetector.css';

const LocationDetector = () => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState('');

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        });
        setError('');
      },
      (err) => {
        setError('Unable to retrieve your location.');
        console.error(err);
      }
    );
  };

  return (
    <div className="location-detector">
      <h3>Your Location</h3>
      {coordinates.latitude && coordinates.longitude ? (
        <div className="location-coordinates">
          <p><strong>Latitude:</strong> {coordinates.latitude}</p>
          <p><strong>Longitude:</strong> {coordinates.longitude}</p>
        </div>
      ) : (
        <p className="location-message">Click the button below to detect your location.</p>
      )}
      {error && <p className="location-error">{error}</p>}
      <MyButton variant="info" onClick={detectLocation}>Detect Location</MyButton>
    </div>
  );
};

export default LocationDetector;
