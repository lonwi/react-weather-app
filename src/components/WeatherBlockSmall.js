import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment/locale/pl';
import './WeatherBlockSmall.css';
import moment from 'moment';

class WeatherBlockSmall extends Component {
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
        return (
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 my-3">
                <div className="WeatherBlockSmall animated fadeIn slow p-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="WeatherBlockSmall-date">
                                <div className="WeatherBlockSmall-date--day">
                                    <Moment locale="pl" format="LT dddd">{this.props.item.dt_txt}</Moment>
                                </div>
                                <div className="WeatherBlockSmall-date--full">
                                    <Moment locale="pl" format="LL">{this.props.item.dt_txt}</Moment>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col">
                            <div className="WeatherBlockSmall-condition">
                                {this.renderConditionIcon()}
                            </div>
                            <div className="WeatherBlockSmall-temp">
                                {this.calculate(this.props.item.main.temp)}&deg;<span className="deg">C</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="WeatherBlockSmall-description mb-1">
                            {this.props.item.weather[0].description}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="WeatherBlockSmall-wind">
                                <i className="wi wi-wind-direction" style={ {transform: `rotate(${this.props.item.wind.deg}deg)`}}></i> Wiatr: {this.props.item.wind.speed} m/s
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}
export default WeatherBlockSmall;