import type { WeatherAPI } from '../weather.types'

export const weatherMock: Partial<WeatherAPI> = {
  current: {
    time: '2026-05-17T14:45',
    weather_code: 2,
    is_day: 1,
  },

  hourly: {
    time: ['2026-05-17T14:00'],
    temperature_2m: [21],
    weather_code: [2],
    visibility: [10000],
  },

  daily: {
    time: ['2026-05-17'],
    temperature_2m_max: [25],
    temperature_2m_min: [19],
    weather_code: [2],
  },
}