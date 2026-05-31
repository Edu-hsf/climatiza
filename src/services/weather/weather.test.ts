import getWeather from './weather.service';
import { weatherMap } from './weather.mapper';
import weatherFetch from './weather.client';
import { weatherMock } from './weather.mock';
import { Cloud } from 'lucide-react';

vi.mock('./weather.client');

describe('getWeather', () => {
    it('Deve retornar os dados climáticos formatados corretamente', async () => {
        vi.mocked(weatherFetch).mockResolvedValue(weatherMock);
        const data = await getWeather(-16, -48);

        expect(data.current.weatherDescription).toBe('Parcialmente nublado');
        expect(data.current.isDay).toBe(true);
        expect(data.hourly.length).toBeGreaterThan(0);
        expect(data.daily.length).toBeGreaterThan(0);
    });
});

describe('weatherMapper', () => {
    const data = weatherMap(weatherMock);

    it('Deve formatar corretamente os dados atuais do clima', () => {
        expect(data.current).toEqual({
            units: {
                apparentTemperature: "°C",
                humidity: "%",
                interval: "seconds",
                isDay: "",
                precipitation: "mm",
                pressure: "hPa",
                temperature: "°C",
                time: "iso8601",
                visibility: "m",
                weatherCode: "wmo code",
                windSpeed: "km/h",
            },
            time: expect.any(Date),
            temperature: 25,
            apparentTemperature: 26,
            windSpeed: 12,
            humidity: 70,
            pressure: 1015,
            precipitation: 0,
            visibility: 10.0,
            weatherCode: 2,
            weatherDescription: 'Parcialmente nublado',
            weatherIcon: Cloud,
            isDay: true,
        });
    });

    it('Deve formatar corretamente os dados climáticos por hora', () => {
        expect(data.hourly[0]).toEqual({
            units: {
                temperature: "°C",
                time: "iso8601",
                weatherCode: "wmo code",
            },
            time: expect.any(Date),
            temperature: 21,
            weatherCode: 2,
            weatherDescription: 'Parcialmente nublado',
            weatherIcon: Cloud,
        });
    });

    it('Deve formatar corretamente os dados climáticos diários', () => {
        expect(data.daily[0]).toEqual({
            units: {
                humidity: "%",
                temperatureMax: "°C",
                temperatureMin: "°C",
                time: "iso8601",
                weatherCode: "wmo code",
            },
            time: expect.any(Date),
            temperatureMax: 25,
            temperatureMin: 19,
            humidity: 79,
            weatherCode: 2,
            weatherDescription: 'Parcialmente nublado',
            weatherIcon: Cloud,
        });
    });
});