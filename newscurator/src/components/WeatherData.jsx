
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY ="b6556a6e62bcf7f259d1afd7b2e8f109";

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

  const getWeather = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude).then((data) => setWeather(data)).catch((error) => console.log(error.message));
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
    <div>
      <h1>Weather App</h1>
      {weather ? (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherDetails;
