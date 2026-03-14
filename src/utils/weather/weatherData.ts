import type { WeatherDataTypes } from "../../lib/weather/weatherTypes"

export default class WeatherData implements WeatherDataTypes {
  currentWeather: WeatherDataTypes['currentWeather'];
  hourly: WeatherDataTypes['hourly'] = [];
  daily: WeatherDataTypes['daily'] = [];

  constructor(data: any) {
    this.currentWeather = {
      time: new Date(data.current.time),
      temperature: Math.round(data.current.temperature_2m),
      apparentTemp: Math.round(data.current.apparent_temperature),
      windSpeed: Math.round(data.current.wind_speed_10m),
      humidity: Math.round(data.current.relative_humidity_2m),
      cloudCover: Math.round(data.current.cloud_cover),
      weatherCode: data.current.weather_code,
      isDay: Boolean(data.current.weather_code),
    };

    for (let i = 0; i <= 4; i++) {
      this.hourly.push({
        time: new Date(data.hourly.time[i]),
        temperature: Math.round(data.hourly.temperature_2m[i]),
        visibility: Math.round(data.hourly.visibility[i] / 1000),
        weatherCode: data.hourly.weather_code[i],
      })
    };

    for (let i = 0; i <= 7; i++) {
      this.daily.push({
        time: new Date(data.daily.time[i] + 'T00:00'),
        temperatureMax: Math.round(data.daily.temperature_2m_max[i]),
        temperatureMin: Math.round(data.daily.temperature_2m_min[i]),
        weatherCode: data.daily.weather_code[i],
      })
    }
  }
}