import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html'
})
export class CalendarComponent {
	@Input() date: Date;
	@Input() dateFormat: string;

	constructor() {}

	chekIfEUFormat(): boolean {
		
		return (this.dateFormat === 'en-US');
	}
}