export interface WeatherInfo {
	name: string;
	main: {
		temp: number
	};
	wind: {
		speed: number
	};
	weather: [
		{
			icon: string
		}
	];
}