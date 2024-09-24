import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../Styles/WeatherDetails.css';

const API_KEY = "b6556a6e62bcf7f259d1afd7b2e8f109";

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const fetchWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const WeatherDetails = () => {
  const [weather, setWeather] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  const getWeather = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
          fetchWeather(latitude, longitude)
            .then((data) => setWeather(data))
            .catch((error) => console.log(error.message));
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return (
    <div className="weather-container">
      {coordinates.lat && coordinates.lon && (
        <MapContainer
          center={[coordinates.lat, coordinates.lon]}
          zoom={12}
          style={{ height: '100%', width: '100vw', position: 'absolute', zIndex: -1 }}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[coordinates.lat, coordinates.lon]}>
            <Popup>
              {weather?.name}: {(weather?.main.temp - 273.15).toFixed(1)}°C
            </Popup>
          </Marker>
        </MapContainer>
      )}
      <h1 className="weather-title">Weather App</h1>
      {weather ? (
        <div className="weather-card">
          <h2 className="weather-location">{weather.name}</h2>
          <p className="weather-temp">{(weather.main.temp - 273.15).toFixed(1)}°C</p>
          <p className="weather-description">{weather.weather[0].description}</p>
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="weather icon" 
            className="weather-icon"
          />
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default WeatherDetails;
