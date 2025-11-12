

export default async function getOpenMeteoAPI (lat: string, long: string) {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,visibility,weather_code&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,apparent_temperature,cloud_cover,weather_code&timezone=America%2FSao_Paulo&temperature_unit=fahrenheit`) 

    try {
        if (!res.ok) throw new Error(`API address not found`)
    
        return await res.json()
    } catch (err) {
        return `Response status: ${res.status}`
    }

}