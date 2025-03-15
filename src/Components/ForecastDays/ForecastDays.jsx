import React, { useEffect, useState } from "react";

import axios from "axios";
import { ScaleLoader
} from "react-spinners";

function ForecastDays() {
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("Cairo");

  function handleChange(event) {
    setCity(event.target.value);
  }

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          // `https://api.weatherapi.com/v1/forecast.json?key=75239263496d44f188b103640250201&q=${city}&days=5&aqi=no&alerts=no`
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next3days?unitGroup=metric&include=days&key=RMVSBPV3PEWQQGTKJV2HJEZYC`
        );
        // console.log(response)
       setWeather(response.data.days); 
       console.log(response.data.days)

      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    }
    getData();
  }, [city]);

  return (
    <>
      <div className="input-group mt-[60px]">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
        />
      </div>

      <div className="p-3 text-center">
        <h3 className="text-center">{city}</h3>

        {weather.length > 0 ? (
          weather.map((item, index) => (
            <div key={index}>
              <div className="card shadow p-4 my-3 bg-body rounded text-center">
                <h3>{item.datetime}</h3>
                <h6>Min: {item.tempmax}°C</h6>
                <h6>Max: {item.tempmin}°C</h6>
                <p>{item.temp}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-center">
          <ScaleLoader color="#36d7b7" size={50} />

          </div>
        )}
      </div> 
    </>
  );
}

export default ForecastDays;



