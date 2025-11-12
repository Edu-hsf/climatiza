import type { WeatherDescriptionItem } from "../../lib/weather/weatherTypes"
import descriptions from "../../lib/weather/weatherDescriptions.json"

interface WeatherDescriptions {
    [key: string]: {
        day: WeatherDescriptionItem
        night: WeatherDescriptionItem
    }
}

const descriptionsData = descriptions as WeatherDescriptions;

function GetWeatherDescription (
    code: number, 
    isDay: number
) {
    return isDay ? descriptionsData[String(code)].day : descriptionsData[String(code)].night
} 

export { GetWeatherDescription }