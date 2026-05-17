import getWeather from './weather.service'
import { weatherMap } from './weather.mapper'
import weatherFetch from './weather.client'
import { weatherMock } from './weather.mock'

vi.mock('./weather.client')

describe('getWeather', () => {
    it('Deve retornar os dados climáticos formatados corretamente', async () => {
        vi.mocked(weatherFetch).mockResolvedValue(weatherMock)
        const data = await getWeather('-16', '-48')

        expect(data.current.weatherDescription).toBe('parcialmente nublado')
        expect(data.current.isDay).toBe(true)
        expect(data.hourly.length).toBeGreaterThan(0)
        expect(data.daily.length).toBeGreaterThan(0)
    })
})

describe('weatherMapper', () => {
    const data = weatherMap(weatherMock)

    it('Deve formatar corretamente os dados atuais do clima', () => {
        expect(data.current.time.toLocaleDateString('pt-BR')).toBe('17/05/2026')
        expect(data.current.weatherCode).toBe(2)
        expect(data.current.weatherDescription).toBe('parcialmente nublado')
        expect(data.current.isDay).toBe(true)
    })

    it('Deve formatar corretamente os dados climáticos por hora', () => {
        expect(data.hourly[0].temperature).toBe(21)
    })

    it('Deve formatar corretamente os dados climáticos diários', () => {
        expect(data.daily[0].temperatureMax).toBe(25)
        expect(data.daily[0].temperatureMin).toBe(19)
    })
})