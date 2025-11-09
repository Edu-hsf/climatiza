import type { WeatherDescriptionItem } from "../../lib/weatherTypes"
import descriptions from "./descriptions.json"

interface WeatherDescriptions {
    [key: string]: {
        day: WeatherDescriptionItem
        night: WeatherDescriptionItem
    }
}

const descriptionsData = descriptions as WeatherDescriptions;

async function GetWeatherDescription (
    code: number, 
    isDay: number
): Promise<WeatherDescriptionItem> {
    return isDay ? descriptionsData[String(code)].day : descriptionsData[String(code)].night
} 

export { GetWeatherDescription }