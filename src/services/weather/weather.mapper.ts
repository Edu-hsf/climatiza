import { getWeatherDescription } from "@/utils/weather/weatherDescriptions";
import type { Weather, WeatherAPI } from "./weather.types";
import { getWeatherIcon } from "@/utils/weather/weatherIcons";

export function weatherMap(raw: WeatherAPI): Weather {
  const currentDate = new Date(raw.current.time);

  const currentIndex = raw.hourly.time.findIndex((time) => {
    const hourlyDate = new Date(time);

    return (
      hourlyDate.getFullYear() === currentDate.getFullYear() &&
      hourlyDate.getMonth() === currentDate.getMonth() &&
      hourlyDate.getDate() === currentDate.getDate() &&
      hourlyDate.getHours() === currentDate.getHours()
    );
  });

  const getAverageHumidity = (arr: number[]) => {
    let some = 0;

    for (let i = 0; i < arr.length; i++) {
      some += arr[i];
    }

    return Number((some / arr.length).toFixed());
  };

  console.log(raw.hourly.visibility[0]);

  return {
    current: {
      units: {
        time: raw.current_units.time,
        temperature: raw.current_units.temperature_2m,
        apparentTemperature: raw.current_units.apparent_temperature,
        windSpeed: raw.current_units.wind_speed_10m,
        humidity: raw.current_units.relative_humidity_2m,
        pressure: raw.current_units.pressure_msl,
        precipitation: raw.current_units.precipitation,
        visibility: raw.hourly_units.visibility,
        weatherCode: raw.current_units.weather_code,
        interval: raw.current_units.interval,
        isDay: raw.current_units.is_day,
      },
      time: new Date(raw.current.time),
      temperature: Number(raw.current.temperature_2m.toFixed()),
      apparentTemperature: Number(raw.current.apparent_temperature.toFixed()),
      windSpeed: Number(raw.current.wind_speed_10m.toFixed()),
      humidity: Number(raw.current.relative_humidity_2m.toFixed()),
      pressure: Number(raw.current.pressure_msl.toFixed()),
      precipitation: Number(raw.current.precipitation),
      visibility: Number((raw.hourly.visibility[currentIndex] / 1000).toFixed(1)),
      weatherCode: raw.current.weather_code,
      weatherDescription: getWeatherDescription(raw.current.weather_code),
      weatherIcon: getWeatherIcon(raw.current.weather_code, Boolean(raw.current.is_day)),
      isDay: Boolean(raw.current.is_day),
    },

    hourly: raw.hourly.time.map((time, index) => ({
      units: {
        time: raw.hourly_units.time,
        temperature: raw.hourly_units.temperature_2m,
        weatherCode: raw.hourly_units.weather_code,
      },
      time: new Date(time + ":00-03:00"),
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
      units: {
        time: raw.daily_units.time,
        temperatureMax: raw.daily_units.temperature_2m_max,
        temperatureMin: raw.daily_units.temperature_2m_min,
        humidity: raw.hourly_units.relative_humidity_2m,
        weatherCode: raw.daily_units.weather_code,
      },
      time: new Date(time + "T12:00:00-03:00"),
      temperatureMax: Number(raw.daily.temperature_2m_max[index].toFixed()),
      temperatureMin: Number(raw.daily.temperature_2m_min[index].toFixed()),
      humidity: getAverageHumidity(raw.hourly.relative_humidity_2m.slice(index * 24, index * 24 + 24)),
      weatherCode: raw.daily.weather_code[index],
      weatherDescription: getWeatherDescription(raw.daily.weather_code[index]),
      weatherIcon: getWeatherIcon(raw.daily.weather_code[index], true),
    })),
  };
}