import React from "react";

import ForecastDays from "../ForecastDays/ForecastDays";
import Forecast from "../Forecast/Forecast";

import "./Home.module.css";
function Home() {
  return (
    <>
   
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9  ">
            <Forecast />
          </div>

          <div className="left-side col-lg-3  ">
            <ForecastDays />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
