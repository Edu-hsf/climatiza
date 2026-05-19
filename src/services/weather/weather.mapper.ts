import { getWeatherDescription } from "@/utils/weather/weatherDescriptions";
import type { Weather, WeatherAPI } from "./weather.types";

export function weatherMap(raw: WeatherAPI): Weather {
  return {
    current: {
      time: new Date(raw.current.time),
      temperature: raw.current.temperature_2m,
      apparentTemperature: raw.current.apparent_temperature,
      windSpeed: raw.current.wind_speed_10m,
      humidity: raw.current.relative_humidity_2m,
      pressure: raw.current.pressure_msl,
      precipitation: raw.current.precipitation,
      weatherCode: raw.current.weather_code,
      weatherDescription: getWeatherDescription(
        raw.current.weather_code
      ),
      isDay: Boolean(raw.current.is_day),
    },

    hourly: raw.hourly.time.map((time, index) => ({ 
      time: new Date(time),
      temperature: raw.hourly.temperature_2m[index],
      visibility: raw.hourly.visibility[index],
      weatherCode: raw.hourly.weather_code[index],
      weatherDescription: getWeatherDescription(
        raw.hourly.weather_code[index]
      ),
    })),

    daily: raw.daily.time.map((time, index) => ({
      time: new Date(time),
      temperatureMax: raw.daily.temperature_2m_max[index],
      temperatureMin: raw.daily.temperature_2m_min[index],
      weatherCode: raw.daily.weather_code[index],
      weatherDescription: getWeatherDescription(
        raw.daily.weather_code[index]
      ),
    })),
  }
}