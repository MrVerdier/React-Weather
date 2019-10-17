import React from 'react'
import { WiStrongWind, WiTornado } from 'react-icons/wi'
import SearchBar from './SearchBar'


export default class CurrentWeather extends React.Component {


  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        weather: []
      };
    }


  componentDidMount() {

    let cityName = 'Copenhagen'

      fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',dk&units=metric&APPID=e17ae4e6ebd942a7b4d387b014a9ce3e')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            weather: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {

    function compass() {
      let windDirection = weather.wind.deg
      if (windDirection == 360 && windDirection == 0) {
        return "N"
      } else if (windDirection > 0 && windDirection < 90){
        return "NE"
      } else if (windDirection == 90) {
        return "E"
      } else if (windDirection > 90 && windDirection < 180){
        return "SE"
      } else if (windDirection == 180) {
        return "S"
      } else if (windDirection > 180 && windDirection < 270) {
        return "SW"
      } else if (windDirection == 270) {
        return "W"
      } else if (windDirection > 270 && windDirection < 360) {
        return "NW"
      } else {
        return "Wrong data"
      }
   }

      const { error, isLoaded, weather } = this.state;
      let ts = new Date();
      let date = ts.toDateString()

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div>
            <div className="weather-box current-box">
              <span>Location: </span><h2>{weather.name} {weather.sys.country}</h2>
            </div>
            <h4>Generel:</h4> 
            <div id="currentWeather" className="weather-box  current-box"> 
              <div>{date}</div>
                {weather.weather.map(desc => (
                  <div className="weather-box-inner-current">
                    <img src={'http://openweathermap.org/img/wn/' + desc.icon + '@2x.png'}></img>
                    <div>
                      <h3>{desc.main}</h3>
                      <p>Min. <span>{weather.main.temp_min}</span> &#8451;</p>
                      <p>Max.<span>{weather.main.temp_max}</span> &#8451;</p>
                    </div>
                    <div>
                      <h2>{weather.main.temp} &#8451;</h2>
                    </div>
                  </div>
                ))}
            </div>
            <h4>Wind:</h4>
            <div className="weather-box  current-box">
              <div className="wind-box">
                <div>
                  <div>Wind Speed: <strong>{weather.wind.speed}</strong> m/s</div>
                  <div>Direction:  <strong>{weather.wind.deg} deg. {compass()}</strong> </div>
                </div>
                {weather.wind.speed > 1 ? <span><WiTornado /></span> : <span><WiStrongWind /></span>}
              </div>
            </div>
          </div>
        );
      }
    }
  }