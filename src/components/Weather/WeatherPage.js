import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FiveDayWeather from './FiveDayWeather'
import CurrentWeather from './CurrentWeather'
import SearchBar from './SearchBar';



export default class WeatherPage extends React.Component {
  render() {
    return(

      <Router>
      <div>
        <nav className="sub-nav">
          <ul>
            <div>
              <Link to="/">Current</Link>
            </div>
            <div>
              <Link to="/FiveDayWeather">Forecast</Link>
            </div>
          </ul>
        </nav>
      </div>
      <div className="page">
        <SearchBar />
        <Switch>
          <Route exact path="/" component={CurrentWeather}>
            <CurrentWeather /> 
          </Route>
          <Route exact path="/FiveDayWeather" component={FiveDayWeather}></Route>
        </Switch>
      </div>
    </Router>
    
    )
  }
}