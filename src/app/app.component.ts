import { Component } from '@angular/core';
import { Observable, Subscription } from "rxjs";

import { DateService } from "./services/date.service";
import { WeatherService } from './services/weather.service';
import { CityWeatherModel } from "./models/city-weather.model";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	public date: Date;
	public isShortTimeFormat: boolean = true;
	public dateFormat: string = 'en-US';
	public cityWeatherInfo: CityWeatherModel;

	private dateObservable: Observable<number>;
	private dateSubscription: Subscription;
	private weatherSubscription: Subscription;
	private isClockDisplayed: boolean;

	constructor(
		private dateService: DateService,
		private weatherService: WeatherService) {
		this.isClockDisplayed = true;

		this.weatherSubscription = this.weatherService.getDniproWeather()
			.subscribe(data => {
				this.cityWeatherInfo = data;
			});

		this.runApp();
	}

	runApp(): void {

		if (this.dateSubscription) {
			this.dateSubscription.unsubscribe();
		}

		if (this.isClockDisplayed) {
			this.initClock();
		} else {
			this.initDate();
		}
	}

	initClock(): void {
		let interval = 60000;
		let delay = 60000 - 1000 * new Date().getSeconds();

		if (!this.isShortTimeFormat) {
			interval = 1000;
			delay = 0;
		}

		this.date = this.dateService.getDate();

		this.dateSubscription = this.subscribeToDate(delay, interval);
	}

	initDate(): void {
		const delay = 0;
		const interval = 60000;

		this.date = this.dateService.getDate();

		this.dateSubscription = this.subscribeToDate(delay, interval);
	}

	subscribeToDate(delay, interval): Subscription {
		this.dateObservable = this.dateService.runTimer(delay, interval);

		return this.dateObservable
			.subscribe(() => {
				this.date = this.dateService.getDate();
			});
	}

	onLeftClick(): void {
		this.isClockDisplayed = !this.isClockDisplayed;

		this.runApp();
	}

	onRightClick(event: Event): void {
		event.preventDefault();

		if (this.isClockDisplayed) {
			this.isShortTimeFormat = !this.isShortTimeFormat;
		} else {
			this.dateFormat = (this.dateFormat === 'en-US') ? 'uk-UA' : 'en-US';
		}

		this.runApp();
	}
}
