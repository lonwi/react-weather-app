import React, { Component } from 'react';
// import Moment from 'react-moment';
import 'moment/locale/pl';
import './WeatherBlock.css';
import { countries } from 'country-data';
import moment from 'moment';

class WeatherBlock extends Component {
    calculate(deg) {
        return Math.ceil(deg);
    }
    renderConditionIcon() {
        const weather = this.props.item.weather[0].main;
        // const weatherId = this.props.item.weather[0].id;
        const hour = moment(this.props.item.dt_txt).format('H');
        const time = (hour < 6 || hour > 19) ? 'night' : 'day';
        // const time = 'day';
        let condition;
        switch (weather) {
            case 'Thunderstorm':
                condition = time === 'day' ? 'day-thunderstorm' : 'night-thunderstorm';
                break;
            case 'Drizzle':
                condition = time === 'day' ? 'day-rain-mix' : 'night-rain-mix';
                break;
            case 'Rain':
                condition = time === 'day' ? 'day-rain' : 'night-rain';
                break;
            case 'Snow':
                condition = time === 'day' ? 'day-snow' : 'night-snow';
                break;
            case 'Atmosphere':
                condition = time === 'day' ? 'day-fog' : 'night-fog';
                break;
            case 'Clear':
                condition = time === 'day' ? 'day-sunny' : 'night-clear';
                break;
            case 'Clouds':
                condition = time === 'day' ? 'day-cloudy' : 'night-cloudy';
                break;
            default:
                condition = 'rain';
                break;
        }
        return (
            <i className={`wi wi-${condition}`}></i>
        )
    }
    render() {
        //console.log(this.props.item.main.temp);
        return (
            <div className="col-12 my-3">
                <div className="WeatherBlock animated fadeIn slow p-3">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-4">
                            <div className="row no-gutters">
                                <div className="col">
                                    <div className="WeatherBlock-condition">
                                        {this.renderConditionIcon()}
                                    </div>
                                    <div className="WeatherBlock-temp">
                                        {this.calculate(this.props.item.main.temp)}&deg;<span className="deg">C</span>
                                    </div>
                                </div>
                            </div>
                            <div className="WeatherBlock-location">
                                <h2>{this.props.item.name}, {countries[this.props.item.sys.country].name}</h2>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="WeatherBlock-temp_max my-2">
                                <div className="row justify-content-start">
                                    <div className="col-auto">
                                        <i className="wi wi-fw wi-direction-up"></i> Maksymalna:
                                    </div>
                                    <div className="col-auto">
                                    {this.calculate(this.props.item.main.temp_max)}&deg;<span className="deg">C</span>
                                    </div>
                                </div>
                            </div>
                            <div className="WeatherBlock-temp_min my-2">
                                <div className="row justify-content-start">
                                    <div className="col-auto">
                                    <i className="wi wi-fw wi-direction-down"></i> Minimalna:
                                    </div>
                                    <div className="col-auto">
                                        {this.calculate(this.props.item.main.temp_min)}&deg;<span className="deg">C</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="WeatherBlock-humidity my-2">
                                <div className="row justify-content-start">
                                    <div className="col-auto">
                                        <i className="wi wi-fw wi-humidity"></i> Wilgotność:
                                    </div>
                                    <div className="col-auto">
                                        {this.props.item.main.humidity}%
                                    </div>
                                </div>
                            </div>
                            <div className="WeatherBlock-pressure my-2">
                                <div className="row justify-content-start">
                                    <div className="col-auto">
                                    <i className="wi wi-fw wi-thermometer"></i> Ciśnienie:
                                    </div>
                                    <div className="col-auto">
                                        {this.props.item.main.pressure}hPa
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default WeatherBlock;