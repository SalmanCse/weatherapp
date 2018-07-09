/*import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;*/

import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined

    }
    /*constructor(){
        this.getWeather = this.getWeather.bind(this);}*/
    getWeather = async(e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric');
                //http://api.openweathermap.org/data/2.5/weather?q=Manchester,uk&appid=${API_KEY}&units=metric



        const data = await api_call.json();
        if (city && country ) {
            //console.log(data);
        this.setState({

            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: ""
        });
        } else {
            this.setState({

               temperature: undefined,
               city: undefined,
               country: undefined,
               humidity: undefined,
               description: undefined,
               error: "Please enter the value."

            });
        }
    }
    render(){
        return (
            <div>
               <div className="wrapper">
                 <div className="main">
                   <div className="container">
                     <div className="row">
                       <div className="col-xs-5 title-container">
                         <Titles />
                       </div>
                       <div className="col-xs-7 form-container">
                          <Form getWeather={this.getWeather}/>
                            <Weather
                              temperature={this.getWeather}
                              city={this.state.city}
                              country={this.state.country}
                              humidity={this.state.humidity}
                              description={this.state.description}
                              error={this.state.error}
                            />

                       </div>
                     </div>
                   </div>
                 </div>
               </div>



            </div>

        );
    }
};

export default App;



