import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-clock',
	templateUrl: './clock.component.html'
})
export class ClockComponent {

	// private isFullMode: boolean = false;

	@Input() time: string;

	constructor() {}
}