  import locationFetch from './location.client';
  import { locationMapper } from './location.mapper';
  import { type LocationAPI } from './location.types';

  const token = import.meta.env.VITE_MAPBOX_TOKEN;

  export async function getLocationByCoordinates(
    latitude: string,
    longitude: string,
  ) {
    const response =
      await locationFetch<LocationAPI>(`/search/searchbox/v1/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${token}&language=pt-BR&limit=1&types=country,place`);

    const feature = response.features[0];

    if (!feature) {
      return null;
    }

    return locationMapper(feature);
  }

  export async function getLocationBySearch(
    search: string,
  ) {
    const response =
      await locationFetch<LocationAPI>(`/search/geocode/v6/forward?q=${search}&access_token=${token}`);

    return response.features.map(locationMapper);
  }