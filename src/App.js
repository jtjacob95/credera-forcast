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


class App extends React.Component{
  constructor(props) {
    super(props);
    var d = new Date();

    this.state = {
        dat : [],
        currDay : d.getDay()
    };
  }

  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=32.783058&lon=-96.806671&exclude=current,minutely,hourly&appid=7eaf51d1f84ee9ba13b31105252aab59")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            success: true,
            dat: result.daily,
          });
          console.log(this.state.dat);
        },
        (error) => {
          this.setState({
            success: false,
          });
        }
      )
  }
 
  render(){
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
}

export default App;
