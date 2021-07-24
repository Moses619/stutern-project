import React from "react";
import '../App.css'

const Forecast = (props) => {
  return (
    <div className="weather">
        <div className="location">
          {props.country && props.city && (
            <p>
              Location: {props.city}, {props.country}.
            </p>
          )}
        </div>
        {props.temperature && (
          <p>
            Temperature: {props.temperature}&deg;C
          </p>)}

      <div className="temp">
      {props.description.charAt(0).toUpperCase() && 
        <p className="condition">
          {props.description}
        </p> }
        {props.icon && (
          <p>
            <img
              src={`http://openweathermap.org/img/w/${props.icon}.png`}
              alt="weather icon"
            />
          </p>
        )}
      </div>
        {props.humidity && 
          <p>
            Humidity: {props.humidity}%
          </p> }
        {props.pressure && 
          <p>
            Pressure: {props.pressure} mmHg
          </p> }
        {props.speed && 
          <p>
            Wind Speed: {props.speed} km/h 
          </p> }
    </div>
  
  );
};

export default Forecast;
