import React from 'react';
import Axios from 'axios';
import './App.css';
import DisplayWeather from './components/DisplayWeather';
import NavBar from './components/NavBar';

class App extends React.Component {
  state = {
    coords:{
      latitude: 45,
      longitude: 60
    },
    data: {},
    regionInput: ""
  }
  componentDidMount(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({coords:newCoords});

        Axios.get(`http://api.weatherstack.com/current?access_key=d6ea4220611fe18574bb49c3c8a58474&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then(res => {
          let weatherData = {
            location: res.data.location.name,
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidty: res.data.current.humidity,
            img: res.data.current.weather_icons
          }

          this.setState({data: weatherData});
        })
      })
    }
  }
  changeRegion = (value) => {
    this.setState({ regionInput: value })
  }
  changeLocation = (e) => {
    e.preventDefault()
    Axios.get(`http://api.weatherstack.com/current?access_key=d6ea4220611fe18574bb49c3c8a58474&query=${this.state.regionInput}`).then(res => {
         let weatherData = {
           location: res.data.location.name,
           temperature: res.data.current.temperature,
           description: res.data.current.weather_descriptions[0],
           region: res.data.location.region,
           country: res.data.location.country,
           wind_speed: res.data.current.wind_speed,
           pressure: res.data.current.pressure,
           precip: res.data.current.precip,
           humidty: res.data.current.humidity,
           img: res.data.current.weather_icons
          }

          this.setState({data: weatherData});
        })
      }

  


  render() {
    return (
      <div className="App">
        <NavBar changeRegion={this.changeRegion} changeLocation={this.changeLocation}/>
        <DisplayWeather data = {this.state.data}/>
      </div>  
    );
  }
}


export default App;
//Access key -  d6ea4220611fe18574bb49c3c8a58474