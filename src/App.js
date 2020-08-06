import React from 'react';
import logo from './logo.svg';
import './App.css';

function DayWeather(props){
  return(
    <div className="day-box">
      <div className="day-of-week">
        {props.day}
      </div>
      <img src={props.icon} className="day-weather-icon"></img>
      <div className="day-temperature">
        {props.temperature}
      </div>
    </div>
  );
}

function MainWeather(props){
  return(
    <div className="day-box">
      <div className="day-temperature">
        {props.temperature}
      </div>
      <img src={props.icon} className="day-weather-icon"></img>
      <div className="day-info">
        {props.description}
        {props.speed}
      </div>
    </div>
  );
}


class App extends React.Component{
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
        tempData : [],
        weatherData : [],
        weatherDescription: "",
        windSpeed: "", 
        currDay : d.getDay(),
        isCelcius : true
    };

    this.parseData = this.parseData.bind(this);
  }

  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=32.783058&lon=-96.806671&exclude=current,minutely,hourly&appid=7eaf51d1f84ee9ba13b31105252aab59")
      .then(res => res.json())
      .then(
        (result) => {
          var TData = [];
          var WData = [];
          var WDescription = result.daily[0].weather[0].description;
          var WSpeed = result.daily[0].wind_speed;

          for(var i=0;i<6;i++){
            WData.push(result.daily[i].weather[0].id);
            TData.push(result.daily[i].temp.day);
          }

          this.setState({
            tempData : TData,
            weatherData : WData,
            weatherDescription: WDescription,
            windSpeed: WSpeed 
          });
        },
        (error) => {
          this.setState({
            success: false,
          });
        }
      )
  }

  parseDay(currDay,offset,short){
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday"];
    var x = (currDay + offset )%7;
    if(short){
      return weekday[x].substr(0,3);
    }
    else{
      return weekday[x];
    }
  }

  parseIcon(code){
    {/* Codes based on api
    2 = thunderstorm
    3 = drizzle
    5 = rain
    6 = snow
    7 = haze
    800 = clear
    801/802 = partly cloudy
    803/804 = cloudy
    */}
    var source = ["clear","partly cloudy","thunderstorm","drizzle","cloudy","rain","snow","haze",]
    var calc = Math.floor(code);
    if(calc == 8){
      var calc2 = code%800
      if(calc2 == 0){
        return source[0];
      }
      else if(calc2 == 1 || calc2 == 2){
        return source[1];
      }
      else if(calc2 == 3 || calc2 == 4){
        return source[4];
      }
    }
    else {
      return source[calc];
    }

  }
 
  parseTemperature(isCelcius, temp){
    if(isCelcius)
    {
      return Math.round(temp-273.15)
    }
    else{
      return Math.round(((temp-273.15)*9/5)+32)
    }
  }

  parseData(i){

      var day = this.parseDay(this.state.currDay,i,true);
      var icon = 0;//this.parseIcon(currData.weather[0].id);
      var temperature = this.parseTemperature(this.state.isCelcius, this.state.tempData[i])
      var props = {
        day,
        icon,
        temperature
      }
      return props;
  }

  render(){
    return (
      <div className="App">
          <div className = "title-date-loc"> 
            Dallas, Texas
          </div>
          <div>
            <MainWeather {...this.parseData(0)} description={this.state.weatherDescription} speed={this.state.windSpeed} />
            <div>
              <DayWeather {...this.parseData(1)}/>
              <DayWeather {...this.parseData(2)}/>
              <DayWeather {...this.parseData(3)}/>
              <DayWeather {...this.parseData(4)}/>
              <DayWeather {...this.parseData(5)}/>
            </div>
            
          </div>
      </div>
    );
  }
}

export default App;
