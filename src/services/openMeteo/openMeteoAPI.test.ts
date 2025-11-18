import getOpenMeteoAPI from "./openMeteoAPI"

describe('getOpenMeteoAPI', () =>  {
    it('Deve retornar os dados da API corretamente', async () => {
        const dataAPI = await getOpenMeteoAPI('-16', '-48')

        expect(dataAPI.latitude).toBe(-16.125)
        expect(dataAPI.longitude).toBe(-48.125)
        expect(dataAPI.timezone).toBe("America/Sao_Paulo")
    }, 5000)

    it('Deve retornar um erro de chamada da API', async () => {
        const dataAPI = await getOpenMeteoAPI('-16s', '-48a')
        
        expect(dataAPI).toBe('Response status: 400')
    }, 5000)
})