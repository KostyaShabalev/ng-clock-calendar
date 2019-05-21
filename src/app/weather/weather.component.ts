import { Component, Input } from '@angular/core';

import { CityWeatherModel } from "../models/city-weather.model";

@Component({
	selector: 'app-weather',
	templateUrl: './weather.component.html'
})
export class WeatherComponent {
	@Input() cityWeatherInfo: CityWeatherModel;
	
}