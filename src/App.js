import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import WeatherPage from './components/Weather/WeatherPage';
import Home from './components/Home/Homepage';
import CurrentWeather from './components/Weather/CurrentWeather'
import Twitter from './components//Home/Twitter'
import './App.css';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div>
          <nav className="main-nav">
            <ul>
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>                
                <Link to="/weather">Weather</Link>
              </div>
            </ul>
          </nav>
        </div>
      <Switch>
        <Route exact path="/" component={Home}>
          <div className="page">
            <h1>Current Weather</h1>
            <div id="homepageContent">
                <CurrentWeather />
                <Twitter />
            </div>
           </div>
        </Route>
        <Route exact path="/weather" component={WeatherPage}></Route>
      </Switch>
      </Router>
    )
  }
}

export default App;
