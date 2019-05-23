import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from "rxjs";

import { WeatherService } from './services/weather.service';
import { CityWeatherModel } from "./models/city-weather.model";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	public date: Date;
	public isShortTimeFormat: boolean = true;
	public dateFormat: string = 'en-US';

	private dateObservable: Observable<number>;
	private dateSubscription: Subscription;
	private weatherSubscription: Subscription;
	private isClockDisplayed: boolean;
	private cityWeatherInfo: CityWeatherModel;

	constructor(private weatherService: WeatherService) {}

	ngOnInit() {
		this.isClockDisplayed = true;

		this.runApp();
	}

	private runApp(): void {

		if (this.dateSubscription) {
			this.dateSubscription.unsubscribe();
		}

		if (this.isClockDisplayed) {
			this.initClock();
		} else {
			this.initDate();
		}

		this.weatherSubscription = this.weatherService.getDniproWeather()
			.subscribe(weatherData => {

				this.cityWeatherInfo = weatherData;
			});
	}

	private initClock(): void {
		let interval = 60000;
		let delay = 60000 - 1000 * new Date().getSeconds();

		if (!this.isShortTimeFormat) {
			interval = 1000;
			delay = 0;
		}

		this.date = this.getDate();

		this.dateSubscription = this.subscribeToDate(delay, interval);
	}

	private initDate(): void {
		const delay = 0;
		const interval = 60000;

		this.date = this.getDate();

		this.dateSubscription = this.subscribeToDate(delay, interval);
	}

	private getDate(): Date {

		return new Date();
	}

	private runTimer(delay, interval): Observable<number> {
		const newTimer = timer(delay, interval);

		return newTimer;
	}

	private subscribeToDate(delay, interval): Subscription {
		this.dateObservable = this.runTimer(delay, interval);

		return this.dateObservable
			.subscribe(() => {
				this.date = this.getDate();
			});
	}

	public onLeftClick(): void {
		this.isClockDisplayed = !this.isClockDisplayed;

		this.runApp();
	}

	public onRightClick(event: Event): void {
		event.preventDefault();

		if (this.isClockDisplayed) {
			this.isShortTimeFormat = !this.isShortTimeFormat;
		} else {
			this.dateFormat = (this.dateFormat === 'en-US') ? 'uk-UA' : 'en-US';
		}

		this.runApp();
	}
}
