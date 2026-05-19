import { type LocationAPI } from './location.types'

export const reverseMock: LocationAPI = {
  type: 'FeatureCollection',

  features: [
    {
      type: 'Feature',

      id: '1',

      geometry: {
        type: 'Point',

        coordinates: [-48.03, -16.05],
      },

      properties: {
        mapbox_id: '1',

        feature_type: 'place',

        name: 'Novo Gama',

        full_address: 'Novo Gama, Goiás, Brazil',

        coordinates: {
          latitude: -16.05,
          longitude: -48.03,
        },

        place_formatted: 'Goiás, Brazil',

        context: {
          place: {
            mapbox_id: '1',
            name: 'Novo Gama',
          },

          region: {
            mapbox_id: '2',
            name: 'Goiás',
            region_code: 'GO',
            region_code_full: 'BR-GO',
          },

          country: {
            mapbox_id: '3',
            name: 'Brazil',
            country_code: 'BR',
            country_code_alpha_3: 'BRA',
          },
        },
      },
    },
  ],

  attribution: 'mock',
}

export const searchMock: LocationAPI = {
  type: 'FeatureCollection',

  features: [
    {
      type: 'Feature',

      id: '1',

      geometry: {
        type: 'Point',

        coordinates: [-48.03, -16.05],
      },

      properties: {
        mapbox_id: '1',

        feature_type: 'place',

        name: 'Novo Gama',

        full_address: 'Novo Gama, Goiás, Brazil',

        coordinates: {
          latitude: -16.05,
          longitude: -48.03,
        },

        place_formatted: 'Goiás, Brazil',

        context: {
          place: {
            mapbox_id: '1',
            name: 'Novo Gama',
          },

          region: {
            mapbox_id: '2',
            name: 'Goiás',
            region_code: 'GO',
            region_code_full: 'BR-GO',
          },

          country: {
            mapbox_id: '3',
            name: 'Brazil',
            country_code: 'BR',
            country_code_alpha_3: 'BRA',
          },
        },
      },
    },

    {
      type: 'Feature',

      id: '2',

      geometry: {
        type: 'Point',

        coordinates: [-44.73, -17.54],
      },

      properties: {
        mapbox_id: '2',

        feature_type: 'street',

        name: 'Fazenda Novo Gama',

        full_address:
          'Fazenda Novo Gama, Minas Gerais, Brazil',

        coordinates: {
          latitude: -17.54,
          longitude: -44.73,
        },

        place_formatted: 'Minas Gerais, Brazil',

        context: {
          place: {
            mapbox_id: '4',
            name: 'Várzea da Palma',
          },

          region: {
            mapbox_id: '5',
            name: 'Minas Gerais',
            region_code: 'MG',
            region_code_full: 'BR-MG',
          },

          country: {
            mapbox_id: '6',
            name: 'Brazil',
            country_code: 'BR',
            country_code_alpha_3: 'BRA',
          },
        },
      },
    },
  ],

  attribution: 'mock',
}