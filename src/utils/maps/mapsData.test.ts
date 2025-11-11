import mapsData from "./mapsData"

describe('MapsData', () => {
    it('Deve criar a classe MapsData com as propriedades corretas', () => {
        const loc = ['-16.057351614451616', '-48.03542363936755']
        const maps = new mapsData(loc, 'Brasil', 'Goiás', 'Novo Gama')

        expect(maps.coordinates).toEqual(loc)
        expect(maps.country).toBe('Brasil')
        expect(maps.state).toBe('Goiás')
        expect(maps.city).toBe('Novo Gama')
    })

    it('Deve chamar corretamente o método changeLoc', () => {
        const loc = ['-16.057351614451616', '-48.03542363936755']
        const maps = new mapsData(loc, 'Brasil', 'Goiás', 'Novo Gama')

        const newLoc = ['40.722444269942415', '-73.7982798857034']
        maps.changeLoc(newLoc, 'Estados Unidos', 'Nova Iorque', 'Queens')

        expect(maps.coordinates).toEqual(newLoc)
        expect(maps.country).toBe('Estados Unidos')
        expect(maps.state).toBe('Nova Iorque')
        expect(maps.city).toBe('Queens')
    })
})