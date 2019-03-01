import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import WeatherBlock from './WeatherBlock';
import './WeatherApp.css';

class WeatherApp extends Component {
    constructor() {
        super();
        this.state = {
            value: 'Bradford',
            loading: false,
            loaded: false,
            data: {},
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getLocationData() {
        const api_key = '5e63f64940665bdc51aa275592b924a4';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&units=metric&lang=pl&appid=${api_key}`;
        this.setState({ loading: true });
        setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.setState({ data: data, loading: false, loaded: true }))
                .catch((e) => console.log('api error', e));
        }, 300);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.getLocationData();
    }
    renderLoading() {
        if (this.state.loading) {
            return (
                <div className="loading col-12 align-item-center">
                    <i className={`fas fa-sync animated slower ${this.state.loading ? 'fadeIn' : 'fadeOut'}`}></i>
                </div>
            );
        }
    }
    renderWeather() {
        if (!this.state.loading && this.state.data) {

        }
    }
    renderWeatherBlocks() {
        if (!this.state.loading && this.state.data && this.state.data.list) {
            console.log(this.state.data.list);
            return this.state.data.list.map((item, index) => <WeatherBlock key={index} item={item} />);
        }
    }
    render() {
        return (
            <div className="WeatherApp">
                {console.log(this.props)}
                {this.props.isGeolocationAvailable ? `yes` : `no`}
                <header className="WeatherApp-header">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-6">
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
                            <div className="col-12 col-md-6">
                                <div className="WeatherApp-search">
                                    <form onSubmit={this.handleSubmit}>
                                        <input type="text" className="input input-search" placeholder="Miasto" value={this.state.value} onChange={this.handleChange} />
                                        <button type="submit" className="button button-search"><i className="fas fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="WeatherApp-content">
                    <div className="container">
                        <div className="row align-items-top">
                            {this.renderLoading()}
                            {this.renderWeather()}
                            {this.renderWeatherBlocks()}
                        </div>
                    </div>
                </div>
                <footer className="WeatherApp-footer">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col">
                                {/* <p>&copy; Wojciech Bubolka</p> */}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 15000,
})(WeatherApp);
