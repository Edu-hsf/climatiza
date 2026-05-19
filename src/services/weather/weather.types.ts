/* ===============================================================
    WEATHER DA API
=============================================================== */

export interface WeatherAPI {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number

  current_units: CurrentUnits
  current: CurrentWeatherAPI

  hourly_units: HourlyUnits
  hourly: HourlyWeatherAPI

  daily_units: DailyUnits
  daily: DailyWeatherAPI
}

interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  is_day: string
  wind_speed_10m: string
  apparent_temperature: string
  precipitation: string
  pressure_msl: string
  weather_code: string
}

interface CurrentWeatherAPI {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  is_day: number
  wind_speed_10m: number
  apparent_temperature: number
  precipitation: number
  pressure_msl: number
  weather_code: number
}

interface HourlyUnits {
  time: string
  temperature_2m: string
  visibility: string
  weather_code: string
}

interface HourlyWeatherAPI {
  time: string[]
  temperature_2m: number[]
  visibility: number[]
  weather_code: number[]
}

interface DailyUnits {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  weather_code: string
}

interface DailyWeatherAPI {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
}

/* ===============================================================
    WEATHER PRINCIPAL
=============================================================== */

export interface Weather {
  current: CurrentWeather
  hourly: HourlyWeather[]
  daily: DailyWeather[]
}

interface CurrentWeather {
  time: Date
  temperature: number
  apparentTemperature: number
  windSpeed: number
  humidity: number
  pressure: number
  precipitation: number
  weatherCode: number
  weatherDescription: string
  isDay: boolean
}

interface HourlyWeather {
  time: Date
  temperature: number
  visibility: number
  weatherCode: number
  weatherDescription: string
}

interface DailyWeather {
  time: Date
  temperatureMax: number
  temperatureMin: number
  weatherCode: number
  weatherDescription: string
}
