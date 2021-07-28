import React, { Component } from "react";
import "./App.css";
import Heading from "./components/heading";
import Form from "./components/form";
import Forecast from "./components/forecast";



const apiKey = "9218e3e59d4744fa2be7916b15f7d660";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');




setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'
    // eslint-disable-next-line 
    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

class App extends Component {
  state = {
    temperature: "",
    city: "",
    country: "",
    humidity: "",
    pressure: "",
    icon: "",
    description: ""
  };

  

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const apiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`
    );

    // console.log(api_call);
    // console.log(city, country);

    const response = await apiCall.json();
    if (city && country) {
      this.setState({
        city: response.name,
        country: response.sys.country,
        temperature: response.main.temp,
        humidity: response.main.humidity,
        pressure: response.main.pressure,
        icon: response.weather[0].icon,
        speed: response.wind.speed,
        description: response.weather[0].description,
      });
      console.log(response)
      // console.log(this.setState.descirption)
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + response.name + "')";
        document.body.style.color = '#f4f4f4';
    } 
    // else {
    //   this.setState({
    //     error: "Please fill out input fields!",
    //   });
    // }
  };

  render() {
    return (
      <div className="App">
        <div>
          <Heading />
        </div>
        <Form loadWeather={this.getWeather} required/>
        <div className="weather">
          <Forecast
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            pressure={this.state.pressure}
            speed={this.state.speed}
            icon={this.state.icon}
            description={this.state.description}
          />
        </div>
      </div>
    );
  }
}

export default App;
