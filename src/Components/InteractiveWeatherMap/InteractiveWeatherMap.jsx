// InteractiveWeatherMap.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const InteractiveWeatherMap = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState(null);
  const apiKey = "cda0d710a4f48af910ffc633249d3ee2"; 
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
          );
          const data = await response.json();
          setWeatherData({
            city: data.name || "Unknown place",
            temp: data.main.temp,
            desc: data.weather[0].description,
          });
        } catch (error) {
          console.error("Error in fetching data :", error);
        }
      },
    });
    return null;
  };

  return (
    <MapContainer center={[20, 10]} zoom={2} style={{ height: "45vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />
      {position && weatherData && (
        <Marker position={position}>
          <Popup>
            <div>
              <h3>Location:{weatherData.city}</h3>
              <p>Temp:{weatherData.temp}°C</p>
              <p>Description: {weatherData.desc}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default InteractiveWeatherMap;
