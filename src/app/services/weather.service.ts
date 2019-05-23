import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { CityWeatherModel } from '../models/city-weather.model';
import { WeatherInfo } from '../interfaces/weather-info.interface';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {

	private dniproWeatherUrl: string = 'http://api.openweathermap.org/data/2.5/weather?q=Dnipro,ua&APPID=35c8cf54bb1ee3d5c518c6647f325bf4';
	private weatherImageUrl: string = 'http://openweathermap.org/img/w/';

	constructor(private http: HttpClient) { }

	getDniproWeather(): Observable<CityWeatherModel> {

		return this.http.get<WeatherInfo>(this.dniproWeatherUrl)
			.pipe(
				map(result => {
					result.main.temp = result.main.temp - 273.15;
					result.weather[0].icon = `${this.weatherImageUrl}${result.weather[0].icon}.png`;

					return new CityWeatherModel(result);
				})
			);
	}
}