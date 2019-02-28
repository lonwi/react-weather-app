import React, { Component } from 'react';
import './WeatherApp.css';

class WeatherApp extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="WeatherApp">
                <header className="WeatherApp-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="WeatherApp-logo">
                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <i className="wi wi-day-storm-showers"></i>
                                        </div>
                                        <div className="col">
                                            <h1>Prognoza<br />Pogody</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="WeatherApp-search">
                                    <input type="text" className="input" placeholder="Miasto" />
                                    <i className="fas fa-search"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="WeatherApp-content">
                    <i className="wi wi-day-sunny"></i>
                </div>
                <footer className="WeatherApp-footer">

                </footer>
            </div>
        );
    }
}
export default WeatherApp;
