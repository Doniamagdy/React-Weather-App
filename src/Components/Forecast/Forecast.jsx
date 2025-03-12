import React, { useEffect, useState } from "react";

import axios from "axios";
import { ScaleLoader } from "react-spinners";

import InteractiveWeatherMap from "../InteractiveWeatherMap/InteractiveWeatherMap";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Forecast.module.css";

import image from '../../assets/react.svg'
import sunset from '../../assets/sunset.png'
import sunrise from '../../assets/ocean.png'
import UV from '../../assets/skin-layers.png'
import cloud from '../../assets/cloudy.png'



function Forecast() {
  const [forecast, setForecast] = useState();
  const [weatherInDays, setWeatherInDays] = useState([]);

  const settings = {
    arrows:false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, 
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  useEffect(() => {
    try {
      async function getForeCast() {
        const weather = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Egypt/today?iconSet=icons2&key=RMVSBPV3PEWQQGTKJV2HJEZYC&contentType=json&unitGroup=metric`
        );
        setForecast(weather.data);
        setWeatherInDays(weather.data.days);
      }
      getForeCast();

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }

  }, []);

  return (
    <>
   
      <div className="container">
      <div className="d-flex">
      <img className="pt-2" src={image} />
      <h1 className="ms-3 mb-3 mt-4">React Weather App</h1>
      </div>
 
        {forecast ? (
          <div className="row">
            <div className="col-lg-6">
            <div className="p-5 shadow rounded my-4 bg-white">
              <h2 className="my-3">{forecast.address}</h2>
              <div className="d-flex justify-evenly align-items-center">
                <div>
                  <div>
                    <img
                      className="mx-auto"
                      src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${forecast.currentConditions.icon}.png`}
                      alt={forecast.currentConditions.conditions}
                    />
                  </div>
                  <p className="text-7xl">
                    {forecast.currentConditions.temp} °C
                  </p>
                  <span className="mx-3">Max: {forecast.days[0].tempmax}°</span>
                  <span className="mx-3">Min: {forecast.days[0].tempmin}°</span>
                </div>

                <div>
                  <h4 className="mt-5">
                    {forecast.currentConditions.conditions}{" "}
                  </h4>
                  <p>Feels like: {forecast.currentConditions.feelslike}°</p>
                </div>
              </div>

              <div className="d-flex justify-around my-4">
                <div>
                  <p>Wind</p>
                  <h6>{forecast.currentConditions.windspeed} km/h</h6>
                </div>

                <div>
                  <p>Humidity</p>
                  <h6>{forecast.currentConditions.humidity} %</h6>
                </div>

                <div>
                  <p>Visibility</p>
                  <h6>{forecast.currentConditions.visibility} km</h6>
                </div>

                <div>
                  <p>Pressure</p>
                  <h6>{forecast.currentConditions.pressure} mb</h6>
                </div>
              </div>
            </div>
            </div>

            <div className="col-lg-6  ">
            <div className="p-4 shadow rounded my-4 ms-4 bg-white"> 
              <InteractiveWeatherMap />
              </div>
            </div>
          </div>
        ) : (
           <div className="d-flex justify-center mt-5">
                    <ScaleLoader color="#36d7b7" size={50} />
          
                    </div>
        )}
      </div>

      <div className="container">
        {weatherInDays.length > 0
          ? weatherInDays.map((day, index) => {
              return (
                <div key={index}>
                  {/* <h3>{day.description}</h3> */}
                  <div>
                    <Slider {...settings} className="my-5 ms-2">
                      {day.hours?.map((hour, ind) => {
                        return (
                          <div key={ind}>
                            <div className="text-center shadow p-4 mb-5 bg-white rounded w-48">
                              <h5>
                                {" "}
                                {hour.datetime
                                  .split(":")
                                  .slice(0, 2)
                                  .join(":") +
                                  (parseInt(hour.datetime.split(":")[0]) >= 12
                                    ? " PM"
                                    : " AM")}{" "}
                              </h5>

                              <img
                                className="w-25 mx-auto my-2"
                                src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${hour.icon}.png`}
                                alt={hour.icon}
                              />

                              <h6>{hour.temp} °C</h6>
                            </div>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              );
            })
          : ""}




          <div>
            {forecast? <div className="row">

  <div className="col-lg-3 ">
  <div className="bg-danger text-center shadow p-4 mb-5 bg-white rounded">
  <h4>Cloud Cover</h4>
  <img src={cloud} className="w-25 mx-auto"/>
  <p className="my-3"> {forecast.currentConditions.cloudcover} </p>
  </div>
</div>


<div className="col-lg-3 ">
  <div className="bg-danger text-center shadow p-4 mb-5 bg-white rounded">
  <h4>UV Index</h4>
  <img src={UV} className="w-25 mx-auto"/>
  <p className="my-3"> {forecast.currentConditions.uvindex} </p>
  </div>
</div>



<div className="col-lg-3 ">
  <div className="bg-danger text-center shadow p-4 mb-5 bg-white rounded">
  <h4>Sunrise</h4>
  <img src={sunrise} className="w-25 mx-auto"/>
  <p className="my-3"> {forecast.currentConditions.sunrise} AM</p>
  </div>
</div>



<div className="col-lg-3 ">
  <div className="bg-danger text-center shadow p-4 mb-5 bg-white rounded">
  <h4>Sunset</h4>
  <img src={sunset} className="w-25 mx-auto"/>
  <p className="my-3"> {forecast.currentConditions.sunset}PM </p>
  </div>
</div>




            </div>: ' '}
          </div>
      </div>
    </>
  );
}

export default Forecast;
