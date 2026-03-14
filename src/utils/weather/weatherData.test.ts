import WeatherData from './weatherData'

describe('WeatherData', () => {
  it('Deve criar a classe weatherData com as as propriedade de currentWeather', async () => {
    const { mockData } = makeMock();

    const weather = new WeatherData(mockData);

    expect(weather.currentWeather.time.toLocaleTimeString('pt-BR')).toBe('13:45:00');
    expect(weather.currentWeather.temperature).toBe(79);
    expect(weather.currentWeather.weatherCode).toBe(100);
    expect(weather.currentWeather.isDay).toBe(true);
  })
  
  
  it('Deve criar o a classe weatherData.hourly com as as propriedade certas', async () => {
    const { mockData } = makeMock()
    
    const weather = new WeatherData(mockData)
    
    expect(weather.hourly[0].time.toLocaleTimeString('pt-BR')).toBe("02:00:00")
    expect(weather.hourly[0].temperature).toBe(69)
    expect(weather.hourly[0].visibility).toBe(24)
    expect(weather.hourly[0].weatherCode).toEqual(100)
  })
  
  it('Deve criar o a classe weatherData.daily com as as propriedade certas', async () => {
    const { mockData } = makeMock()
    
    const weather = new WeatherData(mockData)
    
    expect(weather.daily[0].time.toLocaleDateString('pt-BR')).toBe("04/11/2025")
    expect(weather.daily[0].temperatureMax).toBe(79)
    expect(weather.daily[0].temperatureMin).toBe(67)
    expect(weather.daily[0].weatherCode).toEqual(100)
  })
})  

const makeMock = () => {
  const mockData = {
    current: {
      time: '2025-11-04T13:45',
      temperature_2m: 79.2,
      apparent_temperature: 81.2,
      wind_speed_10m: 30.5,
      relative_humidity_2m: 22.1,
      cloud_cover: 100,
      weather_code: 100,
      is_day: 1,
    },
    hourly: {
      time: ['2025-11-04T02:00', '2025-11-04T03:00', '2025-11-04T04:00', '2025-11-04T05:00'],
      temperature_2m: [68.6, 68.4, 69.1, 69.2],
      visibility: [24140, 9040, 95120, 9850],
      weather_code: [100, 2, 40, 15]
    },
    daily: {
      time: ['2025-11-04', '2025-11-05', '2025-11-06', '2025-11-07', '2025-11-08', '2025-11-09', '2025-11-10'],
      temperature_2m_max: [79.1, 84.8, 85.3, 86.7, 84.8, 85.3, 86.7],
      temperature_2m_min: [66.6, 66.9, 67.2, 67.4, 64.8, 65.3, 66.7],
      weather_code: [100, 2, 80, 5, 2, 80, 5]
    },
  }

  return { mockData }
}