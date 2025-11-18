import { getCoordinatesBySearch } from "./mapBoxAPI"

describe('getCoordinatesBySearch', () => {
    it('Deve retornar dados de localizações pela resposta da pesquisa na API', async () => {
        const data = await getCoordinatesBySearch('Novo Gama')

        expect(data.features.length).toBe(5)
    }, 5000)

    it('Deve retornar as coordenadas de "Novo Gama" pela resposta da pesquisa na API', async () => {
        const data = await getCoordinatesBySearch('Novo Gama')

        expect(data.features[0].properties.coordinates).toEqual(
            {
                longitude: -48.030643,
                latitude: -16.054993
            }
        )
    }, 5000)

    it('Deve retornar nenhuma localização', async () => {
        const data = await getCoordinatesBySearch('test.test.test')

        expect(data.features.length).toBe(0)
    }, 5000)
})