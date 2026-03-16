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
      pressure: data.current.pressure_msl,
      precipitation: Math.round(data.current.precipitation),
      weatherCode: data.current.weather_code,
      weatherDescription: getWeatherDescription(data.current.weather_code),
      isDay: Boolean(data.current.weather_code),
    };

    for (let i = 0; i <= 4; i++) {
      this.hourly.push({
        time: new Date(data.hourly.time[i]),
        temperature: Math.round(data.hourly.temperature_2m[i]),
        visibility: Math.round(data.hourly.visibility[i] / 1000),
        weatherCode: data.hourly.weather_code[i],
        weatherDescription: getWeatherDescription(data.hourly.weather_code[i]),
      })
    };

    for (let i = 0; i <= 7; i++) {
      this.daily.push({
        time: new Date(data.daily.time[i] + 'T00:00'),
        temperatureMax: Math.round(data.daily.temperature_2m_max[i]),
        temperatureMin: Math.round(data.daily.temperature_2m_min[i]),
        weatherCode: data.daily.weather_code[i],
        weatherDescription: getWeatherDescription(data.daily.weather_code[i]),
      })
    }
  }
}

const getWeatherDescription = (code: number) => {
  // céu limpo
  if (code === 0) {
    return 'ceú limpo'
  }

  // parcialmente nublado
  if (code === 1 || code === 2) {
    return 'parcialmente nublado'
  }

  // nublado
  if (code === 3) {
    return 'nublado'
  }

  // nevoeiro
  if (code === 45 || code === 48) {
    return 'nevoeiro'
  }

  // garoa
  if (code >= 51 && code <= 57) {
    return 'garoa'
  }

  // chuva
  if (code >= 61 && code <= 67) {
    return 'chuva'
  }

  // neve
  if (code >= 71 && code <= 77) {
    return 'neve'
  }

  // pancadas
  if (code >= 80 && code <= 82) {
    return 'pancadas'
  }

  // tempestade
  if (code >= 95) {
    return 'tempestade'
  }

  return 'céu limpo'
}