import { GetWeatherDescription } from "./getWeatherDescription"

describe('getWeatherDescription', () => {
  it('Deve deve obter os dados da chamada na chave "night"', async () => {
    expect(await GetWeatherDescription(2, 0)).toEqual({
      description: 'Partly Cloudy',
      image: 'http://openweathermap.org/img/wn/02n@2x.png'
    })
  })

  it('Deve deve obter os dados da chamada na chave "day"', async () => {
    expect(await GetWeatherDescription(2, 1)).toEqual({
      description: 'Partly Cloudy',
      image: 'http://openweathermap.org/img/wn/02d@2x.png'
    })
  })
})