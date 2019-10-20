import React from 'react'

export default class SearchBar extends React.Component {

    render(){

        return(
            <form onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder="Search for a city"></input>
            </form>
        )
    }
}