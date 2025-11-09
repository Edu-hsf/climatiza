import * as GetWeatherDescriptionMod from './getWeatherDescription'
import WeatherData from './weatherData'

describe('WeatherData', () => {
  it('Deve chamar a função GetWeatherDescription corretamente', () => {
    const { GetWeatherDescriptionSpy, mockData } = makeMock()

    new WeatherData(mockData)

    expect(GetWeatherDescriptionSpy).toHaveBeenCalledTimes(3)
  })

  it('Deve criar o a classe weatherData.current com as as propriedade certas', async () => {
    const { mockData } = makeMock()

    const weather = new WeatherData(mockData)

    expect(weather.current.time).toBe('13:45')
    expect(weather.current.temp).toBe(79)
    expect(await weather.current.description).toEqual({
      description: 'Sunny',
      image: 'image.png'
    })
    
  })
  
  
  it('Deve criar o a classe weatherData.hourly com as as propriedade certas', async () => {
    const { mockData } = makeMock()
    
    const weather = new WeatherData(mockData)
    
    expect(weather.hourly.time[0]).toBe("00:00")
    expect(weather.hourly.temp[0]).toBe(69)
    expect(weather.hourly.visibility[0]).toBe(24)
    expect((await weather.hourly.descriptions)[0]).toEqual({
      description: 'Sunny',
      image: 'image.png'
    })
  })
  
  it('Deve criar o a classe weatherData.daily com as as propriedade certas', async () => {
    const { mockData } = makeMock()
    
    const weather = new WeatherData(mockData)
    
    expect(weather.daily.time[0]).toBe("04/11/2025")
    expect(weather.daily.tempMax[0]).toBe(79)
    expect((await weather.daily.descriptions)[0]).toEqual({
      description: 'Sunny',
      image: 'image.png'
    })
  })
})

const makeMock = () => {
  const GetWeatherDescriptionSpy = vi
    .spyOn(GetWeatherDescriptionMod, 'GetWeatherDescription').mockResolvedValue({
      description: 'Sunny',
      image: 'image.png'
    })

  const mockData = {
    current: {
      time: '2025-11-04T13:45',
      temperature_2m: 79.2,
      apparent_temperature: 81.2,
      wind_speed_10m: 30.5,
      relative_humidity_2m: 22.1,
      cloud_cover: 100,
      weather_code: 100
    },
    hourly: {
      time: ['2025-11-04T00:00', '2025-11-04T01:00'],
      temperature_2m: [68.6, 68.4],
      visibility: [24140, 9040],
      weather_code: [100, 2]
    },
    daily: {
      time: ['2025-11-04', '2025-11-05'],
      temperature_2m_max: [79.1, 84.8],
      temperature_2m_min: [66.6, 66.9],
      weather_code: [100, 2]
    },
  }

  return { GetWeatherDescriptionSpy, mockData }
}