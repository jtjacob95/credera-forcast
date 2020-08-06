import React from 'react';
import logo from './logo.svg';
import clear from './Clear.svg';
import cloudy from './Cloudy.svg';
import drizzle from './Drizzle.svg';
import haze from './Haze.svg';
import partlyCloudy from './Partly-Cloudy.svg';
import rain from './Rain.svg';
import snow from './Snow.svg';
import thunderstorm from './Thunderstorm.svg';
import dallas from './Dallas.png';
import cloudLeft from './CloudLeft.png';
import cloudRight from './CloudRight.png';
import locationIcon from './location_on - material.svg'
import './App.css';

function DayWeatherOne(props){
  return(
    <div className="ignore day-box ">
      <div className="day-of-week">
        {props.day}
      </div>
      <img src={props.icon} className="day-weather-icon"></img>
      <div className="day-temperature">
        {props.temperature}&#176;
      </div>
    </div>
  );
}

function DayWeather(props){
  return(
    <div className="day-box ">
      <div className="day-of-week">
        {props.day}
      </div>
      <img src={props.icon} className="day-weather-icon"></img>
      <div className="day-temperature">
        {props.temperature}<span>&#176;</span>
      </div>
    </div>
  );
}

function MainWeather(props){
  var sectionStyle = {
    backgroundImage: `url(${dallas})`
  };
  return(
    <div className="main-box" style={ sectionStyle } >
      <div className="main-info-box">
        <div className="main-temperature">
          {props.temperature}<span>&#176;</span>
        </div>
        <img src={props.icon} className="main-weather-icon"></img>
        <div className="main-info">
          {props.description}<br/>
          {props.speed} mph
        </div>
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

    var source = [clear,partlyCloudy ,cloudy,thunderstorm,drizzle,cloudy,rain,snow,haze];
    var calc = Math.floor(code/100);
    if(calc === 8){
      var calc2 = code%800;
      if(calc2 === 0){
        return source[0];   
      }
      else if(calc2 === 1 || calc2 === 2){
        return source[1];
      }
      else if(calc2 === 3 || calc2 === 4){
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
      var icon = this.parseIcon(this.state.weatherData[i]);
      var temperature = this.parseTemperature(this.state.isCelcius, this.state.tempData[i])
      var props = {
        day,
        icon,
        temperature
      }
      return props;
  }

  handleTemperature = () =>{
    console.log();
    var curr = this.state.isCelcius;
    this.setState({
      isCelcius : !curr
    });
  };

  getTodayDate(){
    var todayDate = new Date();
    var finDate = ""+this.parseDay(todayDate.getDay(),0,false) + ", ";
    var mon = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    finDate += mon[todayDate.getMonth()]+" "+ todayDate.getDay()+", "+ todayDate.getFullYear();
    return finDate;

    
  }

  render(){


    return (
      <div className="App">           
          <div className = "title-date-loc"> 
            <img src={locationIcon} className="loc-icon"/>
            Dallas, Texas<br/>
            {this.getTodayDate()}
          </div>
          <img src={cloudLeft} className="cloud-left"/>
          <img src={cloudRight} className="cloud-right"/>
          <div className="CenterMain">
            <button className="temperature-controller" onClick={this.handleTemperature}>
              <span className={!this.state.isCelcius ? "t-selected" : ""}>F&#176;</span> &nbsp;  
              <span className={this.state.isCelcius ? "t-selected" : ""}>C&#176;</span> 
              </button>
            <MainWeather {...this.parseData(0)} description={this.state.weatherDescription} speed={this.state.windSpeed} className="today"/>
            

            <div className="forcast">
              <DayWeatherOne {...this.parseData(1)} />
              <DayWeather {...this.parseData(2)} />
              <DayWeather {...this.parseData(3)} />
              <DayWeather {...this.parseData(4)} />
              <DayWeather {...this.parseData(5)} />
            </div>
            
          </div>
      </div>
    );
  }
}

export default App;
