export interface WeatherDescriptionItem {
    description: string
    image: string
}
export interface WeatherDataTypes {
    current: {
        time: string
        temp: number
        apparentTemp: number
        windSpeed: number
        humidity: number
        cloudCover: number
        description: WeatherDescriptionItem
    }
    hourly: {
        time: string[]
        temp: number[]
        visibility: number[]
        descriptions: WeatherDescriptionItem[]
    }
    daily: {
        time: string[]
        tempMax: number[]
        tempMin: number[]
        descriptions: WeatherDescriptionItem[]
    }
}