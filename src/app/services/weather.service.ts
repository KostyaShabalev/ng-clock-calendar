import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { CityWeatherModel } from '../models/city-weather.model';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {

	constructor(private http: HttpClient) { }

	getDniproWeather(): Observable<CityWeatherModel> {
		const url: string = 'http://api.openweathermap.org/data/2.5/weather?q=Dnipro,ua&APPID=35c8cf54bb1ee3d5c518c6647f325bf4';

		return this.http.get<any>(url) // What type should be here?
			.pipe(
				map(result => {
					const cityWeatherInfo = new CityWeatherModel(result.name, result.main.temp, result.wind.speed, result.weather[0].icon);

					return cityWeatherInfo;
				})
			);
	}
}