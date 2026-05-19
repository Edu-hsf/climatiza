import type { WeatherAPI } from "./weather.types";

export const weatherMock: WeatherAPI = {
    latitude: -16,
    longitude: -48,
    generationtime_ms: 0.5,
    utc_offset_seconds: -10800,
    timezone: 'America/Sao_Paulo',
    timezone_abbreviation: 'GMT-3',
    elevation: 1000,

    current_units: {
        time: 'iso8601',
        interval: 'seconds',
        temperature_2m: '°C',
        relative_humidity_2m: '%',
        is_day: '',
        wind_speed_10m: 'km/h',
        apparent_temperature: '°C',
        precipitation: 'mm',
        pressure_msl: 'hPa',
        weather_code: 'wmo code',
    },

    current: {
        time: '2026-05-17T14:45',
        interval: 900,
        temperature_2m: 25,
        relative_humidity_2m: 70,
        is_day: 1,
        wind_speed_10m: 12,
        apparent_temperature: 26,
        precipitation: 0,
        pressure_msl: 1015,
        weather_code: 2,
    },

    hourly_units: {
        time: 'iso8601',
        temperature_2m: '°C',
        visibility: 'm',
        weather_code: 'wmo code',
    },

    hourly: {
        time: [
            '2026-05-17T14:00',
        ],

        temperature_2m: [
            21,
        ],

        visibility: [
            10000,
        ],

        weather_code: [
            2,
        ],
    },

    daily_units: {
        time: 'iso8601',
        temperature_2m_max: '°C',
        temperature_2m_min: '°C',
        weather_code: 'wmo code',
    },

    daily: {
        time: [
            '2026-05-17',
        ],

        temperature_2m_max: [
            25,
        ],

        temperature_2m_min: [
            19,
        ],

        weather_code: [
            2,
        ],
    },
}