import { getWeatherDescription } from "@/utils/weather/weatherDescriptions";
import type { Weather, WeatherAPI } from "./weather.types";
import { getWeatherIcon } from "@/utils/weather/weatherIcons";

export function weatherMap(raw: WeatherAPI): Weather {
  const currentIndex = raw.hourly.time.findIndex(
    (time) => time === raw.current.time,
  );

  return {
    current: {
      time: new Date(raw.current.time),
      temperature: Number(raw.current.temperature_2m.toFixed()),
      apparentTemperature: Number(raw.current.apparent_temperature.toFixed()),
      windSpeed: Number(raw.current.wind_speed_10m.toFixed()),
      humidity: Number(raw.current.relative_humidity_2m.toFixed()),
      pressure: Number(raw.current.pressure_msl),
      precipitation: Number(raw.current.precipitation),
      visibility: Number((raw.hourly.visibility[currentIndex] / 1000).toFixed(1)),
      weatherCode: raw.current.weather_code,
      weatherDescription: getWeatherDescription(raw.current.weather_code),
      weatherIcon: getWeatherIcon(raw.current.weather_code, Boolean(raw.current.is_day)),
      isDay: Boolean(raw.current.is_day),
    },

    hourly: raw.hourly.time.map((time, index) => ({
      time: new Date(time),
      temperature: Number(raw.hourly.temperature_2m[index].toFixed()),
      weatherCode: raw.hourly.weather_code[index],
      weatherDescription: getWeatherDescription(raw.hourly.weather_code[index]),
      weatherIcon: getWeatherIcon(
        raw.hourly.weather_code[index],
        new Date(time).getHours() >= 6 &&
        new Date(time).getHours() < 19,
      ),
    })),

    daily: raw.daily.time.map((time, index) => ({
      time: new Date(time),
      temperatureMax: Number(raw.daily.temperature_2m_max[index].toFixed()),
      temperatureMin: Number(raw.daily.temperature_2m_min[index].toFixed()),
      weatherCode: raw.daily.weather_code[index],
      weatherDescription: getWeatherDescription(raw.daily.weather_code[index]),
      weatherIcon: getWeatherIcon(
        raw.hourly.weather_code[index],
        new Date(time).getHours() >= 6 &&
        new Date(time).getHours() < 19,
      ),
    })),
  };
}