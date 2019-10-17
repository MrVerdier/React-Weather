import React from 'react'
import CurrentWeather from '../Weather/CurrentWeather'
import SearchBar from '../Weather/SearchBar'
import Twitter from './Twitter'

export default class Home extends React.Component {
    render() {
        return (
            <div className="page">
            <SearchBar />
            <h1>Current Weather</h1>
            <div id="homepageContent">
                <CurrentWeather />
                <Twitter />
            </div>
           </div>
           
        )
    }
}