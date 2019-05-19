import { timer, Observable } from "rxjs";

export class DateService {
	
	getDate(): Date {

		return new Date();
	}

	runTimer(delay, interval): Observable<number> {
		const newTimer = timer(delay, interval);

		return newTimer;
	}
}