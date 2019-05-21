export class CityWeatherModel {

	constructor(
		public city: string,
		public temperature: number,
		public windSpeed: number,
		public icon: string
	) { 
		this.temperature = this.temperature - 273.15;
		this.icon = `http://openweathermap.org/img/w/${icon}.png`;
	 }
}