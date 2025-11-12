import type { WeatherDataTypes, WeatherDescriptionItem } from "../../lib/weather/weatherTypes"
import { GetWeatherDescription } from "./getWeatherDescription"

export default class WeatherData implements WeatherDataTypes {
  current: WeatherDataTypes['current']
  hourly: WeatherDataTypes['hourly']
  daily: WeatherDataTypes['daily']

  constructor(data: any) {
    this.current = {
      time: new Date(data.current.time).toLocaleTimeString('pt-br', { timeStyle: "short" }),
      temp: Number(data.current.temperature_2m.toFixed()),
      apparentTemp: Number(data.current.apparent_temperature.toFixed()),
      windSpeed: Number(data.current.wind_speed_10m.toFixed()),
      humidity: Number(data.current.relative_humidity_2m.toFixed()),
      cloudCover: Number(data.current.cloud_cover.toFixed()),
      description: GetWeatherDescription(data.current.weather_code, data.current.is_day)
    }

    this.hourly = {
      time: formatTimeList(data.hourly.time),
      temp: formatFixedList(data.hourly.temperature_2m),
      visibility: formatVisibilityList(data.hourly.visibility),
      descriptions: formatDescriptionList(data.hourly.weather_code)
    }

    this.daily = {
      time: formatDateList(data.daily.time),
      tempMax: formatFixedList(data.daily.temperature_2m_max),
      tempMin: formatFixedList(data.daily.temperature_2m_min),
      descriptions: formatDescriptionList(data.daily.weather_code)
    }

  }
}


const formatTimeList = (data: string[]): string[] => {
  data.forEach((item, i) => {
    data[i] = new Date(item).toLocaleTimeString('pt-br', { timeStyle: "short" })
  })
  return data
}

const formatDateList = (data: string[]): string[] => {
  data.forEach((item, i) => {
    data[i] = new Date(item + 'T00:00').toLocaleDateString('pt-BR')
  })
  return data
}

const formatFixedList = (data: number[]): number[] => {
  data.forEach((item, i) => data[i] = Number(item.toFixed()))
  return data
}

const formatVisibilityList = (data: number[]): number[] => {
  data.forEach((item, i) => data[i] = Number((item / 1000).toFixed()))
  return data
}

const formatDescriptionList = (data: number[]): WeatherDescriptionItem[] => {
  const descriptions: WeatherDescriptionItem[] = []
  for (let i = 0; i < data.length; i++) {
    descriptions.push(GetWeatherDescription(data[i], 1))
  }
  return descriptions
} 