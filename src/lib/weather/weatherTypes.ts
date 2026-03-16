type currentWeather = {
    time: Date;
    temperature: number;
    apparentTemp: number;
    windSpeed: number;
    humidity: number;
    pressure: number;
    precipitation: number;
    weatherCode: number;
    weatherDescription:  string;
    isDay: boolean;
};

type hourly = {
    time: Date;
    temperature: number;
    visibility: number;
    weatherCode: number;
    weatherDescription: string;
};

type daily = {
    time: Date;
    temperatureMax: number;
    temperatureMin: number; 
    weatherCode: number;
    weatherDescription: string;
};

export interface WeatherDataTypes {
    currentWeather: currentWeather;
    hourly: hourly[];
    daily: daily[];
}