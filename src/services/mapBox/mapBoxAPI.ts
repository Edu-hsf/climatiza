const token = import.meta.env.VITE_MAPBOX_TOKEN

export async function getCoordinatesBySearch (search: string) {
    const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${search}&access_token=${token}`)

    return await response.json()
}

export async function getLocationByCoordinates (lat: number, long: number) {
    const response = await fetch(`https://api.mapbox.com/search/searchbox/v1/reverse?longitude=${long}&latitude=${lat}&access_token=${token}&language=pt-BR&limit=1&types=country,place`)

    return await response.json()
}