import React from 'react'

export default class FiveDayWeather extends React.Component {
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

     fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&APPID=e17ae4e6ebd942a7b4d387b014a9ce3e')
        .then(res => res.json())
        .then(
          (result) => {
            const weather = result.list.sort((a, b) => {
              return a.dt_txt - b.dt_txt
            })
            this.setState({
              isLoaded: true,
              weather,
              meta: result
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

    
    getWeather = async (e) => {
      e.preventDefault()
      let city = e.target.elements.city.value 
     
      
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=e17ae4e6ebd942a7b4d387b014a9ce3e`)
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


    groupBy = (list, keyGetter) => {
      const map = new Map();
      list.forEach((item) => {
           const key = keyGetter(item);
           const collection = map.get(key);
           if (!collection) {
               map.set(key, [item]);
           } else {
               collection.push(item);
           }
      });
      return map;
  }

    render() {
      const { error, isLoaded, weather, meta } = this.state;
      const grouped = this.groupBy(weather, weather=>weather.dt_txt.slice(0, 10))
      const date = new Date()
      
      Date.prototype.yyyymmdd = function(dayNumber) {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        let dd = date.getDate() + dayNumber;

        return [this.getFullYear(),
                (mm>9 ? '-' : '0') + mm,
                (dd>9 ? '-' : '0') + dd
               ].join('');
      };

      // let loopDates = function() {  
      //   let i
      //   let values = []
      //   for (i = 0; i < 6; i++) {
      //     values.push(date.yyyymmdd(i))
      //   } 
      //   return values
      // }

      // console.log(loopDates())

      // loopDates().map(dates => {
      //   console.log(grouped.get(dates))
      // })

    // Days - It is DRY I know....
    const day0 = grouped.get(date.yyyymmdd(0))
    const day1 = grouped.get(date.yyyymmdd(1))
    const day2 = grouped.get(date.yyyymmdd(2))
    // const day3 = grouped.get(date.yyyymmdd(3))
    // const day4 = grouped.get(date.yyyymmdd(4))
    // const day5 = grouped.get(date.yyyymmdd(5))


        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
              <h1>3-Day Forecast</h1>
              <div className="weather-box forecast-box">
                <span>Location: </span><h2> {meta.city.name} {meta.city.country}</h2>
              </div>
        

            <div id="forecastWeather"> 
                <div className="forecast-container">
                  <h3>{date.yyyymmdd(0)}</h3>
                  <div className="weather-box-container forecast-box">
                    <div className="weather-box">
                    {day0.map(days => ( 
                      <div>
                        {days.dt_txt.slice(11, 19)}
                        {days.weather.map(details => (
                          <div className="weather-box-inner">
                            <img src={'http://openweathermap.org/img/wn/' + details.icon + '@2x.png'} alt=""></img>
                            <h3>{details.description}</h3>
                            <p>Temp:<br /><span>{days.main.temp}</span> &#8451;</p>
                          </div>
                        ))}
                        <hr/>
                      </div>
                    ))}
                    </div>
                  </div>
              </div>
              <div className="forecast-container">
                <h3>{date.yyyymmdd(1)}</h3>
                <div className="weather-box-container forecast-box">
                  <div className="weather-box">
                  {day1.map(days => ( 
                    <div>
                      {days.dt_txt.slice(11, 19)}
                      {days.weather.map(details => (
                        <div className="weather-box-inner">
                          <img src={'http://openweathermap.org/img/wn/' + details.icon + '@2x.png'} alt=""></img>
                          <h3>{details.description}</h3>
                          <p>Temp:<br /><span>{days.main.temp}</span> &#8451;</p>
                        </div>
                      ))}
                      <hr/>
                    </div>
                  ))}
                  </div>
                </div>
              </div>

              <div className="forecast-container">
                <h3>{date.yyyymmdd(2)}</h3>
                <div className="weather-box-container forecast-box">
                  <div className="weather-box">
                  {day2.map(days => ( 
                    <div>
                      {days.dt_txt.slice(11, 19)}
                      {days.weather.map(details => (
                        <div className="weather-box-inner">
                          <img src={'http://openweathermap.org/img/wn/' + details.icon + '@2x.png'} alt=""></img>
                          <h3>{details.description}</h3>
                          <p>Temp:<br /><span>{days.main.temp}</span> &#8451;</p>
                        </div>
                      ))}
                      <hr/>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
        }
      }
    }