require('dotenv').config()

export async function getCoordinatesBySearch (search: string) {
    const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${search}&access_token=${process.env.MAPBOX_TOKEN}`)

    return await response.json()
} 