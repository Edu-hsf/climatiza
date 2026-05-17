const BASE_URL = 'https://api.open-meteo.com'

export default async function weatherFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options.headers,
    })

    if (!response.ok) {
        throw new Error('Error in location API request.');
    }

    return response.json() as Promise<T>
}