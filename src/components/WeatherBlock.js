import React, { Component } from 'react';
import Moment from 'react-moment';
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
        const hour = moment(this.props.item.dt_txt).format('h');
        const time = (hour < 7 || hour > 19) ? 'night' : 'day';
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
                    <div className="">
                        <h2>{this.props.data.name}, {countries[this.props.data.sys.country].name}</h2>
                    </div>
                </div>
            </div>
        );
    }
}
export default WeatherBlock;