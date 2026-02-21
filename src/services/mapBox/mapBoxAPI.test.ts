import { getCoordinatesBySearch, getLocationByCoordinates } from "./mapBoxAPI"

describe('getCoordinatesBySearch', () => {
    it('Deve retornar uma lista de localizações conforme a resposta da API para o termo pesquisado', async () => {
        const data = await getCoordinatesBySearch('Novo Gama')

        expect(data.features.length).toBe(5)
    }, 5000)

    it('Deve retornar as coordenadas geográficas corretas para "Novo Gama" conforme a resposta da API', async () => {
        const data = await getCoordinatesBySearch('Novo Gama')

        expect(data.features[0].properties.coordinates).toEqual(
            {
                longitude: -48.030643,
                latitude: -16.054993
            }
        )
    }, 5000)

    it('Deve retornar uma lista vazia quando não houver correspondência para o termo pesquisado', async () => {
        const data = await getCoordinatesBySearch('test.test.test')

        expect(data.features.length).toBe(0)
    }, 5000)
})

describe('getLocationByCoodinates', () => {
    it('Deve retornar uma lista de localizações com base nas coordenadas informadas, conforme resposta da API', async () => {
        const data = await getLocationByCoordinates(-16.057708303288017, -48.0350517873465465)

        expect(data.features.length).toBe(1)
    }, 5000)

    it('Deve retornar a cidade e o país correspondentes às coordenadas informadas, conforme resposta da API', async () =>{
        const data = await getLocationByCoordinates(-16.057708303288017, -48.0350517873465465)

        expect(data.features[0].properties.name).toBe('Novo Gama')
        expect(data.features[0].properties.context.country.name).toBe('Brasil')
    }, 5000)

    it('Deve retornar erro 400 quando as coordenadas informadas forem inválidas', async () => {
        const data = await getLocationByCoordinates(100000000, 100000)

        expect(data.message.status_code).toBe(400)
    }, 5000)
})
