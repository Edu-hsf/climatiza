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
        description: Promise<WeatherDescriptionItem>
    }
    hourly: {
        time: string[]
        temp: number[]
        visibility: number[]
        descriptions: Promise<WeatherDescriptionItem[]>
    }
    daily: {
        time: string[]
        tempMax: number[]
        tempMin: number[]
        descriptions: Promise<WeatherDescriptionItem[]>
    }
}