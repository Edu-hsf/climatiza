type currentWeather = {
    time: Date;
    temperature: number;
    apparentTemp: number;
    windSpeed: number;
    humidity: number;
    cloudCover: number;
    weatherCode: number;
    isDay: boolean;
};

type hourly = {
    time: Date;
    temperature: number;
    visibility: number;
    weatherCode: number;
};

type daily = {
    time: Date;
    temperatureMax: number;
    temperatureMin: number;
    weatherCode: number;
};

export interface WeatherDataTypes {
    currentWeather: currentWeather;
    hourly: hourly[];
    daily: daily[];
}