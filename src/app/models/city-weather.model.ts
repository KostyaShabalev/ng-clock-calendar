export class CityWeatherModel {

	public city: string;
	public temperature: number;
	public windSpeed: number;
	public icon: string

	constructor(weatherInfo) {
		this.city = weatherInfo.name;
		this.temperature = weatherInfo.main.temp;
		this.windSpeed = weatherInfo.wind.speed;
		this.icon = weatherInfo.weather[0].icon;
	}
}