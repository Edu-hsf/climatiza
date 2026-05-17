import weatherFetch from './weather.client'
import { weatherMap } from './weather.mapper'

import type { WeatherAPI } from './weather.types'

export default async function getWeather(
    lat: string,
    long: string,
) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: long,

        daily: [
            'temperature_2m_max',
            'temperature_2m_min',
            'weather_code',
        ].join(','),

        hourly: [
            'temperature_2m',
            'visibility',
            'weather_code',
        ].join(','),

        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'is_day',
            'wind_speed_10m',
            'apparent_temperature',
            'precipitation',
            'pressure_msl',
            'weather_code',
        ].join(','),

        timezone: 'America/Sao_Paulo',
    })

    const data = await weatherFetch<WeatherAPI>(`/v1/forecast?${params.toString()}`)

    return weatherMap(data)
}