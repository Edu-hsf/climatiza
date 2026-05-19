const BASE_URL = 'https://api.mapbox.com'

export default async function locationFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(
    `${BASE_URL}${path}`,
    {
      ...options,

      headers: {
        'Content-Type': 'application/json',

        ...options.headers,
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      'Error in location API request.',
    )
  }

  return response.json() as Promise<T>
}