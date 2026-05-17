const BASE_URL = 'https://api.open-meteo.com'

export default async function weatherFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options.headers,
    })
    //const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,visibility,weather_code&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,apparent_temperature,precipitation,pressure_msl,weather_code&timezone=America%2FSao_Paulo`)

    if (!response.ok) {
        throw new Error('Error in location API request.');
    }

    return response.json() as Promise<T>
}