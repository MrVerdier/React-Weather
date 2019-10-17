import React from 'react'

export default class SearchBar extends React.Component {
    state = {
        cityName: ''
    }

    handleFormChange = (e) =>{
        this.setState({
            cityName: e.target.value
        })
    }

    render(){
        let cityName = this.state.cityName
        console.log(cityName)
        return(
            <div>
                <form id="frmSearch">
                    <input id="Search" name="search" placeholder="SEARCH" onChange={this.handleFormChange}></input>
                </form>
            </div>
        )
    }
}