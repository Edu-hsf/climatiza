export default class mapsData {
    coordinates: string[]
    country: string
    state: string
    city: string

    constructor (coordinates: string[], country: string, state: string, city: string) {
        this.coordinates = coordinates
        this.country = country
        this.state = state
        this.city = city
    }

    changeLoc(newCoordinates: string[], newCountry: string, newState: string, newCity: string) {
        this.coordinates = newCoordinates
        this.country = newCountry
        this.state = newState
        this.city = newCity
    }
}