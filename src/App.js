import React from 'react';
import logo from './logo.svg';
import './App.css';

function DayWeather(props){
  return(
    <div className="day-box">
      <div className="day-of-week">
        {props.day}
      </div>
      <img src={props.logo} className="day-weather-icon"></img>
      <div className="day-temperature">
        {props.temperature}
      </div>
    </div>
  );
}

function MainWeather(props){
  return(
    <div className="day-box">
      <div className="day-of-week">
        {props.day}
      </div>
      <img src={props.logo} className="day-weather-icon"></img>
      <div className="day-temperature">
        {props.temperature}
      </div>
    </div>
  );
}


function App() {
  return (
    <div className="App">
        <div className = "title-date-loc"> 
          Dallas, Texas

        </div>
        <div>
          <MainWeather day="saturday" logo={logo} temperature="80"/>
          <div>
            <DayWeather day="sunday" logo={logo} temperature="70"/>
            <DayWeather day="monday" logo={logo} temperature="72"/>
            <DayWeather day="tuesday" logo={logo} temperature="74"/>
            <DayWeather day="wednesday" logo={logo} temperature="76"/>
            <DayWeather day="thursday" logo={logo} temperature="78"/>
          </div>
          
        </div>
    </div>
  );
}

export default App;
