import { Component } from '@angular/core';

import { DateService } from "./services/date.service";
import { DateOptionsModel } from './models/date-options.model';
import { TimeOptionsModel } from './models/time-options.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
	
	public currentTime: string;
	public currentDate: string;

	private isClockDisplayed: boolean;
	private timerId: any; // What type should I specify?
	private timeFormat: string = 'short';
	private dateFormat: string = 'en-US';

	constructor(private dateService: DateService) {
		this.isClockDisplayed = true;

		this.startApp();
	}

	startApp(): void {

		if (this.timerId) {
			clearInterval(this.timerId);
		}

		if (this.isClockDisplayed) {
			this.initClock();
		} else {
			this.initDate();
		}
	}

	initClock(): void {
		let timeFormat: TimeOptionsModel = {
			hour: '2-digit',
			minute: '2-digit'
		}
		let mainInterval = 60000;
		let intervalForTimeout = 60000 - 1000 * new Date().getSeconds();

		if (this.timeFormat === 'full') {
			timeFormat.second = '2-digit';
			mainInterval = 1000;
			intervalForTimeout = 0;
		}

			this.setTime(timeFormat);

			this.timerId = setTimeout(() => {

				this.setTime(timeFormat);

				this.timerId = setInterval(() => {
					this.setTime(timeFormat);
				}, mainInterval);

			}, intervalForTimeout);
	}

	setTime(timeFormat): void {
		let date = this.dateService.getDate();
		this.currentTime = date.toLocaleTimeString('en-US', timeFormat);
	}

	initDate(): void {
		const dateOptions: DateOptionsModel = {
			year: '2-digit',
			month: '2-digit',
			day: '2-digit'
		};

		this.setDate(dateOptions);

		this.timerId = setInterval(() => {
			this.setDate(dateOptions);
		}, 60000);
	}

	setDate(dateOptions): void {
		let date: Date = this.dateService.getDate();
		this.currentDate = date.toLocaleDateString(this.dateFormat, dateOptions);
	}

	onLeftClick(): void {
		this.isClockDisplayed = !this.isClockDisplayed;
		
		this.startApp();
	}

	onRightClick(event: Event): void {
		event.preventDefault();
		
		if (this.isClockDisplayed) {
			this.timeFormat = (this.timeFormat === 'short') ? 'full' : 'short';
		} else {
			this.dateFormat = (this.dateFormat === 'en-US') ? 'uk-UA' : 'en-US';
		}

		this.startApp();
	}
}
