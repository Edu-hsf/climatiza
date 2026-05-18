import {
    getLocationByCoordinates,
    getLocationBySearch,
} from './location.service';
import locationFetch from './location.client';
import { locationMapper } from './location.mapper';
import {
    reverseMock,
    searchMock,
} from './location.mock';

vi.mock('./location.client');

describe('getLocationByCoordinates', () => {
    it('Deve retornar uma localização', async () => {
        vi.mocked(locationFetch).mockResolvedValue(
            reverseMock,
        );

        const data = await getLocationByCoordinates(
            '-16',
            '-48',
        );

        expect(data).not.toBeNull();

        expect(data?.name).toBe('Novo Gama');
    });

    it('Deve retornar null quando não houver resultados', async () => {
        vi.mocked(locationFetch).mockResolvedValue({
            type: 'FeatureCollection',
            features: [],
            attribution: 'mock',
        });

        const data = await getLocationByCoordinates(
            '-16',
            '-48',
        );

        expect(data).toBeNull();
    });

    it('Deve lançar erro quando a api falhar', async () => {
        vi.mocked(locationFetch).mockRejectedValue(
            new Error('API Error'),
        );

        await expect(
            getLocationByCoordinates('-16', '-48'),
        ).rejects.toThrow('API Error');
    });
});

describe('getLocationBySearch', () => {
    it('Deve retornar localizações', async () => {
        vi.mocked(locationFetch).mockResolvedValue(
            searchMock,
        );

        const data = await getLocationBySearch(
            'novo gama',
        );

        expect(data.length).toBeGreaterThan(0);

        expect(data[0].name).toBe('Novo Gama');
    });
});

describe('locationMapper', () => {
    it('Deve transformar os dados da api corretamente', () => {
        const result = locationMapper(
            reverseMock.features[0],
        );

        expect(result).toEqual({
            "address": "Novo Gama, Goiás, Brazil",
            "city": "Novo Gama",
            "country": "Brazil",
            "id": "1",
            "latitude": -16.05,
            "longitude": -48.03,
            "name": "Novo Gama",
            "state": "Goiás",
            "type": "place",
        });
    });

    it('Deve funcionar sem region', () => {
        const mock = structuredClone(reverseMock);

        delete mock.features[0].properties.context.region;

        const result = locationMapper(
            mock.features[0],
        );

        expect(result.state).toBeUndefined();
    });

    it('Deve funcionar sem place', () => {
        const mock = structuredClone(reverseMock);

        delete mock.features[0].properties.context.place;

        const result = locationMapper(
            mock.features[0],
        );

        expect(result.city).toBe('Novo Gama');
    });

    it('Deve funcionar sem country', () => {
        const mock = structuredClone(reverseMock);

        delete mock.features[0].properties.context.country;

        const result = locationMapper(
            mock.features[0],
        );

        expect(result.country).toBe('');
    });
});