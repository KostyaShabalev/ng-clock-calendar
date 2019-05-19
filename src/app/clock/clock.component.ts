import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-clock',
	templateUrl: './clock.component.html'
})
export class ClockComponent {
	@Input() date: Date;
	@Input() isShortTimeFormat: boolean;

	constructor() {}
}