import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import WeatherBlock from './WeatherBlock';
import WeatherBlockSmall from './WeatherBlockSmall';
import './WeatherApp.css';

class WeatherApp extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            valueSearched: '',
            loading: false,
            loaded: false,
            error: false,
            location: false,
            dataWeatherCurrent: {},
            dataWeatherForecast: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }
    getGeolocationData() {
        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords && !this.state.value) {

            const api_key = '5e63f64940665bdc51aa275592b924a4';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.props.coords.latitude}&lon=${this.props.coords.longitude}&units=metric&lang=pl&appid=${api_key}`;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data.cod == 200) {
                        this.setState({ value: data.name });
                        this.getLocationData();
                    }
                });
            return (
                <div className="loading col-12 align-item-center">
                    <i className={`fas fa-sync animated slower ${this.state.loading ? 'fadeIn' : 'fadeOut'}`}></i>
                </div>
            );
        }
    }
    getLocationData() {
        this.setState({ loading: true, loaded: false, error: false, valueSearched: this.state.value });
        Promise.all([this.fetchWeatherCurrentData(), this.fetchWeatherForecastData()])
            .then(() => {
                if (this.state.dataWeatherCurrent.cod != 200 || this.state.dataWeatherForecast.cod != 200) {
                    this.setState({ error: true })
                }
            })
            .finally(() => this.setState({ loading: false, loaded: true }));
    }
    fetchWeatherCurrentData() {
        const api_key = '5e63f64940665bdc51aa275592b924a4';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&units=metric&lang=pl&appid=${api_key}`;

        return new Promise((resolve) => {
            // setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.setState({ dataWeatherCurrent: data }))
                .catch((e) => console.log('api error', e))
                .finally(() => resolve());
            // }, 3400);
        });
    }
    fetchWeatherForecastData() {
        const api_key = '5e63f64940665bdc51aa275592b924a4';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&units=metric&lang=pl&appid=${api_key}`;
        return new Promise((resolve) => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.setState({ dataWeatherForecast: data }))
                .catch((e) => console.log('api error', e))
                .finally(() => resolve());
        });
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.getLocationData();
    }
    renderLoading() {
        if (this.state.loading && !this.state.error) {
            return (
                <div className="loading col-12 align-item-center">
                    <i className={`fas fa-sync animated slower ${this.state.loading ? 'fadeIn' : 'fadeOut'}`}></i>
                </div>
            );
        }
    }
    renderError() {
        if (this.state.loaded && this.state.error) {
            return (
                <div className="error col-12 d-flex align-item-center justify-content-center p-5">
                    <h2>Nie znaleziono miasta "{this.state.valueSearched}". Proszę spróbować ponownie.</h2>
                </div>
            )
        }
    }
    renderWeatherBlock() {
        if (this.state.loaded && !this.state.error) {
            return <WeatherBlock data={this.state.dataWeatherCurrent} />
        }
    }
    renderWeatherBlockSmalls() {
        if (this.state.loaded && !this.state.error) {
            return this.state.dataWeatherForecast.list.map((item, index) => <WeatherBlockSmall key={index} item={item} />);
        }
    }
    render() {
        return (
            <div className="WeatherApp">
                {this.getGeolocationData()}
                <header className="WeatherApp-header py-3">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-6">
                                <div className="WeatherApp-logo">
                                    <div className="row align-items-center justify-content-center justify-content-md-start">
                                        <div className="col-auto">
                                            <i className="wi wi-day-storm-showers"></i>
                                        </div>
                                        <div className="col-auto">
                                            <h1>Prognoza<br />Pogody</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="WeatherApp-search my-3">
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
                            {this.renderError()}
                            {this.renderLoading()}
                            {this.renderWeatherBlock()}
                            {this.renderWeatherBlockSmalls()}
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
